import { Program, Texture } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl, options = {}) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
      transparent: true,
      cullFace: null,
    });

    this.uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: [0, 0] },
      u_diff: { value: new Texture(gl) },
    };
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }

  set mouse(m) {
    this.uniforms.u_mouse.value = m;
  }
}
