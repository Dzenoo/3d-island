precision highp float;

uniform float uTime;

uniform float uWavesElevation;
uniform vec2 uWavesFrequency;
uniform float uWavesLacunarity;
uniform int uWavesIterations;
uniform float uWavesPersistence;
uniform float uWavesSpeed;

varying vec3 vWorldPosition;
varying vec3 vNormal;

float getElevation(float x, float z) {
    // float elevation = sin(modelPosition.x * uWavesFrequency.x + uTime * uWavesSpeed) * 
    //                   sin(modelPosition.z * uWavesFrequency.y + uTime * uWavesSpeed) *
    //                   uWavesElevation;
    vec2 pos = vec2(x, z);
    float elevation = 0.0;
    float amplitude = 1.0;
    vec2 frequency = uWavesFrequency.xy;
    vec2 p = pos.xy;

    for (int i = 0; i < uWavesIterations; i++) {
        float noiseValue = snoise(p * frequency + uTime * uWavesSpeed);
        elevation += amplitude * noiseValue;
        amplitude *= uWavesPersistence;
        frequency *= uWavesLacunarity;
    }

    elevation *= uWavesElevation;

    return elevation;
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = getElevation(modelPosition.x, modelPosition.z);
    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    float eps = 0.001;
    vec3 tangent = normalize(vec3(eps, getElevation(modelPosition.x - eps, modelPosition.z) - elevation, 0.0));
    vec3 bitangent = normalize(vec3(0.0, getElevation(modelPosition.x, modelPosition.z - eps) - elevation, eps));
    vec3 objectNormal = normalize(cross(tangent, bitangent));

    vNormal = objectNormal;
    vWorldPosition = modelPosition.xyz;

    gl_Position = projectedPosition;
}