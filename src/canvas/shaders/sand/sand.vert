precision highp float;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Displacement
    vec2 coord = modelPosition.xz * 0.2;
    float displace = snoise(coord) * 0.25;
    modelPosition.y += displace;

    // Compute normals using partial derivatives
    float delta = 0.1;
    float displaceX = snoise(coord + vec2(delta, 0.0)) * 0.25;
    float displaceZ = snoise(coord + vec2(0.0, delta)) * 0.25;

    vec3 tangent = vec3(delta, displaceX - displace, 0.0);
    vec3 bitangent = vec3(0.0, displaceZ - displace, delta);
    vec3 computedNormal = normalize(cross(tangent, bitangent));

    vNormal = normalize(normalMatrix * computedNormal);

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
}