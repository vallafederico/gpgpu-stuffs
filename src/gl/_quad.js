import { Plane, Mesh, Texture } from "ogl";
import Material from "./mat/_quad";

export class Quad extends Mesh {
  constructor(gl, diff = null) {
    super(gl, {
      geometry: new Plane(gl, {
        width: 2,
        height: 2,
      }),
      program: new Material(gl),
    });

    // console.log(this.gl.vp);

    this.texture = new Texture(gl, {
      width: 720,
      height: 720,
    });

    this.gl = gl;
    this.resize(this.gl.vp);
  }

  resize(vp) {
    this.gl.vp = vp;

    this.program.resolution = [this.gl.vp.w, this.gl.vp.h];

    // // screen ratio
    // this.scale.x = (this.gl.vp.w / this.gl.vp.h) * 2;
    // this.scale.y = 2;
  }

  render(t) {
    this.program.time = t;
    this.program.mouse = [app.gl.mouse.ex, app.gl.mouse.ey];
  }
}

// class Targets {
//   constructor(gl) {}
// }
