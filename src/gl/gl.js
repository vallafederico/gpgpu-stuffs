import { Renderer, Orbit, Vec3 } from "ogl";
import { Cam } from "./camera.js";
import { Scene } from "./_scene.js";

import { lerp } from "../util/math";

export const params = {
  clearColor: [0.0, 0.0, 0.0, 1],
};

export default class {
  time = 0;
  mouse = { x: 0, y: 0, ex: 0, ey: 0 };
  constructor() {
    this.vp = {
      container: document.querySelector('[data-gl="c"]'),
      w: window.innerWidth,
      h: window.innerHeight,
      aspect: () => {
        return this.vp.w / this.vp.h;
      },
      dpr: () => {
        return Math.min(window.devicePixelRatio, 2);
      },
    };

    this.renderer = new Renderer({
      dpr: this.vp.dpr(),
      // antialias: true,
      // alpha: true,
    });

    this.gl = this.renderer.gl;
    this.gl.clearColor(...params.clearColor);

    this.vp.container.appendChild(this.gl.canvas);

    this.camera = new Cam(this.gl, {});
    this.camera.position.set(0, 0, 5);
    // this.camera.lookAt([0, 0, 0]);
    this.gl.camera = this.camera;

    this.scene = new Scene(this.gl);
    this.time = 0;

    handleResize(this.vp.container, this.resize.bind(this));
    this.gl.vp = this.vp;

    this.controls = new Orbit(this.camera, {
      target: new Vec3(0, 0, 0),
    });

    this.initEvents();
  }

  render(scroll = 0) {
    this.time += 0.5;

    this.mouse.ex = lerp(this.mouse.ex, this.mouse.x, 0.1);
    this.mouse.ey = lerp(this.mouse.ey, this.mouse.y, 0.1);

    // console.log(this.mouse.x, this.mouse.y);

    this.controls?.update();
    this.scene?.render(this.time);

    this.gl.clearColor(...params.clearColor);
    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });
  }

  initEvents() {
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / this.vp.w) * 2 - 1;
      this.mouse.y = -(e.clientY / this.vp.h) * 2 + 1;
    });
  }

  resize({ width, height }) {
    this.vp.w = width;
    this.vp.h = height;

    this.vp.viewSize = this.camera.getViewSize(this.vp.ratio);
    this.vp.viewRatio = this.vp.viewSize.w / this.vp.w;

    this.renderer.setSize(this.vp.w, this.vp.h);

    this.camera.perspective({
      aspect: this.vp.aspect(),
    });

    this.scene.resize(this.vp);
  }
}

/** Utils */
function handleResize(container, cb) {
  new ResizeObserver((entry) => cb(entry[0].contentRect)).observe(container);
}
