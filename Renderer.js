import { mat4, vec3 } from './lib/gl-matrix-module.js';

import { WebGL } from './WebGL.js';

import  {shaders}  from './shaders.js';

// This class prepares all assets for use with WebGL
// and takes care of rendering.

export class Renderer {

    constructor(gl) {
        this.gl = gl;
        this.glObjects = new Map();
        this.programs = WebGL.buildPrograms(gl, shaders);

        gl.clearColor(1, 1, 1, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        this.defaultTexture = WebGL.createTexture(gl, {
            width: 1,
            height: 1,
            data: new Uint8Array([255, 255, 255, 255]),
        });

        this.defaultSampler = WebGL.createSampler(gl, {
            min: gl.NEAREST,
            mag: gl.NEAREST,
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
        });
    }

    prepareBufferView(bufferView) {
        if (this.glObjects.has(bufferView)) {
            return this.glObjects.get(bufferView);
        }

        const buffer = new DataView(
            bufferView.buffer,
            bufferView.byteOffset,
            bufferView.byteLength);
        const glBuffer = WebGL.createBuffer(this.gl, {
            target : bufferView.target,
            data   : buffer
        });
        this.glObjects.set(bufferView, glBuffer);
        return glBuffer;
    }

    prepareSampler(sampler) {
        if (this.glObjects.has(sampler)) {
            return this.glObjects.get(sampler);
        }

        const glSampler = WebGL.createSampler(this.gl, sampler);
        this.glObjects.set(sampler, glSampler);
        return glSampler;
    }

    prepareImage(image) {
        if (this.glObjects.has(image)) {
            return this.glObjects.get(image);
        }

        const glTexture = WebGL.createTexture(this.gl, { image });
        this.glObjects.set(image, glTexture);
        return glTexture;
    }

    prepareTexture(texture) {
        const gl = this.gl;

        this.prepareSampler(texture.sampler);
        const glTexture = this.prepareImage(texture.image);

        const mipmapModes = [
            gl.NEAREST_MIPMAP_NEAREST,
            gl.NEAREST_MIPMAP_LINEAR,
            gl.LINEAR_MIPMAP_NEAREST,
            gl.LINEAR_MIPMAP_LINEAR,
        ];

        if (!texture.hasMipmaps && mipmapModes.includes(texture.sampler.min)) {
            gl.bindTexture(gl.TEXTURE_2D, glTexture);
            gl.generateMipmap(gl.TEXTURE_2D);
            texture.hasMipmaps = true;
        }
    }

    prepareMaterial(material) {
        if (material.baseColorTexture) {
            this.prepareTexture(material.baseColorTexture);
        }
        if (material.metallicRoughnessTexture) {
            this.prepareTexture(material.metallicRoughnessTexture);
        }
        if (material.normalTexture) {
            this.prepareTexture(material.normalTexture);
        }
        if (material.occlusionTexture) {
            this.prepareTexture(material.occlusionTexture);
        }
        if (material.emissiveTexture) {
            this.prepareTexture(material.emissiveTexture);
        }
    }

    preparePrimitive(primitive) {
        if (this.glObjects.has(primitive)) {
            return this.glObjects.get(primitive);
        }

        this.prepareMaterial(primitive.material);

        const gl = this.gl;
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        if (primitive.indices) {
            const bufferView = primitive.indices.bufferView;
            bufferView.target = gl.ELEMENT_ARRAY_BUFFER;
            const buffer = this.prepareBufferView(bufferView);
            gl.bindBuffer(bufferView.target, buffer);
        }

        // this is an application-scoped convention, matching the shader
        const attributeNameToIndexMap = {
            POSITION   : 0,
            NORMAL     : 1,
            TANGENT    : 2,
            TEXCOORD_0 : 3,
            TEXCOORD_1 : 4,
            COLOR_0    : 5,
        };

        for (const name in primitive.attributes) {
            const accessor = primitive.attributes[name];
            const bufferView = accessor.bufferView;
            const attributeIndex = attributeNameToIndexMap[name];

            if (attributeIndex !== undefined) {
                bufferView.target = gl.ARRAY_BUFFER;
                const buffer = this.prepareBufferView(bufferView);
                gl.bindBuffer(bufferView.target, buffer);
                gl.enableVertexAttribArray(attributeIndex);
                gl.vertexAttribPointer(
                    attributeIndex,
                    accessor.numComponents,
                    accessor.componentType,
                    accessor.normalized,
                    bufferView.byteStride,
                    accessor.byteOffset);
            }
        }

        this.glObjects.set(primitive, vao);
        return vao;
    }

    prepareMesh(mesh) {
        for (const primitive of mesh.primitives) {
            this.preparePrimitive(primitive);
        }
    }

    prepareNode(node) {
        if (node.mesh) {
            this.prepareMesh(node.mesh);
        }
        for (const child of node.children) {
            this.prepareNode(child);
        }
    }

    prepareScene(scene) {
        for (const node of scene.nodes) {
            this.prepareNode(node);
        }
    }

    getViewProjectionMatrix(camera) {
        const vpMatrix = camera.globalMatrix;
        mat4.invert(vpMatrix, vpMatrix);
        mat4.mul(vpMatrix, camera.camera.projectionMatrix, vpMatrix);
        return vpMatrix;
    }

    render(scene, camera, light) {
        const gl = this.gl;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        
        const program = this.programs.phong;
       
        gl.useProgram(program.program);
        gl.uniform1i(program.uniforms.uTexture, 0);

        const mvpMatrix = this.getViewProjectionMatrix(camera);
        gl.uniformMatrix4fv(program.uniforms.uProjection, false, mvpMatrix);

        let color = vec3.clone(light.ambientColor);
        vec3.scale(color, color, 1.0/255.0);
        gl.uniform3fv(program.uniforms.uAmbientColor, color);
        color = vec3.clone(light.diffuseColor);

        vec3.scale(color, color, 1.0/255.0);
        gl.uniform3fv(program.uniforms.uDiffuseColor, color);

        color = vec3.clone(light.specularColor);
        vec3.scale(color, color, 1.0/255.0);
        gl.uniform3fv(program.uniforms.uSpecularColor, color);
        gl.uniform1f(program.uniforms.uShininess, light.shininess);

        gl.uniform3fv(program.uniforms.uLightPosition, light.position);
        gl.uniform3fv(program.uniforms.uLightAttenuation, light.attenuatuion);

        for (const node of scene.nodes) {
    
            this.renderNode(node, mvpMatrix);
        }
    }

    renderNode(node, mvpMatrix,t) {
        const gl = this.gl;
        mvpMatrix = mat4.clone(mvpMatrix);
        console.log(node)
        mat4.mul(mvpMatrix, mvpMatrix, node.localMatrix);

        if (node.mesh) {
            const program = this.programs.phong;

            gl.uniformMatrix4fv(program.uniforms.uMvpMatrix, false, mvpMatrix);
            for (const primitive of node.mesh.primitives) {
                this.renderPrimitive(primitive);
            }
        }

        for (const child of node.children) {
            this.renderNode(child, mvpMatrix);
        }
    }

    renderPrimitive(primitive) {
        const gl = this.gl;

        const program = this.programs.phong;
        const vao = this.glObjects.get(primitive);
        gl.bindVertexArray(vao);
        
        const material = primitive.material;
        console.log(program.uniforms)
        gl.uniform4fv(program.uniforms.uBaseColorFactor, material.baseColorFactor);
       
        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(program.uniforms.uBaseColorTexture, 0);

        const texture = material.baseColorTexture;
        const glTexture = texture
                        ? this.glObjects.get(texture.image)
                        : this.defaultTexture;
        const glSampler = texture
                        ? this.glObjects.get(texture.sampler)
                        : this.defaultSampler;

        gl.bindTexture(gl.TEXTURE_2D, glTexture);
        gl.bindSampler(0, glSampler);

        if (primitive.indices) {
            const mode = primitive.mode;
            const count = primitive.indices.count;
            const type = primitive.indices.componentType;
            gl.drawElements(mode, count, type, 0);
        } else {
            const mode = primitive.mode;
            const count = primitive.attributes.POSITION.count;
            gl.drawArrays(mode, 0, count);
        }
    }

}
