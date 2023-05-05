let instance!: TouchScreenDevice;

export class TouchScreenDevice {
  private _isTouchScreenDevice: boolean = false;

  /**
   * Constructor
   */
  constructor() {
    // singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this._detectTouchScreenDevice();
  }

  /**
   * Set touch screen property
   */
  private _detectTouchScreenDevice(): void {
    this._isTouchScreenDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (this._isTouchScreenDevice) {
      console.log("Touch screen device detected.");
    }
  }

  /**
   * Get _isTouchScreenDevice parameter
   * @returns _isTouchScreenDevice parameter
   */
  public isTouchScreenDevice(): boolean {
    return this._isTouchScreenDevice;
  }
}
