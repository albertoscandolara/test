import { DOM_EVENTS } from "../../../constants/DOMEevents";
import { MainCharacter } from "../../../models/3D/environment/characters/main-character";
import { AnimationNames } from "../../../models/animations.dto";
import { Logger } from "../../logger";
import { App3D } from "../app-3D";
import { Time } from "../utils/time";

export class Move {
  declare forward: boolean;
  declare backward: boolean;
  declare right: boolean;
  declare left: boolean;

  /**
   * Constructor
   * @ignore
   */
  constructor() {
    this.forward = false;
    this.backward = false;
    this.right = false;
    this.left = false;
  }
}

export class ParentController {
  protected _logger!: Logger;

  protected _move: Move = new Move();

  protected _explore: boolean = false;
  protected _isRunning: boolean = false;

  private _time: Time;
  private _mainCharacter: MainCharacter;
  private _mainCharacterRotationAngle: number;
  private _mainCharacterTraslationDistance: number;
  private _runCoefficient: number;

  /**
   * Constructor
   * @ignore
   */
  constructor(app3D: App3D) {
    this._logger = new Logger();
    this._time = app3D._time;

    this._mainCharacter = app3D._world._mainCharacter as MainCharacter;

    this._mainCharacterRotationAngle = 0.05;
    this._mainCharacterTraslationDistance =
      (this._mainCharacter._speed * this._time._delta) / 80;
    this._runCoefficient = 2;

    this._setEventListeners();
  }

  /**
   * Update orbit controls
   */
  public update(): void {
    if (
      this._mainCharacter._currentAnimationName$.value === AnimationNames.talk
    ) {
      return;
    }

    this.updateMainCharacterOrientation();

    if (!this._explore) {
      this.updateMainCharacterPosition();
    }

    this.updateMainCharacterStatus();
  }

  private _setEventListeners(): void {
    document.addEventListener(DOM_EVENTS.MOUSE_DOWN, (e: Event) =>
      this.mouseDown(e as MouseEvent)
    );
    document.addEventListener(DOM_EVENTS.MOUSE_UP, (e: Event) =>
      this.mouseUp(e as MouseEvent)
    );
  }

  mouseDown(e: MouseEvent): void {
    this._explore = true;
    // move camera up
    this._logger.log(`${this.constructor.name} - exploring`);
  }

  mouseUp(e: MouseEvent): void {
    this._explore = false;
    // move camera down
    this._logger.log(`${this.constructor.name} - moving`);
  }

  /**
   * Update main character orientation
   */
  private updateMainCharacterOrientation(): void {
    if (this._move.right || this._move.left) {
      let angle: number = this._move.right
        ? -this._mainCharacterRotationAngle
        : this._mainCharacterRotationAngle;
      this._mainCharacter._asset.rotateY(angle);
    }
  }

  /**
   * Update main character position
   */
  private updateMainCharacterPosition(): void {
    let distance: number = 0;
    if (this._move.forward) {
      if (this._isRunning) {
        distance =
          -this._mainCharacterTraslationDistance * this._runCoefficient;
      } else {
        distance = -this._mainCharacterTraslationDistance;
      }
    } else if (this._move.backward) {
      distance = this._mainCharacterTraslationDistance;
    }

    this._mainCharacter._asset.translateZ(distance);

    this._mainCharacter.setBoundingBox();
  }

  /**
   * Update main character status
   */
  private updateMainCharacterStatus(): void {
    if (this._move.forward) {
      if (this._isRunning) {
        this._mainCharacter.setCurrentAnimationName(AnimationNames.run);
      } else {
        this._mainCharacter.setCurrentAnimationName(AnimationNames.walkForward);
      }
    } else if (this._move.backward) {
      this._mainCharacter.setCurrentAnimationName(AnimationNames.walkBackward);
    } else if (!this._move.forward || !this._move.backward) {
      this._mainCharacter.setCurrentAnimationName(AnimationNames.idle);
    }
  }
}
