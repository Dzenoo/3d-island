precision mediump float;

varying float vHeight;

void main() {
  vec3 bottomColor = vec3(0.2, 0.1, 0.05); 
  vec3 topColor = vec3(0.753, 1.0, 0.169); 

  vec3 color = mix(bottomColor, topColor, vHeight);
  gl_FragColor = vec4(color, 1.0);
}
