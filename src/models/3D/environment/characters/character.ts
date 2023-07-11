import * as THREE from "three";
import { Item } from "../items/item";
import { Model } from "../model";
import { SVG_SIGNATURES } from "../../../../app/2D/enums/svg-signatures.enum";
import { INTERACTION_LABEL_TEXTS } from "../../../../app/2D/components/interaction label/enum/interaction label texts";
import { STATUSES } from "./enums/statuses";
import { BehaviorSubject } from "rxjs";
import { ChatsService } from "../../../../app/chats.service";

export class Character extends Model {
  static #interactionLabelText: string = INTERACTION_LABEL_TEXTS.CHARACTER;
  static #interactionLabelSvgSignature: string =
    SVG_SIGNATURES.CHAT_SVG_SIGNATURE;

  declare _speed: number;
  #canMove: boolean = false;

  #status: BehaviorSubject<STATUSES> = new BehaviorSubject<STATUSES>(
    STATUSES.IDLE
  );
  #chatsService!: ChatsService;
  #chatId: number | null = null;

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
    chatId: number | null = null
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
    this.#chatId = chatId;

    // Use the setTimeout to defer environmentService initialization,
    // will throw an error otherwise
    setTimeout(() => {
      this.#chatsService = new ChatsService();
    });
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
  public interact(): void {
    if (this.#chatId) {
      this.#chatsService.openChat(this.#chatId);
    }
    this;
  }
}
