import * as THREE from "three";
import { AxesHelper, BoxHelper, Mesh } from "three";
import { LoggerService } from "../../../app/logger.service";
import { DracoLoader } from "../../../app/3D/loaders/dracoLoader";
import { AssetsManager } from "../../../app/managers/assets-manager";
import { Asset } from "./asset";
import { App3D } from "../../../app/3D/app-3D";
import { Camera } from "../../../app/3D/camera";
import { xAxis, yAxis, zAxis } from "../../../config/axes";
import { Item } from "./items/item";
import { Time } from "../../../app/3D/utils/time";
import {
  AnimationActions,
  AnimationClips,
  AnimationNames,
} from "../../../models/animations.dto";
import { BehaviorSubject, map } from "rxjs";
import { COLORS } from "../../../constants/colors";

const SkeletonUtils = require("three/examples/jsm/utils/SkeletonUtils");

export class Model {
  declare _logger: LoggerService;

  declare _animationMixer: THREE.AnimationMixer;
  declare _animationActions: AnimationActions;
  declare _currentAnimationName$: BehaviorSubject<AnimationNames>;

  declare _assetsManager: AssetsManager;
  declare _loader: DracoLoader;

  declare _id: number;
  declare _name: string;
  declare _description: string;
  declare _scale: number;
  declare _height: number;
  declare _boundingBox: THREE.Box3;
  declare _assetId: number;
  #asset: THREE.Object3D | null = null;
  declare _initialPosition: THREE.Vector3;
  declare _rotation: THREE.Euler;

  // Interaction parameters
  declare _isInteractable: boolean;
  declare _checkpoint: Item | null;
  declare _checkpointColliding: boolean;

  // App 3D params
  declare _scene: THREE.Scene;
  declare _time: Time;
  declare _camera: Camera;
  declare _isDebug: boolean;

  // Helpers
  declare _boxHelper: THREE.BoxHelper;

  /**
   * Constructor
   */
  constructor(
    id: number,
    name: string,
    description: string,
    scale: number,
    assetId: number = -1,
    isInteractable: boolean,
    checkpoint: Item | null,
    initialPosition: THREE.Vector3 = new THREE.Vector3(),
    rotation: THREE.Euler = new THREE.Euler(0, 0, 0)
  ) {
    this._logger = new LoggerService();

    // Animation parameters
    this._animationActions = {
      none: null,
      greet: null,
      idle: null,
      run: null,
      talk: null,
      walkForward: null,
      walkBackward: null,
    };

    this._assetsManager = new AssetsManager();
    this._loader = new DracoLoader();

    this._checkpointColliding = false;

    this._id = id;
    this._name = name;
    this._description = description;
    this._scale = scale <= 1 ? 1 : scale;
    this._assetId = assetId;
    this._initialPosition = initialPosition;
    this._rotation = rotation;

    this._isInteractable = isInteractable;
    if (this._isInteractable) {
      this._checkpoint = checkpoint ?? null;
    }

    this._logger.log(`${this.constructor.name} class instantiated:`, this);
  }

  /**
   * id property getter
   */
  get id(): number {
    return this._id;
  }

  /**
   * asset property getter
   */
  get asset(): THREE.Object3D | null {
    return this.#asset;
  }

  /**
   * _checkpointColliding property setter.
   * Toggle model bounding box color
   */
  set checkpointColliding(value: boolean) {
    if (this._checkpointColliding === value) return;

    this._checkpointColliding = value;
    this._setBoxHelperColor();

    if (!this._checkpoint) return;

    (this._checkpoint as Item).checkpointColliding = value;
    (this._checkpoint as Item)._setBoxHelperColor();

    // Set greet animation if model is interacting, idle otherwise
    if (
      this._checkpointColliding &&
      this._currentAnimationName$.value !== AnimationNames.talk
    ) {
      this._currentAnimationName$.value !== AnimationNames.greet &&
        this._currentAnimationName$.next(AnimationNames.greet);
    } else {
      this._currentAnimationName$.value !== AnimationNames.idle &&
        this._currentAnimationName$.next(AnimationNames.idle);
    }
  }

  /**
   * Set app parameters
   * @param app3D app
   */
  public setAppParams(app3D: App3D) {
    this._scene = app3D._scene;
    this._isDebug = app3D._debug.getActive();
    this._time = app3D._time;

    if (this._name === "Main character") {
      this._camera = app3D._camera;
    }
  }

  /**
   * Set asset
   * @param asset id of the asset to set
   */
  public setAsset(assetId: number): void {
    const assetObj: Asset = this._assetsManager.getAssetWithId(assetId);
    this.#asset = SkeletonUtils.clone(assetObj._asset) as THREE.Object3D;

    this._logger.log(
      `${this.constructor.name} - Asset with id '${this._assetId}' cloned`,
      this
    );

    // Set model physical properties
    this.setScale();
    this.setPosition(this._initialPosition);
    this.setRotation(this._rotation);

    // Set animation tools
    this._setAnimationSubscription();
    this.setAnimationMixer(this.#asset);
    this.setAnimationActions(assetObj._animations);
    this._currentAnimationName$.next(AnimationNames.idle);

    this.setBoundingBox();
    this._setDebugHelperTools();

    if (this._camera) {
      this._camera.setCameraPosition(this);
      this.#asset.add(this._camera._instance);
    }

    this._scene.add(this.#asset);
  }

  /**
   * Subscribe to animations name subject
   * @returns {void}
   */
  private _setAnimationSubscription(): void {
    this._currentAnimationName$ = new BehaviorSubject<AnimationNames>(
      AnimationNames.none
    );
    this._currentAnimationName$
      .pipe(map(() => this.playAnimation()))
      .subscribe();
  }

  /**
   * Scale model
   */
  private setScale() {
    if (this._scale === 1) {
      this._logger.log(
        `${this.constructor.name} - Model '${this._id}' has scale set to ${this._scale}. Preserve asset height.`
      );
    } else {
      //this._asset.scale.set(this._scale, this._scale, this._scale);
    }
  }

  /**
   * Set asset position
   * @param {THREE.Vector3} vector3 3D vector
   * @returns {void}
   */
  public setPosition(vector3: THREE.Vector3): void {
    if (!this.#asset) {
      this._logger.warn(
        `${this.constructor.name} - Model ${this._id} does not have asset. Can't set position.`
      );
      return;
    }

    const [x, y, z]: any = vector3.toArray();
    this.#asset.position.set(x, y > 0 ? y : 0.05, z);
  }

  /**
   * Set model rotation
   * @returns {void}
   */
  public setRotation(euler: THREE.Euler = new THREE.Euler()): void {
    if (!this.#asset) {
      this._logger.warn(
        `${this.constructor.name} - Model ${this._id} does not have asset. Can't set rotation.`
      );
      return;
    }

    const [x, y, z]: any = euler.toArray();
    this.#asset.rotation.set(x, y, z);
  }

  /**
   * Set bounding box
   */
  public setBoundingBox(): void {
    const newBoundingBox: THREE.Box3 = new THREE.Box3().expandByObject(
      this.asset as THREE.Object3D
    );
    this._boundingBox = newBoundingBox;

    this.setHeight();
  }

  /**
   * Set model animation mixer
   * @param model model
   */
  private setAnimationMixer(model: THREE.Object3D): void {
    this._animationMixer = new THREE.AnimationMixer(model);
  }

  /**
   * Set model animations
   */
  private setAnimationActions(animations: AnimationClips): void {
    this._animationActions.greet =
      animations.greet &&
      this._animationMixer.clipAction(animations.greet as THREE.AnimationClip);
    this._animationActions.idle =
      animations.idle &&
      this._animationMixer.clipAction(animations.idle as THREE.AnimationClip);
    this._animationActions.run =
      animations.run &&
      this._animationMixer.clipAction(animations.run as THREE.AnimationClip);
    this._animationActions.talk =
      animations.talk &&
      this._animationMixer.clipAction(animations.talk as THREE.AnimationClip);
    this._animationActions.walkForward =
      animations.walkForward &&
      this._animationMixer.clipAction(
        animations.walkForward as THREE.AnimationClip
      );
    this._animationActions.walkBackward =
      animations.walkBackward &&
      this._animationMixer.clipAction(
        animations.walkBackward as THREE.AnimationClip
      );
  }

  /**
   * Set new current animation
   * @param {AnimationNames} animationName animation name to set
   */
  public setCurrentAnimationName(animationName: AnimationNames): void {
    // Do not set an animation if the same one is already on
    if (this._currentAnimationName$.value === animationName) {
      return;
    }

    this._currentAnimationName$.next(animationName);
  }

  /**
   * Play animation based on current status
   */
  public playAnimation(): void {
    // Stop current animation
    {
      this._animationActions.greet?.stop();
      this._animationActions.idle?.stop();
      this._animationActions.run?.stop();
      this._animationActions.talk?.stop();
      this._animationActions.walkBackward?.stop();
      this._animationActions.walkForward?.stop();
    }

    // Play new one
    switch (this._currentAnimationName$.value) {
      case AnimationNames.none:
        this._playAnimationNone();
        break;
      case AnimationNames.greet:
        this._playAnimationGreet();
        break;
      case AnimationNames.idle:
        this._playAnimationIdle();
        break;
      case AnimationNames.run:
        this._playAnimationRun();
        break;
      case AnimationNames.talk:
        this._playAnimationTalk();
        break;
      case AnimationNames.walkBackward:
        this._playAnimationWalkBackward();
        break;
      case AnimationNames.walkForward:
        this._playAnimationWalkForward();
        break;
      default:
        this._playAnimationIdle();
    }
  }

  /**
   * Manage model no animation
   */
  private _playAnimationNone(): void {}

  /**
   * Manage model greet animation
   */
  private _playAnimationGreet(): void {
    this._animationActions.greet?.play();
  }

  /**
   * Manage model idle animation
   */
  private _playAnimationIdle(): void {
    this._animationActions.idle?.play();
  }

  /**
   *  Manage model run animation
   */
  private _playAnimationRun(): void {
    this._animationActions.run?.play();
  }

  /**
   * Manage model talk animation
   */
  private _playAnimationTalk(): void {
    this._animationActions.talk?.play();
  }

  /**
   * Manage model walk backward animation
   */
  private _playAnimationWalkBackward(): void {
    this._animationActions.walkBackward?.play();
  }

  /**
   * Manage model walk forward animation
   */
  private _playAnimationWalkForward(): void {
    this._animationActions.walkForward?.play();
  }

  /**
   * Append checkpoint item to current model
   */
  public setCheckpoint(id: number): void {
    if (!this._isInteractable) return;

    (this._checkpoint as Item).setAsset(id);
  }

  /**
   * Set model height
   */
  public setHeight() {
    this._height = this._boundingBox.max.y - this._boundingBox.min.y;
  }

  /**
   * Set helper tools to show in debug mode
   */
  private _setDebugHelperTools(): void {
    if (!this._isDebug) return;

    this._setBoundingBoxHelper();
    this._setModelAxesHelper();
  }

  /**
   * Set bounding axes helper
   */
  private _setModelAxesHelper(): void {
    const height: number = Math.min(
      this._boundingBox.max.x - this._boundingBox.min.x,
      this._boundingBox.max.y - this._boundingBox.min.y,
      this._boundingBox.max.z - this._boundingBox.min.z
    );

    const axesHelper = new THREE.AxesHelper(height);
    (this.asset as THREE.Object3D).add(axesHelper);
  }

  /**
   * Set bounding box debug helper
   */
  private _setBoundingBoxHelper(): void {
    this._boxHelper = new THREE.BoxHelper(
      this.asset as THREE.Object3D,
      0xffff00
    );
    (this.asset as THREE.Object3D).attach(this._boxHelper);
  }

  private _setBoxHelperColor(): void {
    if (!this._boxHelper) return;

    const defaultColor: string = COLORS.YELLOW;
    const collidingColor: string = COLORS.RED;
    const bboxColor: string = this._checkpointColliding
      ? collidingColor
      : defaultColor;

    // this._boxHelper["material"]["color"] = new THREE.Color(bboxColor);
  }

  /**
   * Load asset
   */
  public loadAsset(): void {
    if (this._assetId === -1) {
      this._logger.error(
        `${this.constructor.name} - Can't load asset with id set to -1`,
        this
      );
      return;
    }

    const asset: Asset = this._assetsManager.getAssetWithId(this._assetId);
    this._loader.loadAsset(asset);
  }

  /**
   * Dispose asset
   */
  public disposeAsset(): void {
    this._currentAnimationName$.unsubscribe();

    let assetsToDispose: Array<THREE.Object3D> = [];
    assetsToDispose.push(this.asset as THREE.Object3D);
    if (this._checkpoint) {
      assetsToDispose.push(this._checkpoint.asset as THREE.Object3D);
    }

    assetsToDispose.forEach((asset) => {
      this._logger.log(
        `${this.constructor.name} - Disposing '${this._name}; asset: `,
        asset
      );

      if (asset.children?.length > 0) {
        asset.children.forEach((child) => {
          let childMesh: Mesh | AxesHelper | BoxHelper;
          if (child instanceof Mesh) {
            childMesh = child as Mesh;
          } else if (child instanceof AxesHelper) {
            childMesh = child as AxesHelper;
          } else if (child instanceof BoxHelper) {
            childMesh = child as BoxHelper;
          } else {
            return;
          }

          childMesh.geometry.dispose();
          //(childMesh.material as Array<THREE.Material>).forEach((material) => material.dispose());
        });
      }

      this._scene.remove(asset);
    });

    this.#asset = null;
    if (this._checkpoint) {
      this._checkpoint.#asset = null;
    }
  }

  /**
   * Update model
   */
  public update(): void {
    this.#asset && this._animationMixer.update(this._time._delta * 0.001);
  }
}
