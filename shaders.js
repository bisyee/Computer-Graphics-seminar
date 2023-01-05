const vertex = `#version 300 es
layout (location = 0) in vec4 aPosition;
layout (location = 3) in vec2 aTexCoord;
layout (location = 2) in vec3 aNormal;

uniform mat4 uMvpMatrix;
uniform mat4 uProjection;
uniform vec3 uLightPosition;
uniform vec3 uLightAttenuation;

out vec3 vEye;
out vec3 vLight;
out vec3 vNormal;
out vec2 vTexCoord;
out float vAttenuation;
void main() {
    vec3 vertexPosition = (uMvpMatrix *aPosition).xyz;
    vec3 lightPosition = (uMvpMatrix * vec4(uLightPosition, 1)).xyz;
    vEye = -vertexPosition;
    vLight = lightPosition - vertexPosition;
    vNormal = (uMvpMatrix * vec4(aNormal, 0)).xyz;
    vTexCoord = aTexCoord;
    
    float d = distance(vertexPosition, lightPosition);
    vec3 attenuation = uLightAttenuation * vec3(1, d, d * d);
    vAttenuation = 1.0 / dot(attenuation, vec3(1, 1, 1));
    gl_Position = uMvpMatrix * aPosition;
}
`;

const fragment = `#version 300 es
precision mediump float;

uniform sampler2D uBaseColorTexture;
uniform vec4 uBaseColorFactor;

uniform vec3 uAmbientColor;
uniform vec3 uDiffuseColor;
uniform vec3 uSpecularColor;

uniform float uShininess;

in vec3 vEye;
in vec3 vLight;
in vec3 vNormal;
in vec2 vTexCoord;
in float vAttenuation;

out vec4 oColor;

void main() {
    vec3 N = normalize(vNormal);
    vec3 L = normalize(vLight);
    vec3 E = normalize(vEye);
    vec3 R = normalize(reflect(L, N));

    float phong = pow(max(0.0, dot(E, R)), uShininess);

    vec3 ambient = uAmbientColor;
    vec3 specular = uSpecularColor * phong;

    vec3 light = (ambient + specular) * vAttenuation;
    vec4 baseColor = texture(uBaseColorTexture, vTexCoord);
    oColor = uBaseColorFactor * vec4(light, 1) * baseColor;
   
   
}
`;

export const shaders= {
    phong: { vertex, fragment }
};