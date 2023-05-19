import {
  defaultLanguage,
  availableLanguages,
  languages,
} from "../config/languages";
import { translations } from "../config/translations";
import { Language } from "../models/language";
import { Logger } from "./logger";

let instance!: LanguageService;

export class LanguageService {
  private _language!: string;
  private _translations!: Map<string, string>;
  private _logger!: Logger;

  /**
   * Constructor
   */
  constructor() {
    // singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this._logger = new Logger();
    this.setLanguage();
  }

  /**
   * Set current language
   * @param language language to set
   */
  public setLanguage(language: string | null = null): void {
    if (language === this._language) {
      this._logger.warn(
        `${this._language} - ${language} language is already set.`
      );
      return;
    }

    if (language) {
      this._language = language;
    } else {
      const navigatorLanguage = navigator.language;
      this._language = availableLanguages.includes(navigatorLanguage)
        ? navigatorLanguage
        : defaultLanguage;
    }
    this._logger.log(`${this._language} language set.`);

    this.setTranslations();
  }

  public getCurrentLanguage(): Language | undefined {
    return [...languages.values()].find(
      (l: Language) => l.ISOCode === this._language
    );
  }

  /**
   * Set translations dictionary
   */
  private setTranslations(): void {
    this._translations = new Map(
      [...translations.entries()].map(([key, value]) => [
        key,
        value.getValue(this._language),
      ])
    );

    this._logger.log(`Translations set`, this._translations);
  }

  /**
   * Translate a sentence
   * @param sentence sentence to be translated
   * @returns translation or original sentence
   */
  public translate(sentence: string): string {
    const translation: string | undefined = this._translations.get(sentence);

    if (translation) {
      return translation;
    } else {
      this._logger.warn(
        `'${sentence}' was not found among '${this._language}' translations or was empty`
      );
      return sentence;
    }
  }

  /**
   * Translate 'title' and 'text' attributes for web components configurations
   * @param {any} config web component configuration
   * @returns {any} the translated configuration
   */
  public translateAsWCLibConfiguration(config: any): any {
    if (!config.attributes) {
      return config;
    }

    const titleProperty: string = "title";
    if (config.attributes.hasOwnProperty(titleProperty)) {
      config.attributes.title = this.translate(config.attributes.title);
    }

    const textProperty: string = "text";
    if (config.attributes.hasOwnProperty(textProperty)) {
      config.attributes.text = this.translate(config.attributes.text);
    }

    config.children.map((child: any) =>
      this.translateAsWCLibConfiguration(child)
    );
    return config;
  }

  public selectCurrentLanguageAsWCLib(config: any): any {
    if (!config.attributes) {
      return config;
    }

    const keysAttribute: { [key: string]: string } = config.attributes.keys;
    if (keysAttribute) {
      const ISOCodeProperty: string = "ISOCode";
      if (keysAttribute.hasOwnProperty(ISOCodeProperty)) {
        config.attributes.selected = false;
        const ISOCode: string = keysAttribute[ISOCodeProperty];
        if (ISOCode === this.getCurrentLanguage()?.ISOCode) {
          config.attributes.selected = true;
        }
      }
    }

    config.children.map((child: any) =>
      this.selectCurrentLanguageAsWCLib(child)
    );
    return config;
  }
}
