precision mediump float;

attribute vec3 position;
attribute mat4 instanceMatrix;
attribute float aOffset;
attribute float aCurveStrength;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;

varying float vHeight;

void main() {
  vec3 pos = position;

  pos.x += sin(pos.y * 3.14) * aCurveStrength;
  pos.x += pow(pos.y, 3.0) * aCurveStrength * 0.5;  

  float wind = sin(uTime + aOffset) * 0.2;
  pos.x += wind * pos.y;

  float twist = pos.y * 1.5;
  float angle = sin(uTime + aOffset) * 0.1;
  mat2 rotation = mat2(cos(angle + twist), -sin(angle + twist), sin(angle + twist), cos(angle + twist));
  pos.xz = rotation * pos.xz;

  vHeight = pos.y;

  vec4 worldPosition = instanceMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * worldPosition;
}
