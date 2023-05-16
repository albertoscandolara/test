import "./touch-controller.scss";
import { ParentController } from "./parent-controller";

import { INSERT_ADJACENT_HTML_POSITIONS } from "../../../constants/insertAdjacentHTMLPositions";
import { App3D } from "../app-3D";
import { DOM_EVENTS } from "../../enums/DOMEevents";

export const mobileJoystickClass: string = "touch-controller";
export const mobileJoystickDefaultClass: string = "default";
export const mobileJoystickHTML: string = `<div class="outer-touch-controller">
<div class="${mobileJoystickClass} ${mobileJoystickDefaultClass}"></div>
</div>`;

export class TouchScreenController extends ParentController {
  private _touchController!: HTMLElement;
  private _controllerDOMRect!: DOMRect;
  private _controllerParentDOMRect!: DOMRect;

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
    this._setJoystick(app3D);
    this.setEventListeners();
  }

  private _setJoystick(app3D: App3D): void {
    app3D._container.insertAdjacentHTML(
      INSERT_ADJACENT_HTML_POSITIONS.BEFORE_END as InsertPosition,
      mobileJoystickHTML
    );

    this._touchController = document.querySelector(
      `.${mobileJoystickClass}`
    ) as HTMLElement;
  }

  /**
   * Set touch controller event listeners
   * @returns {void}
   */
  public setEventListeners(): void {
    this._touchController.addEventListener(DOM_EVENTS.TOUCH_START, (e) => {
      console.log("moving");
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
        this._touchEnd();
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
    this._controllerParentDOMRect =
      this._touchController.parentElement?.getClientRects()[0] as DOMRect;
  }

  private _touchMove(event: TouchEvent): void {
    const radius: number = this._controllerDOMRect.width / 2;
    const center: { x: number; y: number } = {
      x: this._controllerDOMRect.left + radius,
      y: this._controllerDOMRect.top + radius,
    };

    const touch: { x: number; y: number } = {
      x: event.targetTouches[0].clientX,
      y: event.targetTouches[0].clientY,
    };

    // Set main character movements
    {
      if (touch.x > center.x - radius && touch.x < center.x + radius) {
        this._move.left = false;
        this._move.right = false;
      } else if (touch.x < center.x - radius) {
        this._move.left = true;
        this._move.right = false;
      } else if (touch.x > center.x + radius) {
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
        Math.sqrt(
          Math.pow(Math.abs(touch.x - center.x), 2) +
            Math.pow(Math.abs(touch.y - center.y), 2)
        ) < this._controllerDOMRect.height
      ) {
        this._isRunning = false;
      } else {
        this._isRunning = true;
      }
    }

    // Update DOM joystick position
    const dx: number = Math.sqrt((center.x - touch.x) ** 2);
    const dy: number = Math.sqrt((center.y - touch.y) ** 2);

    let left: number = touch.x - this._controllerDOMRect.x + radius;
    if (dx > 2 * radius) {
      if (touch.x < center.x) {
        left = radius;
      } else if (touch.x > center.x) {
        left = this._controllerParentDOMRect.width - radius;
      }
    }

    let top: number = touch.y - this._controllerDOMRect.y + radius;
    if (dy > 2 * radius) {
      if (touch.y < center.y) {
        top = radius;
      } else if (touch.y > center.y) {
        top = this._controllerParentDOMRect.height - radius;
      }
    }

    this._touchController.style.left = `${left}px`;
    this._touchController.style.top = `${top}px`;
    this._touchController.classList.remove(mobileJoystickDefaultClass);
  }

  private _touchEnd(): void {
    this._move = {
      forward: false,
      backward: false,
      right: false,
      left: false,
    };
    this._isRunning = false;

    this._touchController.classList.add(mobileJoystickDefaultClass);

    // Remove inline properties
    this._touchController.style.removeProperty("left");
    this._touchController.style.removeProperty("top");
  }
}
