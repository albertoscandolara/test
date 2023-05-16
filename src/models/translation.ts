import {
  englishISOCode,
  frenchISOCode,
  italianISOCode,
  russianISOCode,
} from "../config/languages";

export interface ITranslation {
  readonly _en_EN: string;
  readonly _fr_FR: string;
  readonly _it_IT: string;
  readonly _ru_RU: string;

  getValue(language: string): string;
}

export class Translation implements ITranslation {
  _en_EN: string;
  _fr_FR: string;
  _it_IT: string;
  _ru_RU: string;

  /**
   * Constructor
   */
  constructor(
    en_EN: string = "",
    fr_FR: string = "",
    it_IT: string = "",
    ru_RU: string = ""
  ) {
    this._en_EN = en_EN;
    this._fr_FR = fr_FR;
    this._it_IT = it_IT;
    this._ru_RU = ru_RU;
  }

  /**
   * Get class translation for provided language
   * @param language language required
   * @returns matching translation
   */
  public getValue(language: string = ""): string {
    let value: string = "";
    switch (language) {
      case englishISOCode:
        value = this._en_EN;
        break;
      case frenchISOCode:
        value = this._fr_FR;
        break;
      case italianISOCode:
        value = this._it_IT;
        break;
      case russianISOCode:
        value = this._ru_RU;
        break;
    }

    return value;
  }
}
