import * as THREE from "three";

import { App } from "../app";
import {
  assetLoadedEventEmitter,
  changeEnvironmentEventEmitter,
  cubeTextureLoadedEventEmitter,
  resizeEventEmitter,
  showInteractionTabEventEmitter,
  tickEventEmitter,
} from "../event-emitter/events";
import { LoggerService } from "../logger.service";
import { Sizes } from "./utils/sizes";
import { Time } from "./utils/time";
import { Camera } from "./camera";
import { Renderer } from "./renderer";
import { World } from "./world/world";

import { canvasSelector, canvasHTMLTemplate } from "../../config/app-3D";

import { AssetsManager } from "../managers/assets-manager";
import { CharactersManager } from "../managers/characters-manager";
import { BuildingsManager } from "../managers/buildings-manager";
import { ItemsManager } from "../managers/items-manager";
import { Debug } from "../debug";
import { GUI } from "./dat-gui";
import { Controller } from "./controllers/controller";

import { DracoLoader } from "./loaders/dracoLoader";
import { CubeTextureLoader } from "./loaders/cubeTextureLoader";
import { BackgroundCubeTexturesManager } from "../managers/background-cube-textures";
import { LanguageService } from "../language.service";
import { EnvironmentsService } from "../environment.service";
import { Model } from "../../models/3D/environment/model";
import { TouchScreenDevice } from "../touch-screen";
import { INSERT_ADJACENT_HTML_POSITIONS } from "../../constants/insertAdjacentHTMLPositions";

export class App3D {
  declare _debug: Debug;
  declare _touchScreenDevice: TouchScreenDevice;
  declare _logger: LoggerService;
  declare _languageService: LanguageService;
  declare _environmentsService: EnvironmentsService;
  declare _gui: GUI;
  declare _container: HTMLElement;

  declare _loader: DracoLoader;
  declare _cubeTextureLoader: CubeTextureLoader;

  declare _camera: Camera;
  declare _canvas: HTMLCanvasElement;
  declare _renderer: Renderer;
  declare _scene: THREE.Scene;
  declare _sizes: Sizes;
  declare _time: Time;
  declare _world: World;
  declare _controller: Controller;

  declare _backgroundCubeTexturesManager: BackgroundCubeTexturesManager;
  declare _assetsManager: AssetsManager;
  declare _charactersManager: CharactersManager;
  declare _buildingsManager: BuildingsManager;
  declare _itemsManager: ItemsManager;

  /**
   * Constructor
   * @constructor
   * @ignore
   */
  constructor(app: App) {
    this._debug = app._debug;
    this._touchScreenDevice = app._touchScreenDevice;
    this._logger = app._logger;
    this._languageService = app._languageService;
    this._environmentsService = app._environmentsService;
    this._container = app._appContainer;
    this.setCanvas();

    this._loader = new DracoLoader();
    this._cubeTextureLoader = new CubeTextureLoader();

    this._scene = new THREE.Scene();
    this._gui = new GUI(this);
    this._sizes = new Sizes(this);
    this._time = new Time(this);
    this._camera = new Camera(this);
    this._renderer = new Renderer(this);

    this._backgroundCubeTexturesManager = new BackgroundCubeTexturesManager();
    this._assetsManager = new AssetsManager();
    this._charactersManager = new CharactersManager();
    this._buildingsManager = new BuildingsManager();
    this._itemsManager = new ItemsManager();

    this._world = new World(this);

    this.setEventListeners();

    this._logger.log(`${this.constructor.name} class instantiated:`, this);
  }

  /**
   * Set canvas element
   * @returns {void}
   */
  private setCanvas(): void {
    this._container.insertAdjacentHTML(
      INSERT_ADJACENT_HTML_POSITIONS.BEFORE_END as InsertPosition,
      canvasHTMLTemplate
    );
    this._canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
  }

  /**
   * Set event listeners connected to this class
   * @returns {void}
   */
  private setEventListeners(): void {
    resizeEventEmitter.on(() => this.resize());
    tickEventEmitter.on(() => this.update());
    assetLoadedEventEmitter.on((assetId: number) => this.setModel(assetId));
    cubeTextureLoadedEventEmitter.on(() => this.setBackgroundCubeTexture());

    changeEnvironmentEventEmitter.on(() => this.setEnvironment());
    showInteractionTabEventEmitter.on((model: Model) =>
      this.setInteractionTab(model)
    );
  }

  /**
   * Resize
   * @returns {void}
   */
  private resize(): void {
    this._camera?.resize();
    this._renderer?.resize();
  }

  /**
   * Update all elements in the scene
   * @returns {void}
   */
  private update(): void {
    //this._camera.update();
    this._world.update();
    this._renderer?.update();
  }

  /**
   * An asset has been loaded.
   * Set it to all the models with the corresponding assetId
   * @param {number} assetId id of the loaded asset
   * @returns {void}
   */
  private setModel(assetId: number): void {
    this._world.setModel(assetId);
  }

  /**
   * A background cube texture has been loaded
   * @returns {void}
   */
  private setBackgroundCubeTexture(): void {
    this._world.setBackgroundCubeTexture();
  }

  /**
   * Change world environment
   * @returns {void}
   */
  public setEnvironment(): void {
    this._world.setEnvironment();
  }

  /**
   * The user has interacted with a model that has to show a tab. Show it.
   * @param {Model} model model interacting with the main character
   * @returns {void}
   */
  public setInteractionTab(model: Model): void {
    this._world.setInteractionTab(model);
  }
}
