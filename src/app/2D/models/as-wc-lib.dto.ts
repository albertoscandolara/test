import { WEB_COMPONENTS_SIGNATURES } from "../enums/web-components-signatures.enum";

export interface OutputData {
  attributes: any;
  data: OutputData;
  type: WEB_COMPONENTS_SIGNATURES;
}
