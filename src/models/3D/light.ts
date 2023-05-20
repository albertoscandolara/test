import * as THREE from "three";

export class Light {
  #light: THREE.Light | null;
  declare _position: THREE.Vector3;

  /**
   * Constructor
   */
  constructor(light: THREE.Light, position: THREE.Vector3) {
    this.#light = light;
    this._position = position;
  }

  /**
   * Light instance getter
   */
  get light(): THREE.Light | null {
    return this.#light;
  }

  /**
   * Light instance setter
   */
  set light(value: THREE.Light | null) {
    this.#light = value;
  }
}
