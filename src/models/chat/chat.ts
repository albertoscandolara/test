import { SpeechBubble } from "./speech bubble/speech bubble";

export interface Chat {
  id: number;
  containerCssSelector: string;
  speechBubbles: Array<SpeechBubble>;
  chatHTMLElement: HTMLElement | null;
}
