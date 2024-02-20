precision highp float;

uniform float u_time;
varying vec2 v_uv;

uniform sampler2D u_diff;

uniform vec2 u_mouse;

#include '../simplex.glsl';


void main() {

    vec3 diff = texture2D(u_diff, v_uv).rgb;
    diff *= .899;

    float r_time = u_time * .05;
    float ns = snoise(vec4(v_uv * 16., r_time, r_time));

    vec2 uv_mouse =  u_mouse / 2.0 + 0.5;
    float dist = distance(v_uv + ns * .02, uv_mouse) ;
    dist = smoothstep(.0, .5, dist);




    diff += dist * 1.;


    gl_FragColor.rgb = vec3(diff.r, 0., 1.);
    gl_FragColor.a = 1.0;
}
