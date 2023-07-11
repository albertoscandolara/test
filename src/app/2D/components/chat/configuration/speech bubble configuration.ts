import { STRING_EMPTY } from "../../../../constants/constants";
import { WEB_COMPONENTS_SIGNATURES } from "../../../enums/web-components-signatures.enum";

export const speechBubbleConfig = {
  type: WEB_COMPONENTS_SIGNATURES.AS_SPEECH_BUBBLE,
  attributes: {
    dark: true,
    speaker: true,
    text: STRING_EMPTY,
  },
  children: [],
};
