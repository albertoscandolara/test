// @ts-ignore
import { createFromConfig } from "as-wc-lib";
import {
  hamburgerMenuconfig,
  menuConfig,
} from "./configuration/menu configuration";
import { LoggerService } from "../../../logger.service";
import { OutputData } from "../../models/as-wc-lib.dto";
import { DISPATCHED_EVENTS } from "../../enums/as-wc-lib";
import { LanguageService } from "../../../language.service";
import { hiddenClass } from "../../../../constants/classes";
import { hamburgerMenuContainerClass } from "../../constants/2D page structure";
import { WEB_COMPONENTS_SIGNATURES } from "../../enums/web-components-signatures.enum";
import { getLastChildAsWcLib } from "../../helpers/as-wc-lib";
import { EnvironmentsService } from "../../../environment.service";

export class Menu {
  /**
   * Main menu HTML element
   */
  private _mainMenuHTMLElement: HTMLElement | null = null;

  /**
   * Main hamburger menu button HTML element
   */
  private _hamburgerMenuHTMLElement!: HTMLElement;

  /**
   * Boolean value controlling hamburger menu opening
   */
  private _mainMenuIsOpen: boolean = false;

  /**
   * Logger
   */
  private _logger!: LoggerService;

  /**
   * Language service
   */
  private _languageService!: LanguageService;

  /**
   * Environments service
   */
  private _environmentsService!: EnvironmentsService;

  /**
   * Constructor
   * @constructor
   * @ignore
   */
  constructor() {
    this._logger = new LoggerService();
    this._languageService = new LanguageService();
    this._environmentsService = new EnvironmentsService();

    this._setHamburgerMenuHTMLElement();
  }

  /**
   * _mainMenuHTMLElement property setter
   */
  set mainMenuHTMLElement(value: HTMLElement | null) {
    if (!value) {
      (this._mainMenuHTMLElement as HTMLElement).remove();
      this._mainMenuHTMLElement = value;
      return;
    }

    this._mainMenuHTMLElement = value;
    (this._mainMenuHTMLElement as HTMLElement).classList.add("main-menu");
  }

  /**
   * Set up hamburger menu
   * @returns {void}
   */
  private _setHamburgerMenuHTMLElement(): void {
    const container: HTMLElement = document.body.querySelector(
      `.${hamburgerMenuContainerClass}`
    ) as HTMLElement;
    this._hamburgerMenuHTMLElement = createFromConfig(
      hamburgerMenuconfig,
      container
    );

    if (!this._hamburgerMenuHTMLElement) {
      this._logger.error(
        `${this.constructor.name} - Could not create main hamburger menu button correctly`
      );
      return;
    }

    this._hamburgerMenuHTMLElement.classList.add("main-menu-hamburger-menu");
    this._setHamburgerMenuEventListeners();
  }

  private _setHamburgerMenuEventListeners(): void {
    if (this._hamburgerMenuHTMLElement) {
      this._hamburgerMenuHTMLElement.addEventListener(
        DISPATCHED_EVENTS.CLICKED,
        () => this._toggleMainMenuVisibility()
      );
    }
  }

  /**
   * Toggle main menu visibility
   * @param {boolean | null} [value= null] value to set. If null, it toggles
   * @returns {void}
   */
  private _toggleMainMenuVisibility(value: boolean | null = null): void {
    if (!value) value = !this._mainMenuIsOpen;
    this._mainMenuIsOpen = value;

    if (this._mainMenuIsOpen) {
      if (!this._mainMenuHTMLElement) {
        this._setMainMenu();
      }

      (this._mainMenuHTMLElement as HTMLElement).classList.remove(hiddenClass);
    } else {
      (this._mainMenuHTMLElement as HTMLElement).classList.add(hiddenClass);
    }
  }

  /**
   * Set up main menu
   * @returns {void}
   */
  private _setMainMenu(): void {
    const container: HTMLElement = document.body;
    let config = JSON.parse(JSON.stringify(menuConfig));
    config = this._environmentsService.selectCurrentEnvironmentAsWCLib(config);
    config = this._languageService.selectCurrentLanguageAsWCLib(config);
    config = this._languageService.translateAsWCLibConfiguration(config);
    this.mainMenuHTMLElement = createFromConfig(config, container);

    if (!this._mainMenuHTMLElement) {
      this._logger.error(
        `${this.constructor.name} - Could not create main menu correctly`
      );
      return;
    }

    this._addEventListeners();
  }

  /**
   * Set main menu event listeners
   * @returns {void}
   */
  private _addEventListeners(): void {
    if (this._mainMenuHTMLElement) {
      this._mainMenuHTMLElement.addEventListener(
        DISPATCHED_EVENTS.CLICKED,
        this._handleMainMenuClick
      );
    }
  }

  /**
   * Handle main menu button click
   * @param {any} data
   * @returns {void}
   */
  private _handleMainMenuClick = (data: any): void => {
    const { detail: outputData }: { detail: OutputData } = data;
    const clickedAsWcLib: any = [].concat(getLastChildAsWcLib(outputData))[0];
    if (clickedAsWcLib.type === WEB_COMPONENTS_SIGNATURES.AS_HEADER_CLOSE) {
      this._toggleMainMenuVisibility(false);
    } else if (
      clickedAsWcLib.type ===
      WEB_COMPONENTS_SIGNATURES.AS_BUTTON_ROUND_BACKGROUND_IMAGE
    ) {
      const keysAttribute: { [key: string]: string } =
        clickedAsWcLib.attributes.keys;
      if (keysAttribute) {
        const ISOCodeProperty: string = "ISOCode";
        const environmentIdProperty: string = "environmentId";
        if (keysAttribute.hasOwnProperty(ISOCodeProperty)) {
          const ISOCode: string = keysAttribute[ISOCodeProperty];
          this._languageService.setLanguage(ISOCode);
          this._resetMainMenu();
        } else if (keysAttribute.hasOwnProperty(environmentIdProperty)) {
          const environmentId: number = +keysAttribute[environmentIdProperty];
          this._environmentsService.setCurrentEnvironment(environmentId);
          this._resetMainMenu();
        }
      }
    }
  };

  /**
   * Handle change language request
   * @param {OutputData} data language clicked button data
   * @returns {void}
   */
  private _resetMainMenu = (): void => {
    this._toggleMainMenuVisibility(false);
    this.mainMenuHTMLElement = null;
  };
}
