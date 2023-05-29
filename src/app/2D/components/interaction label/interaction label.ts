import "./styles/interaction label.scss";
// @ts-ignore
import { createFromConfig } from "as-wc-lib";
import { LoggerService } from "../../../logger.service";
import { App3D } from "../../../3D/app-3D";
import { LanguageService } from "../../../language.service";
import { Building } from "../../../../models/3D/environment/buildings/building";
import { Character } from "../../../../models/3D/environment/characters/character";
import { Item } from "../../../../models/3D/environment/items/item";
import { DOM_EVENTS } from "../../../enums/DOMEevents";
import { interactionLabelConfig } from "./configuration/interaction label configuration";

export class InteractionLabel {
  declare _container: HTMLElement;
  #loggerService: LoggerService;
  #languageService: LanguageService;
  #model: Building | Character | Item;
  #label: HTMLElement | null = null;

  /**
   * Constructor
   * @constructor
   * @ignore
   */
  constructor(model: Building | Character | Item) {
    this.#loggerService = new LoggerService();
    this.#languageService = new LanguageService();
    this.#model = model;

    this._show();
  }

  /**
   * Hide label
   * @returns {void}
   */
  public hide(): void {
    if (!this.#label) {
      return;
    }

    // this.#model.setCurrentAnimationName(AnimationNames.idle);
    this.#label.removeEventListener(DOM_EVENTS.CLICK, this._interact);
    this.#label.remove();
  }

  /**
   * Show interaction label
   * @returns {void}
   */
  private _show(): void {
    // this.#model.setCurrentAnimationName(AnimationNames.greet);
    const container: HTMLElement = document.body;
    const config = interactionLabelConfig;
    {
      // Set dynamic attributes
      config.attributes.text = this.#languageService.translate(
        this.#model.interactionLabelText
      );
      config.attributes.svgSignature = this.#model.interactionLabelSvgSignature;
    }
    this.#label = createFromConfig(config, container);

    if (!this.#label) {
      this.#loggerService.error(
        `${this.constructor.name} - Could not create interaction label button correctly`
      );
      return;
    }

    this.#label.classList.add("interaction-label");
    this._setEventListeners();
  }

  /**
   * Set label event listeners
   * @returns {void}
   */
  private _setEventListeners(): void {
    if (!this.#label) {
      return;
    }

    this.#label.addEventListener(DOM_EVENTS.CLICK, () => {
      this._interact();
    });
  }

  /**
   * Callback function to invoke for model interaction
   * @returns {void}
   */
  private _interact(): void {
    this.#model.interact();
  }
}
