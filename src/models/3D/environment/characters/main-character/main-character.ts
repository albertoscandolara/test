import * as THREE from "three";
import { Controller } from "../../../../../app/3D/controllers/controller";
import { Logger } from "../../../../../app/logger";
import { Item } from "../../items/item";
import { Character } from "../character";
import { InteractionLabel } from "../../../../../app/3D/interact-label/interact-label";
import { Model } from "../../model";

export class MainCharacter extends Character {
  // User controls
  declare _controller: Controller;

  /**
   * Interaction label to show when main character
   * interacts with other characters/buildings/items
   */
  #interactionLabel: InteractionLabel | null = null;

  /**
   * Constructor
   */
  constructor(
    id: number,
    name: string,
    description: string,
    height: number,
    assetId: number,
    isInteractable: boolean,
    checkpoint: Item | null,
    goToEnvironment: number | null,
    goToHTML: number | null,
    speed: number,
    canMove: boolean,
    initialPosition: THREE.Vector3 = new THREE.Vector3(),
    rotation: THREE.Euler = new THREE.Euler()
  ) {
    super(
      id,
      name,
      description,
      height,
      assetId,
      isInteractable,
      checkpoint,
      goToEnvironment,
      goToHTML,
      speed,
      canMove,
      initialPosition,
      rotation
    );
    this._logger = new Logger();

    this._logger.log(`${this.constructor.name} class instantiated:`, this);
  }

  /**
   * Set controller to allow user to control main character actions and movements
   * @param controller the controller object to associate
   */
  public setController(controller: Controller): void {
    this._controller = controller;
  }

  /**
   * Check if main character is colliding with one of the interactable environment models
   * @param {Array<Model>} models list of current environment interatable models
   * @returns {boolean} true if main character is colliding, false otherwise
   */
  private _isColliding(models: Array<Model>): boolean {
    const isInteracting: boolean = models.some((model) => {
      return (model._checkpoint as Item)._boundingBox?.intersectsBox(
        this._boundingBox
      );
    });
    return isInteracting;
  }

  /**
   * Check if main character is colliding with one of the interactable environment models
   * @param {Array<Model>} models list of current environment interatable models
   * @returns {boolean} true if main character is colliding, false otherwise
   */
  private _getCollidingModel(models: Array<Model>): Model {
    const collidingModel: Model = models.find((model) => {
      return (model._checkpoint as Item)._boundingBox?.intersectsBox(
        this._boundingBox
      );
    }) as Model;
    return collidingModel;
  }

  public handleInteractionLabel(models: Array<Model>): void {
    if (this._isColliding(models)) {
      if (!this.#interactionLabel) {
        const model: Model = this._getCollidingModel(models);
        this.#interactionLabel = new InteractionLabel(model);
      }
    } else {
      if (this.#interactionLabel) {
        this.#interactionLabel.hide();
        this.#interactionLabel = null;
      }
    }
  }
}
