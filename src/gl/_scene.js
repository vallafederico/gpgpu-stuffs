import { Transform, RenderTarget } from "ogl";
import { Quad } from "./_quad.js";
import Screen from "./_screen.js";
// import { loadAssets } from "./util/loader.js";

export class Scene extends Transform {
  isOn = false;

  constructor(gl, data = {}) {
    super();
    this.gl = gl;

    setTimeout(() => this.create(), 0);
  }

  async create() {
    /* Basic Quad */
    this.quad = new Quad(this.gl);
    this.quad.setParent(this);

    const opt = {
      width: this.gl.vp.w,
      height: this.gl.vp.h,
    };

    this.screens = [new Screen(this.gl), new Screen(this.gl)];

    this.targets = [
      new RenderTarget(this.gl, opt),
      new RenderTarget(this.gl, opt),
    ];

    this.current = 0;

    this.isOn = true;
  }

  render(t) {
    if (!this.isOn) return;

    this.screens?.forEach((s) => s.render(t));

    // -> write to tx 0
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.renderer.render({
      scene: this.screens[this.current],
      camera: this.gl.camera,
      target: this.targets[this.current],
    });

    // > swap
    this.current = 1 - this.current;

    // -> read from tx 0 -> write to tx 1
    this.screens[this.current].program.uniforms.u_diff.value =
      this.targets[1 - this.current].texture;
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.renderer.render({
      scene: this.screens[this.current],
      camera: this.gl.camera,
      target: this.targets[this.current],
    });

    this.quad.program.uniforms.u_diff.value =
      this.targets[this.current].texture;

    if (this.quad) this.quad.render(t);
  }

  resize(vp) {
    this.vp = vp;

    if (this.quad) this.quad.resize(vp);
  }
}
