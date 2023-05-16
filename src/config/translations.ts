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
  [
    "Courtyard",
    new Translation("Courtyard", "Cour", "Cortile", "Внутренний двор"),
  ],
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
  [
    "Enter this building",
    new Translation(
      "Enter this building",
      "l",
      "Entra in questo edificio",
      "n"
    ),
  ],
  [
    "Talk to this character",
    new Translation(
      "Talk to this character",
      "l",
      "Parla a questo personaggio",
      "Talk to this character russian"
    ),
  ],
]);
