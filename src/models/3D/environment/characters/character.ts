import * as THREE from "three";
import { Item } from "../items/item";
import { Model } from "../model";
import { SVG_SIGNATURES } from "../../../../app/2D/enums/svg-signatures.enum";
import { INTERACTION_LABEL_TEXTS } from "../../../../app/2D/components/interaction label/enum/interaction label texts";

export class Character extends Model {
  static #interactionLabelText: string = INTERACTION_LABEL_TEXTS.CHARACTER;
  static #interactionLabelSvgSignature: string =
    SVG_SIGNATURES.CHAT_SVG_SIGNATURE;

  declare _speed: number;
  #canMove: boolean;
  #speechId: number | null = null;

  /**
   * Constructor
   */
  constructor(
    id: number,
    name: string,
    description: string,
    scale: number,
    assetId: number,
    isInteractable: boolean,
    checkpoint: Item | null,
    speed: number,
    canMove: boolean,
    initialPosition: THREE.Vector3 = new THREE.Vector3(),
    rotation: THREE.Euler = new THREE.Euler(),
    speechId: number | null = null
  ) {
    super(
      id,
      name,
      description,
      scale,
      assetId,
      isInteractable,
      checkpoint,
      initialPosition,
      rotation
    );
    this._speed = speed;
    this.#canMove = canMove;
    this.#speechId = speechId;
  }

  /**
   * interactionLabelText getter
   */
  get interactionLabelText(): string {
    return Character.#interactionLabelText;
  }

  /**
   * interactionLabelSvgSignature getter
   */
  get interactionLabelSvgSignature(): string {
    return Character.#interactionLabelSvgSignature;
  }

  /**
   * Method called after main character interacts with this model interaction label
   * @returns {void}
   */
  public interact(): void {}
}
