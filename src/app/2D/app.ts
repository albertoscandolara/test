import { App } from '../app';
import { Debug } from '../debug';
import { Language } from '../language';
import { Logger } from '../logger';
import { Menu } from './components/menu';

export class App2D {
  declare _container: HTMLElement;
  declare _debug: Debug;
  declare _logger: Logger;
  declare _language: Language;

  declare _menu: Menu;
  /**
   *
   */
  constructor(app: App) {
    this._container = app._appContainer;
    this._debug = app._debug;
    this._logger = app._logger;

    this._menu = new Menu();
  }
}
