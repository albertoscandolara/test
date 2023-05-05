import "./touch-controller.scss";
import { ParentController } from "./parent-controller";

import { INSERT_ADJACENT_HTML_POSITIONS } from "../../../constants/insertAdjacentHTMLPositions";
import { App3D } from "../app-3D";
import { DOM_EVENTS } from "../../../constants/DOMEevents";

export const mobileJoystickClass: string = "touch-controller";
export const mobileJoystickDefaultClass: string = "default";
export const mobileJoystickHTML: string = `<div class="outer-touch-controller">
<div class="${mobileJoystickClass} ${mobileJoystickDefaultClass}"></div>
</div>`;

export class TouchScreenController extends ParentController {
  private _touchController!: HTMLElement;
  private _controllerDOMRect!: DOMRect;

  /**
   * constructor
   * @ignore
   */
  constructor(app3D: App3D) {
    super(app3D);
    this._init(app3D);
    this._logger.log(`${this.constructor.name} class instantiated:`, this);
  }

  /**
   * Initialize control parameters
   * @returns {void}
   */
  private _init(app3D: App3D): void {
    app3D._container.insertAdjacentHTML(
      INSERT_ADJACENT_HTML_POSITIONS.BEFORE_END as InsertPosition,
      mobileJoystickHTML
    );

    this._touchController = document.querySelector(
      `.${mobileJoystickClass}`
    ) as HTMLElement;

    this.setEventListeners();
  }

  /**
   * Set touch controller event listeners
   * @returns {void}
   */
  public setEventListeners(): void {
    this._touchController.addEventListener(DOM_EVENTS.TOUCH_START, (e) => {
      const touchMoveEventListenerCbk = (e: TouchEvent) => {
        e.preventDefault();
        this._touchMove(e);
      };

      const touchEndEventListenerCbk = (e: TouchEvent) => {
        e.preventDefault();
        this._touchController.removeEventListener(
          DOM_EVENTS.TOUCH_MOVE,
          touchMoveEventListenerCbk
        );
        this._touchController.removeEventListener(
          DOM_EVENTS.TOUCH_END,
          touchEndEventListenerCbk
        );
        this._touchEnd(e);
      };

      e.preventDefault();
      this._touchStart();

      this._touchController.addEventListener(DOM_EVENTS.TOUCH_MOVE, (e) =>
        touchMoveEventListenerCbk(e)
      );
      this._touchController.addEventListener(DOM_EVENTS.TOUCH_END, (e) =>
        touchEndEventListenerCbk(e)
      );
    });
  }

  private _touchStart(): void {
    this._controllerDOMRect = this._touchController.getClientRects()[0];
    this._touchController.classList.remove(mobileJoystickDefaultClass);
  }

  private _touchMove(event: TouchEvent): void {
    const center: { x: number; y: number } = {
      x: this._controllerDOMRect.left + this._controllerDOMRect.width / 2,
      y: this._controllerDOMRect.top + this._controllerDOMRect.height / 2,
    };

    const touch: { x: number; y: number } = {
      x: event.targetTouches[0].clientX,
      y: event.targetTouches[0].clientY,
    };

    if (
      touch.x > center.x - this._controllerDOMRect.width / 2 &&
      touch.x < center.x + this._controllerDOMRect.width / 2
    ) {
      this._move.left = false;
      this._move.right = false;
    } else if (touch.x < center.x - this._controllerDOMRect.width / 2) {
      this._move.left = true;
      this._move.right = false;
    } else if (touch.x > center.x + this._controllerDOMRect.width / 2) {
      this._move.left = false;
      this._move.right = true;
    }
    if (touch.y < center.y) {
      this._move.forward = true;
      this._move.backward = false;
    } else {
      this._move.forward = false;
      this._move.backward = true;
    }

    if (
      touch.y < center.y + this._controllerDOMRect.height / 2 &&
      touch.y > center.y - this._controllerDOMRect.height / 2
    ) {
      this._isRunning = false;
    } else {
      this._isRunning = true;
    }
  }

  private _touchEnd(event: TouchEvent): void {
    this._touchController.classList.add(mobileJoystickDefaultClass);
    this._move = {
      forward: false,
      backward: false,
      right: false,
      left: false,
    };
  }
}
