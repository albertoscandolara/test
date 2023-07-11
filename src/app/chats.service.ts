// @ts-ignore
import { createFromConfig } from "as-wc-lib";
import { Chat } from "../models/chat/chat";
import {
  chatConfig,
  chatConfigModal,
} from "./2D/components/chat/configuration/chat configuration";
import { speechBubbleConfig } from "./2D/components/chat/configuration/speech bubble configuration";
import chatJSON from "../config/json/chats.json";
import { LoggerService } from "./logger.service";
import { WEB_COMPONENTS_SIGNATURES } from "./2D/enums/web-components-signatures.enum";
import { SpeechBubble } from "../models/chat/speech bubble/speech bubble";
import { DOM_EVENTS } from "./enums/DOMEevents";
import { LanguageService } from "./language.service";

let instance: ChatsService | undefined = undefined;

/**
 * Environments handler service
 */
export class ChatsService {
  #languageService!: LanguageService;
  #loggerService!: LoggerService;
  private _chats: Array<Chat> = [];

  /**
   * Constructor
   * @constructor
   * @ignore
   */
  constructor() {
    // singleton
    if (instance) {
      return instance;
    }
    this.#languageService = new LanguageService();
    this.#loggerService = new LoggerService();

    this._chats = chatJSON.chats;
  }

  public getChat(id: number) {
    const chat: Chat | undefined = this._chats.find((chat) => chat.id === id);

    if (!chat) {
      this.#loggerService.error(
        `${this.constructor.name} - Could not find requested chat`
      );
    }

    return chat;
  }

  public getSpeechBubble(chatId: number, speechBubbleId: number) {
    let chat: Chat | undefined = this.getChat(chatId);
    if (!chat) {
      return;
    }
    chat = chat as Chat;

    const speechBubble: SpeechBubble | undefined = chat.speechBubbles.find(
      (speechBubble) => speechBubble.id === speechBubbleId
    );

    if (!speechBubble) {
      this.#loggerService.error(
        `${this.constructor.name} - Could not find requested speechBubble`
      );
    }

    return speechBubble;
  }

  public openChat(id: number): void {
    let chat: Chat | undefined = this.getChat(id);
    if (!chat) {
      return;
    }
    chat = chat as Chat;
    if (chat.chatHTMLElement) {
      return;
    }

    let config: any | null = null;
    let container: HTMLElement | null = null;
    if (chat.containerCssSelector === "document") {
      config = chatConfigModal;
      container = document.querySelector("body");
    } else {
      config = chatConfig;
      container = document.querySelector(`.${chat.containerCssSelector}`);
    }
    if (!container || !config) {
      return;
    }

    chat.chatHTMLElement = createFromConfig(config, container);
    this.addSpeechBubble(id, 1);

    if (chat.containerCssSelector === "document") {
      // close at click
      chat.chatHTMLElement?.addEventListener(DOM_EVENTS.CLICK, () => {
        this.closeChat(chat?.id as number);
      });
    }
  }

  public closeChat(id: number): void {
    let chat: Chat | undefined = this.getChat(id);
    if (!chat) {
      return;
    }
    chat = chat as Chat;

    chat?.chatHTMLElement?.remove();
    (chat as Chat).chatHTMLElement = null;
  }

  public addSpeechBubble(chatId: number, speechBubbleId: number) {
    let chat: Chat | undefined = this.getChat(chatId);
    if (!chat) {
      return;
    }
    chat = chat as Chat;

    let speechBubble: SpeechBubble | undefined = this.getSpeechBubble(
      chatId,
      speechBubbleId
    );
    if (!speechBubble) {
      return;
    }

    speechBubble = speechBubble as SpeechBubble;
    const config = speechBubbleConfig;
    config.attributes.speaker = speechBubble.speaker;
    config.attributes.text = this.#languageService.translate(speechBubble.text);

    let chatHTMLElement: HTMLElement | undefined | null =
      chat.chatHTMLElement?.querySelector(
        `${WEB_COMPONENTS_SIGNATURES.AS_CHAT}`
      );

    if (!chatHTMLElement) {
      return;
    }
    chatHTMLElement = chatHTMLElement as HTMLElement;

    let chatWrapperContainer: Element | null = (
      chatHTMLElement.shadowRoot as ShadowRoot
    ).querySelector(".wrapper .body");

    if (!chatWrapperContainer) {
      return;
    }
    chatWrapperContainer = chatWrapperContainer as Element;

    const speechBubbleHTMLElement = createFromConfig(
      config,
      chatWrapperContainer
    );
  }
}
