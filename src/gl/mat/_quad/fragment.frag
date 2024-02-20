precision highp float;

varying vec3 v_normal;
varying vec2 v_uv;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_diff;


void main() {

  vec2 uv_mouse =  u_mouse / 2.0 + 0.5;
  // float res = u_resolution.x / u_resolution.y;

  // float dist = distance(v_uv, uv_mouse) * res;
  // dist = smoothstep(.0, .3, dist);

  vec4 color = texture2D(u_diff, v_uv);
  
  gl_FragColor.rgb = vec3(color.rgb);
  gl_FragColor.a = 1.0;
}
