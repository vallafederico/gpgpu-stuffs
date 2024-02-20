precision highp float;

uniform float u_time;
varying vec2 v_uv;

uniform sampler2D u_diff;

uniform vec2 u_mouse;

#include '../simplex.glsl';
// #include '../perlin.glsl';

const float DECAY = .95;
const float DIM = .002;

const float MOUSE_NOISE = 0.1;


void main() {
    vec2 uv_mouse =  u_mouse / 2.0 + 0.5;

    float r_time = u_time * .04;
    float ns = snoise(vec4(v_uv * 3.1, r_time, (v_uv.x + v_uv.y + r_time)));
    // ns *= snoise(vec4(v_uv * .8, r_time, ns * r_time) * 2.0);


    // + sample
    vec4 tx = texture2D(u_diff, v_uv + ns * .0001);
    float diff = tx.r;
    float prevAverage = tx.g;
    

    vec2 texCoord = gl_FragCoord.xy / vec2(720, 720);
    vec2 pixelSize = 1.0 / vec2(720, 720);
    float sum = (0.0); // Sum of sampled colors
    int samples = 0; // Number of samples

    // float rm_ns = ns;
    // rm_ns *= .1;

    for(int x = -1; x <= 1; x++) {
        for(int y = -1; y <= 1; y++) {
            vec2 offset = vec2(x, y) * pixelSize;
            sum += texture2D(u_diff, vec2(
                v_uv.x + offset.x,
                v_uv.y + offset.y
                )).r;
            
            sum *= .50;
            // sum = min(sum, .2);
            samples++;
        }
    }


    float avgColor = (sum) / float(samples);
    avgColor -= prevAverage;
    // avgColor *= .899;

    diff += avgColor * .8;
    
    
    // >> sim
    diff *= DECAY;
    diff -= DIM;
    
    // + mouse distance
    float dist = distance(v_uv + ns * MOUSE_NOISE, uv_mouse);
    dist = smoothstep(.1, .0, dist);

    // >> close
    diff += dist * .1;



    gl_FragColor.rgb = vec3(diff, avgColor, 0.);
    gl_FragColor.a = 1.0;
}
