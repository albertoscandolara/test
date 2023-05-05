import {
  forwardKeyboardKeys,
  backwardKeyboardKeys,
  leftKeyboardKeys,
  rightKeyboardKeys,
  runKeyboardKeys,
} from "../../../config/controller";
import { keydown, keyup, mousedown, mouseup } from "../../../config/events";
import { App3D } from "../app-3D";
import { ParentController } from "./parent-controller";

export class KeyBoardController extends ParentController {
  /**
   * constructor
   * @ignore
   */
  constructor(app3D: App3D) {
    super(app3D);
    this._init();
    this._logger.log(`${this.constructor.name} class instantiated:`, this);
  }

  /**
   * Initialize control parameters
   * @returns {void}
   */
  private _init(): void {
    document.addEventListener(keydown, (e: Event) =>
      this._keyDown(e as KeyboardEvent)
    );
    document.addEventListener(keyup, (e: Event) =>
      this._keyUp(e as KeyboardEvent)
    );
  }

  /**
   * Set control according to pressed keyboard button
   * @param {KeyboardEvent} e keyboard event
   */
  private _keyDown(e: KeyboardEvent): void {
    const code: string = e.code;

    if (
      ![
        ...forwardKeyboardKeys,
        ...backwardKeyboardKeys,
        ...leftKeyboardKeys,
        ...rightKeyboardKeys,
        ...runKeyboardKeys,
      ].includes(code)
    ) {
      return;
    }

    if (runKeyboardKeys.includes(code)) {
      this._isRunning = true;
    }

    if (forwardKeyboardKeys.includes(code)) {
      this._move.forward = true;
    } else if (backwardKeyboardKeys.includes(code)) {
      this._move.backward = true;
    }

    if (rightKeyboardKeys.includes(code)) {
      this._move.right = true;
    } else if (leftKeyboardKeys.includes(code)) {
      this._move.left = true;
    }
  }

  /**
   * Set control according to released keyboard button
   * @param {KeyboardEvent} e keyboard event
   */
  private _keyUp(e: KeyboardEvent): void {
    const code: string = e.code;

    if (
      ![
        ...forwardKeyboardKeys,
        ...backwardKeyboardKeys,
        ...leftKeyboardKeys,
        ...rightKeyboardKeys,
        ...runKeyboardKeys,
      ].includes(code)
    ) {
      return;
    }

    if (runKeyboardKeys.includes(code)) {
      this._isRunning = false;
    }

    if (forwardKeyboardKeys.includes(code)) {
      this._move.forward = false;
    } else if (backwardKeyboardKeys.includes(code)) {
      this._move.backward = false;
    }

    if (rightKeyboardKeys.includes(code)) {
      this._move.right = false;
    } else if (leftKeyboardKeys.includes(code)) {
      this._move.left = false;
    }
  }
}
