import { SVG_SIGNATURES } from "../enums/svg-signatures.enum";
import { WEB_COMPONENTS_SIGNATURES } from "../enums/web-components-signatures.enum";

export const config = {
  type: WEB_COMPONENTS_SIGNATURES.AS_MENU,
  attributes: {
    open: false,
    resizable: true,
  },
  children: [
    {
      type: WEB_COMPONENTS_SIGNATURES.AS_HEADER_CLOSE,
      attributes: {
        slot: "header",
      },
      children: [],
    },
    {
      type: WEB_COMPONENTS_SIGNATURES.AS_LIST,
      attributes: {
        dark: true,
        maxSelected: 0,
        minSelected: 0,
        selectFromOutside: false,
        slot: "footer",
      },
      children: [
        {
          type: WEB_COMPONENTS_SIGNATURES.AS_ANCHOR_IMAGE,
          attributes: {
            dark: true,
            href: "https://angel.co/u/alberto-scandolara",
            svgTemplate: SVG_SIGNATURES.ANGEL_LIST_SVG_TEMPLATE,
            title: "Go to my AngelList page",
          },
          children: [],
        },
        {
          type: WEB_COMPONENTS_SIGNATURES.AS_ANCHOR_IMAGE,
          attributes: {
            dark: true,
            href: "https://github.com/albertoscandolara",
            svgTemplate: SVG_SIGNATURES.GITHUB_SVG_TEMPLATE,
            title: "Go to my Github page",
          },
          children: [],
        },
        {
          type: WEB_COMPONENTS_SIGNATURES.AS_ANCHOR_IMAGE,
          attributes: {
            dark: true,
            href: "https://www.facebook.com/alberto.scandolara/",
            svgTemplate: SVG_SIGNATURES.FACEBOOK_SVG_TEMPLATE,
            title: "Go to my Facebook page",
          },
          children: [],
        },
        {
          type: WEB_COMPONENTS_SIGNATURES.AS_ANCHOR_IMAGE,
          attributes: {
            dark: true,
            href: "https://github.com/albertoscandolara",
            svgTemplate: SVG_SIGNATURES.INSTAGRAM_SVG_TEMPLATE,
            title: "Go to my Instagram page",
          },
          children: [],
        },
        {
          type: WEB_COMPONENTS_SIGNATURES.AS_ANCHOR_IMAGE,
          attributes: {
            dark: true,
            href: "https://www.linkedin.com/in/alberto-scandolara-1391a1161/",
            svgTemplate: SVG_SIGNATURES.LINKEDIN_SVG_TEMPLATE,
            title: "Go to my LinkedIn page",
          },
          children: [],
        },
      ],
    },
    {
      type: WEB_COMPONENTS_SIGNATURES.AS_MENU_SECTION,
      attributes: {
        slot: "body",
      },
      children: [
        {
          type: WEB_COMPONENTS_SIGNATURES.AS_HEADER_FADED,
          attributes: {
            dark: true,
            slot: "header",
            text: "Teloport to",
          },
          children: [],
        },
        {
          type: WEB_COMPONENTS_SIGNATURES.AS_LIST,
          attributes: {
            dark: true,
            maxSelected: 1,
            minSelected: 1,
            selectFromOutside: true,
            slot: "body",
          },
          children: [
            {
              type: WEB_COMPONENTS_SIGNATURES.AS_BUTTON_ROUND_BACKGROUND_IMAGE,
              attributes: {
                svgTemplate: SVG_SIGNATURES.HOME_SVG_TEMPLATE,
                selected: true,
                selectFromOutside: true,
                text: "Courtyard",
              },
              children: [],
            },
            {
              type: WEB_COMPONENTS_SIGNATURES.AS_BUTTON_ROUND_BACKGROUND_IMAGE,
              attributes: {
                svgTemplate: SVG_SIGNATURES.CUBE_SVG_TEMPLATE,
                selected: false,
                selectFromOutside: true,
                text: "3D Exhibition",
              },
              children: [],
            },
            {
              type: WEB_COMPONENTS_SIGNATURES.AS_BUTTON_ROUND_BACKGROUND_IMAGE,
              attributes: {
                svgTemplate: SVG_SIGNATURES.COMPUTER_SVG_TEMPLATE,
                selected: false,
                selectFromOutside: true,
                text: "Websites",
              },
              children: [],
            },
            {
              type: WEB_COMPONENTS_SIGNATURES.AS_BUTTON_ROUND_BACKGROUND_IMAGE,
              attributes: {
                svgTemplate: SVG_SIGNATURES.USER_SVG_TEMPLATE,
                selected: false,
                selectFromOutside: true,
                text: "About me",
              },
              children: [],
            },
          ],
        },
      ],
    },
    {
      type: WEB_COMPONENTS_SIGNATURES.AS_MENU_SECTION,
      attributes: {
        slot: "body",
      },
      children: [
        {
          type: WEB_COMPONENTS_SIGNATURES.AS_HEADER_FADED,
          attributes: {
            dark: true,
            slot: "header",
            text: "Change language",
          },
          children: [],
        },
        {
          type: WEB_COMPONENTS_SIGNATURES.AS_LIST,
          attributes: {
            dark: true,
            maxSelected: 1,
            minSelected: 1,
            selectFromOutside: true,
            slot: "body",
          },
          children: [
            {
              type: WEB_COMPONENTS_SIGNATURES.AS_BUTTON_ROUND_BACKGROUND_IMAGE,
              attributes: {
                svgTemplate: SVG_SIGNATURES.ENGLISH_FLAG_SVG_TEMPLATE,
                selected: true,
                selectFromOutside: true,
                text: "English",
              },
              children: [],
            },
            {
              type: WEB_COMPONENTS_SIGNATURES.AS_BUTTON_ROUND_BACKGROUND_IMAGE,
              attributes: {
                svgTemplate: SVG_SIGNATURES.ITALIAN_FLAG_SVG_TEMPLATE,
                selected: false,
                selectFromOutside: true,
                text: "Italiano",
              },
              children: [],
            },
            {
              type: WEB_COMPONENTS_SIGNATURES.AS_BUTTON_ROUND_BACKGROUND_IMAGE,
              attributes: {
                svgTemplate: SVG_SIGNATURES.FRENCH_FLAG_SVG_TEMPLATE,
                selected: false,
                selectFromOutside: true,
                text: "Français",
              },
              children: [],
            },
            {
              type: WEB_COMPONENTS_SIGNATURES.AS_BUTTON_ROUND_BACKGROUND_IMAGE,
              attributes: {
                svgTemplate: SVG_SIGNATURES.RUSSIAN_FLAG_SVG_TEMPLATE,
                selected: false,
                selectFromOutside: true,
                text: "Русский",
              },
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
