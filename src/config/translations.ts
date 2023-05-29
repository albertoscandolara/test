import { Translation } from "../models/translation";

export const translations: Map<string, Translation> = new Map<
  string,
  Translation
>([
  [
    "Teleport to",
    new Translation(
      "Teleport to",
      "Téléportation vers",
      "Teletrasporto",
      "Телепортироваться в"
    ),
  ],
  [
    "Change language",
    new Translation(
      "Change language",
      "Changer de langue",
      "Cambia lingua",
      "Изменить язык"
    ),
  ],
  ["Home", new Translation("Home", "Home", "Home", "Дом")],
  [
    "3D Exhibition",
    new Translation(
      "3D Exhibition",
      "Exposition 3D",
      "Mostra 3D",
      "3D выставка"
    ),
  ],
  [
    "Websites",
    new Translation("Websites", "Sites Internet", "Siti web", "Веб-сайты"),
  ],
  ["About me", new Translation("About me", "Sur moi", "Su di me", "Обо мне")],
  ["Enter", new Translation("Enter", "Entrer", "Entra", "Входить")],
  ["Talk", new Translation("Talk", "Parle", "Parla", "Разговаривать")],
  [
    "Interact",
    new Translation(
      "Interact",
      "Interagir",
      "Interagisci",
      "Взаимодействовать"
    ),
  ],
  [
    "Inspect",
    new Translation("Inspect", "Inspecter", "Ispeziona", "Осмотреть"),
  ],
]);
