precision highp float;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec2 coord = modelPosition.xz * 0.2;
    float displace = snoise(coord) * 0.25;
    modelPosition.y += displace;

    float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float falloff = 1.0 - smoothstep(0.1, 0.2, edgeDist);
    float dropAmount = 0.8;
    modelPosition.y -= falloff * dropAmount;

    vec2 center = vec2(0.5, 0.5);
    float distToCenter = distance(vUv, center);
    float centerFalloff = 1.0 - smoothstep(0.0, 0.5, distToCenter);
    float raiseAmount = 2.5;
    modelPosition.y += centerFalloff * raiseAmount;

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
