import { App3D } from "../app-3D";

import { KeyBoardController } from "./keyboard-controller";
import { ParentController } from "./parent-controller";
import { TouchScreenController } from "./touch-controller";

export class Controller {
  private _controller: ParentController;

  /**
   * Controller
   */
  constructor(app3D: App3D) {
    if (app3D._touchScreenDevice.isTouchScreenDevice()) {
      this._controller = new TouchScreenController(app3D);
    } else {
      this._controller = new KeyBoardController(app3D);
    }
  }

  public update(): void {
    this._controller.update();
  }
}
