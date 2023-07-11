import { WEB_COMPONENTS_SIGNATURES } from "../../../enums/web-components-signatures.enum";

export const chatConfig = {
  type: WEB_COMPONENTS_SIGNATURES.AS_CHAT,
  attributes: {
    dark: true,
    slot: "body",
  },
  children: [],
};

export const chatConfigModal = {
  type: WEB_COMPONENTS_SIGNATURES.AS_MODAL_BACKGROUND,
  attributes: {
    dark: true,
    open: true,
  },
  children: [
    {
      type: WEB_COMPONENTS_SIGNATURES.AS_CHAT,
      attributes: {
        slot: "body",
      },
      children: [],
    },
  ],
};
