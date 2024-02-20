import { Program, Texture } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl, opt = {}) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
      transparent: true,
      cullFace: null,
    });

    const tx = new Texture(gl);

    this.uniforms = {
      u_time: { value: 0 },
      u_diff: { value: tx },
      u_resolution: { value: [0, 0] },
      u_mouse: { value: [0, 0] },
    };
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }

  set resolution(res) {
    this.uniforms.u_resolution.value = res;
  }

  // set diff(diff) {
  //   this.uniforms.u_diff.value = diff;
  // }

  set mouse(mouse) {
    this.uniforms.u_mouse.value = mouse;
  }
}
