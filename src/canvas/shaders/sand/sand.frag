varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform sampler2D uAlbedo;
uniform sampler2D uNormal;
uniform sampler2D uRoughness;
uniform sampler2D uAo;

void main() {
    vec4 albedo = texture2D(uAlbedo, vUv);
    vec4 ao = texture2D(uAo, vUv);

    // Improved lighting
    vec3 normal = normalize(vNormal);

    // Main directional light
    vec3 lightDir = normalize(vec3(1.0, 2.0, 1.0)); // Higher light position
    float diff = max(dot(normal, lightDir), 0.0);

    // Ambient light with AO
    vec3 ambient = albedo.rgb * 0.5 * ao.r; // Increased ambient

    // Diffuse light
    vec3 diffuse = diff * albedo.rgb;

    // Add some fake subsurface scattering
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float rim = 1.0 - max(dot(viewDir, normal), 0.0);
    vec3 subsurface = rim * albedo.rgb * 0.3;

    // Combine all components
    vec3 finalColor = ambient + diffuse + subsurface;

    gl_FragColor = vec4(finalColor, 1.0);
}