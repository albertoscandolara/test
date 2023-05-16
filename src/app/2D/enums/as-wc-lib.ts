import { SVG_SIGNATURES } from "./svg-signatures.enum";

export const DISPATCHED_EVENTS = {
  CLICKED: "clicked",
  SELECTED: "selected",
  DESELECTED: "deselected",
};

export const BUTTON_TYPES_DICTIONARY = {
  PLAY: {
    id: "PLAY",
    svg: SVG_SIGNATURES.CONTROLLER_SVG_SIGNATURE,
    text: "Play",
    title: "Play",
  },
  DETAILS: {
    id: "DETAILS",
    svg: SVG_SIGNATURES.DETAILS_SVG_SIGNATURE,
    text: "Details",
    title: "See details",
  },
  HAMBURGER_MENU: {
    id: "HAMBURGER_MENU",
    svg: SVG_SIGNATURES.HAMBURGER_MENU_SVG_SIGNATURE,
    text: "Menu",
    title: "Open menu",
  },
};
