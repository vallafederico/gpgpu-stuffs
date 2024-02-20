precision highp float;

uniform float u_time;
varying vec2 v_uv;

uniform sampler2D u_diff;

uniform vec2 u_mouse;
uniform float u_speed;

#include '../simplex.glsl';
// #include '../perlin.glsl';

const float DECAY = .98;
const float DIM = .001;

const float MOUSE_NOISE = 0.1;


void main() {
    vec2 uv_mouse =  u_mouse / 2.0 + 0.5;


    float r_time = u_time * .02;
    float ns = snoise(vec4(v_uv * 1.4, r_time, 1.));

    // + sample
    vec4 tx = texture2D(u_diff, v_uv);
    vec4 tx_flat = texture2D(u_diff, v_uv + ns * .001);
    float diff = tx.r;
    float prevAverage = tx_flat.g;
    

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
            
            sum *= .10;
            // sum = min(sum, .2);
            samples++;
        }
    }


    float avgColor = (sum) / float(samples);
    avgColor *= .8;
    avgColor -= mix(prevAverage, (0.), ns * .3 ) ;
    
    diff += avgColor * .9;
    
    
    // >> sim
    diff *= DECAY;
    diff -= DIM;
    
    // + mouse distance
    float dist = distance(v_uv + ns * u_speed * .5 * MOUSE_NOISE, uv_mouse);
    dist = smoothstep(u_speed * .1 , .0, dist);

    // >> close
    diff += dist * .1;



    gl_FragColor.rgb = vec3(diff, avgColor, 0.);
    gl_FragColor.a = 1.0;
}
