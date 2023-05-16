import { INSERT_ADJACENT_HTML_POSITIONS } from "../../constants/insertAdjacentHTMLPositions";
import { App } from "../app";
import { Debug } from "../debug";
import { LanguageService } from "../language";
import { Logger } from "../logger";
import { Menu } from "./components/menu";
import { pageStructure } from "./constants/2D page structure";

export class App2D {
  declare _container: HTMLElement;
  declare _debug: Debug;
  declare _logger: Logger;
  declare _language: LanguageService;

  declare _menu: Menu;
  /**
   *
   */
  constructor(app: App) {
    this._container = app._appContainer;
    this._debug = app._debug;
    this._logger = app._logger;

    const appContainerClass: string = "app-container";
    (
      document.body.querySelector(`.${appContainerClass}`) as HTMLElement
    ).insertAdjacentHTML(
      INSERT_ADJACENT_HTML_POSITIONS.BEFORE_END as InsertPosition,
      pageStructure
    );
    this._menu = new Menu();
  }
}
