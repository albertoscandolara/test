import "./interact-label.scss";

import { Logger } from "../../../app/logger";
import { showInteractionTabEventEmitter } from "../../../app/event-emitter/events";
import { App3D } from "../app-3D";
import { LanguageService } from "../../language.service";
import { Building } from "../../../models/3D/environment/buildings/building";
import { Character } from "../../../models/3D/environment/characters/character";
import { Item } from "../../../models/3D/environment/items/item";
import { Model } from "../../../models/3D/environment/model";
import { EnvironmentsService } from "../../environment.service";
import { INSERT_ADJACENT_HTML_POSITIONS } from "../../../constants/insertAdjacentHTMLPositions";
import { DOM_EVENTS } from "../../enums/DOMEevents";

export class InteractionLabel {
  declare _logger: Logger;
  declare _container: HTMLElement;
  declare _label: HTMLElement;
  declare _languageService: LanguageService;
  #environmentsService!: EnvironmentsService;
  declare _visible: boolean;
  #model: Model;

  /**
   * Constructor
   */
  constructor(model: Model) {
    this._logger = new Logger();
    this._languageService = new LanguageService();
    this.#environmentsService = new EnvironmentsService();
    this.#model = model;

    this._show();

    this._logger.log(`${this.constructor.name} class instantiated:`, this);
  }

  /**
   * Hide label
   */
  public hide(): void {
    this._label.removeEventListener(DOM_EVENTS.CLICK, this.interact);
    this._label.remove();
  }

  /**
   * Show interaction label
   * @returns {void}
   */
  private _show(): void {
    const markup: string = this.getLabelMarkup();
    const container: HTMLElement = document.body;
    container.insertAdjacentHTML(
      INSERT_ADJACENT_HTML_POSITIONS.BEFORE_END as InsertPosition,
      markup
    );

    this._label = container.querySelector(
      ".interactable-label-container"
    ) as HTMLElement;

    this._setEventListeners();
  }

  /**
   * Set label event listeners
   * @returns {void}
   */
  private _setEventListeners(): void {
    if (!this._label) {
      return;
    }

    this._label.addEventListener(DOM_EVENTS.CLICK, () => {
      this.interact();
    });
  }

  /**
   * Get label markup
   * @returns markup string
   */
  private getLabelMarkup(): string {
    return `
    <div class="interactable-label-container">
      <div class="inner-interactable-label-container">
          <img class="interactable-label-img">
          <span class="interactable-label-text">${this._getLabelText()}</span>
      </div>
    </div>
  `;
  }

  /**
   * Get text to show into the label
   * @param model model interacting with main character
   * @returns string text
   */
  private _getLabelText(): string {
    let text: string = "";

    if (this.#model instanceof Building) {
      text = `Enter this building`;
    } else if (this.#model instanceof Character) {
      text = `Talk to this character`;
    } else if (this.#model instanceof Item) {
      text = `Use this item`;
    } else {
      text = `Interact`;
    }
    text = this._languageService.translate(text);

    return text;
  }

  /**
   * Callback function to invoke for model interaction
   */
  public interact(): void {
    if (!this.#model) {
      this._logger.warn(
        `${this.constructor.name} Requesting interaction, but model is not set. Do not emit`
      );
      return;
    }

    if (this.#model._goToEnvironment ?? false) {
      const environmentId: number = this.#model._goToEnvironment as number;
      this.#environmentsService.setCurrentEnvironment(environmentId);
    } else if (this.#model._goToHTML ?? false) {
      showInteractionTabEventEmitter.emit(this.#model);
    }
  }
}
