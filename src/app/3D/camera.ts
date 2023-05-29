import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { LoggerService } from "../logger.service";
import { App3D } from "./app-3D";
import { Sizes } from "./utils/sizes";

import { fov, near, far } from "../../config/app-3D";
import { GUI } from "./dat-gui";
import { Model } from "../../models/3D/environment/model";
import { yAxis, zAxis } from "../../config/axes";

export class Camera {
  declare _logger: LoggerService;
  declare _gui: GUI;

  declare _canvas: HTMLCanvasElement;
  declare _sizes: Sizes;
  declare _scene: THREE.Scene;
  declare _instance: THREE.PerspectiveCamera;
  declare _helperInstance: THREE.CameraHelper;
  declare _controls: OrbitControls;

  /**
   * Constructor
   */
  constructor(app3D: App3D) {
    this._logger = app3D._logger;
    this._gui = app3D._gui;

    this._canvas = app3D._canvas;
    this._scene = app3D._scene;
    this._sizes = app3D._sizes;

    this.setInstance();
    this.setOrbitControls();
    this.setDebugHelpers();

    this._logger.log(`${this.constructor.name} class instantiated:`, this);
  }

  /**
   * Set THREE camera instance
   */
  private setInstance(): void {
    this._instance = new THREE.PerspectiveCamera(
      fov,
      this._sizes._width / this._sizes._height,
      near,
      far
    );
  }

  /**
   * Set camera ideal position
   * @param model asset according to
   */
  public setCameraPosition(model: Model): void {
    this._instance.position.copy(
      (model.asset as THREE.Object3D).children[0].position
    );
    let cameraOffset: THREE.Vector3 = new THREE.Vector3();

    const k: number = 2;
    const assetHeight: number = model._height;

    cameraOffset.y = assetHeight * k;
    cameraOffset.z = assetHeight * k * 3;

    this._instance.translateOnAxis(yAxis, cameraOffset.y);
    this._instance.translateOnAxis(zAxis, cameraOffset.z);
  }

  /**
   * Set THREE orbit controls
   */
  private setOrbitControls(): void {
    this._controls = new OrbitControls(this._instance, this._canvas);
    this._controls.enableDamping = true;
  }

  /**
   * Set additional helpers if in debug
   */
  private setDebugHelpers(): void {
    this.setCameraHelper();
    this.setGUIControls();
  }

  /**
   * Set camera helper
   */
  private setCameraHelper(): void {
    this._helperInstance = new THREE.CameraHelper(this._instance);
    //this._scene.add(this._helperInstance);
  }

  /**
   * Set GUI controls
   */
  private setGUIControls(): void {
    const GUIcameraFolder = this._gui.gui?.addFolder("camera");
    if (GUIcameraFolder) {
      GUIcameraFolder.add(this._instance.position, "x")
        .name("x")
        .min(-100)
        .max(100)
        .step(0.1);
      GUIcameraFolder.add(this._instance.position, "y")
        .name("y")
        .min(-100)
        .max(100)
        .step(0.1);
      GUIcameraFolder.add(this._instance.position, "z")
        .name("z")
        .min(-100)
        .max(100)
        .step(0.1);
    }
  }

  /**
   * Resize
   */
  public resize(): void {
    this._instance.aspect = this._sizes._width / this._sizes._height;
    this._instance.updateProjectionMatrix;
  }

  /**
   * Update orbit controls
   */
  public update(): void {
    //this._controls.update();
  }
}
