precision highp float;

uniform float u_time;
varying vec2 v_uv;

uniform sampler2D u_diff;

uniform vec2 u_mouse;

#include '../simplex.glsl';

const float DECAY = .982;
const float DIM = .01;


void main() {
    vec2 uv_mouse =  u_mouse / 2.0 + 0.5;

    float r_time = u_time * .02;
    float ns = snoise(vec4(v_uv * 3.2, r_time, r_time));

    // noise here with a really small value makes it feel alive
    vec3 diff = texture2D(u_diff, v_uv + (ns * .001)).rgb;
    // the - moves it to a direction
    // vec3 diff = texture2D(u_diff, v_uv + ns * .01 - .01).rgb; 
    
    // >> sim
    diff *= DECAY;
    // diff -= DIM;
    

    float dist = distance(v_uv + ns * .02, uv_mouse);
    dist = smoothstep(.1, .0, dist);




    diff += dist * 1.;


    gl_FragColor.rgb = vec3(diff.rrr);
    gl_FragColor.a = 1.0;
}
