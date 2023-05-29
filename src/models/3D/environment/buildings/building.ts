import * as THREE from "three";
import { Item } from "../items/item";
import { Model } from "../model";
import { EnvironmentsService } from "../../../../app/environment.service";
import { SVG_SIGNATURES } from "../../../../app/2D/enums/svg-signatures.enum";
import { INTERACTION_LABEL_TEXTS } from "../../../../app/2D/components/interaction label/enum/interaction label texts";

export class Building extends Model {
  static #interactionLabelText: string = INTERACTION_LABEL_TEXTS.BUILDING;
  static #interactionLabelSvgSignature: string =
    SVG_SIGNATURES.DOOR_SVG_SIGNATURE;

  #environmentId: number | null = null;
  #environmentsService!: EnvironmentsService;
  /**
   * Constructor
   */
  constructor(
    id: number,
    name: string,
    description: string,
    scale: number,
    assetId: number,
    isInteractable: boolean = false,
    checkpoint: Item | null = null,
    initialPosition: THREE.Vector3 = new THREE.Vector3(),
    rotation: THREE.Euler = new THREE.Euler(),
    environmentId: number | null = null
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

    this.#environmentId = environmentId;

    // Use the setTimeout to defer environmentService initialization,
    // will throw an error otherwise
    setTimeout(() => {
      this.#environmentsService = new EnvironmentsService();
    });
  }

  /**
   * interactionLabelText getter
   */
  get interactionLabelText(): string {
    return Building.#interactionLabelText;
  }

  /**
   * interactionLabelSvgSignature getter
   */
  get interactionLabelSvgSignature(): string {
    return Building.#interactionLabelSvgSignature;
  }

  /**
   * Method called after main character interacts with this model interaction label
   * @returns {void}
   */
  public interact(): void {
    if (this.#environmentId) {
      this.#environmentsService.setCurrentEnvironment(this.#environmentId);
    }
  }
}
