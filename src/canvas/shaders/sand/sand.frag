precision highp float;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vec3 edgeColor = vec3(0.749, 0.667, 0.01);
    vec3 centerColor = vec3(1.0, 0.941, 0.612);

    float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));

    float blendFactor = smoothstep(0.0, 0.4, edgeDist); 
    vec3 finalColor = mix(edgeColor, centerColor, blendFactor);

    gl_FragColor = vec4(finalColor, 1.0);
}
