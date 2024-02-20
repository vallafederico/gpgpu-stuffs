import { Program, Texture } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

import { map } from "../../../util/math";

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
      u_speed: { value: 0 },
    };
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }

  set mouse(m) {
    this.uniforms.u_mouse.value = m;
  }

  set speed(sp) {
    // console.log(Math.abs(sp));
    this.uniforms.u_speed.value = map(sp, 0, 20, 0, 1);
    // console.log(this.uniforms.u_speed.value);
  }
}
