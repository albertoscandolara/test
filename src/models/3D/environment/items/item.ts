import * as THREE from "three";
import { Model } from "../model";
import { SVG_SIGNATURES } from "../../../../app/2D/enums/svg-signatures.enum";
import { INTERACTION_LABEL_TEXTS } from "../../../../app/2D/components/interaction label/enum/interaction label texts";

export class Item extends Model {
  static #interactionLabelText: string = INTERACTION_LABEL_TEXTS.ITEM;
  static #interactionLabelSvgSignature: string =
    SVG_SIGNATURES.MAGNIFYING_GLASS_SVG_SIGNATURE;

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
      initialPosition,
      rotation
    );
  }

  /**
   * interactionLabelText getter
   */
  get interactionLabelText(): string {
    return Item.#interactionLabelText;
  }

  /**
   * interactionLabelSvgSignature getter
   */
  get interactionLabelSvgSignature(): string {
    return Item.#interactionLabelSvgSignature;
  }

  /**
   * Method called after main character interacts with this model interaction label
   * @returns {void}
   */
  public interact(): void {}
}
