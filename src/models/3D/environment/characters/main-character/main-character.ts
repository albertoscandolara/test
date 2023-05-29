import * as THREE from "three";
import { Controller } from "../../../../../app/3D/controllers/controller";
import { LoggerService } from "../../../../../app/logger.service";
import { Item } from "../../items/item";
import { Character } from "../character";
import { InteractionLabel } from "../../../../../app/2D/components/interaction label/interaction label";
import { Model } from "../../model";
import { AnimationNames } from "../../../../animations.dto";
import { Building } from "../../buildings/building";

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
      speed,
      canMove,
      initialPosition,
      rotation,
      null
    );
    this._logger = new LoggerService();

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
  private _getCollidingModel(
    models: Array<Building | Character | Item>
  ): Building | Character | Item {
    const collidingModel: Building | Character | Item = models.find((model) => {
      return (model._checkpoint as Item)._boundingBox?.intersectsBox(
        this._boundingBox
      );
    }) as Building | Character | Item;
    return collidingModel;
  }

  public handleInteractionLabel(
    models: Array<Building | Character | Item>
  ): void {
    if (this._isColliding(models)) {
      if (!this.#interactionLabel) {
        const model: Building | Character | Item =
          this._getCollidingModel(models);
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
