precision highp float;

uniform float uOpacity;

uniform vec3 uTroughColor;
uniform vec3 uSurfaceColor;
uniform vec3 uPeakColor;

uniform float uTroughThreshold;
uniform float uTroughTransition;
uniform float uPeakThreshold;
uniform float uPeakTransition;

uniform float uFresnelStrength;
uniform float uFresnelPower;

uniform sampler2D uEnvMap;

varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
    vec3 viewDirection = normalize(vWorldPosition - cameraPosition);

    vec3 reflectedDirection = reflect(viewDirection, vNormal);

    vec3 reflectionColor = texture(uEnvMap, reflectedDirection.xy).rgb;

    float fresnel = uFresnelStrength * pow(1.0 - clamp(dot(viewDirection, vNormal), 0.0, 1.0), uFresnelPower);

    float elevation = vWorldPosition.y;
    float peakFactor = smoothstep(uPeakThreshold - uPeakTransition, uPeakThreshold + uPeakTransition, elevation);
    float troughFactor = smoothstep(uTroughThreshold - uTroughTransition, uTroughThreshold + uTroughTransition, elevation);

    vec3 mixedColor1 = mix(uTroughColor, uSurfaceColor, troughFactor);
    vec3 mixedColor2 = mix(mixedColor1, uPeakColor, peakFactor);

    vec3 finalColor = mix(mixedColor2, reflectionColor, fresnel);

    gl_FragColor = vec4(finalColor, uOpacity);
}
