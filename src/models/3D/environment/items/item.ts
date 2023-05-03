import * as THREE from "three";
import { Model } from "../model";

export class Item extends Model {
  /**
   * Constructor
   */
  constructor(
    id: number,
    name: string,
    description: string,
    scale: number,
    assetId: number,
    checkpoint: Item | null = null,
    goToEnvironment: number | null = null,
    goToHTML: number | null = null,
    isInteractable: boolean = false,
    initialPosition: THREE.Vector3 = new THREE.Vector3(),
    rotation: THREE.Euler = new THREE.Euler()
  ) {
    super(
      id,
      name,
      description,
      scale,
      assetId,
      isInteractable,
      checkpoint,
      goToEnvironment,
      goToHTML,
      initialPosition,
      rotation
    );

    this._logger.log(`${this.constructor.name} class instantiated:`, this);
  }
}
