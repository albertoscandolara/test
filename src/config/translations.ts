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
  // Chats
  [
    "Hello! \r\n Welcome to the Louvre! \r\n Here, like inside the iconic museum, you will find my experiments with 3D arts (mostly done with Blender). Interact with every piece to see its details and give it a closer look through the provided link! \r\n Enjoy the visit!",
    new Translation(
      "Hello! \r\n Welcome to the Louvre! \r\n Here, like inside the iconic museum, you will find my experiments with 3D arts (mostly done with Blender). Interact with every piece to see its details and give it a closer look through the provided link! \r\n Enjoy the visit!",
      "Bonjour! \r\n Bienvenue au Louvre ! \r\n Ici, comme à l'intérieur du musée emblématique, vous trouverez mes expériences avec les arts 3D (principalement réalisées avec Blender). Interagissez avec chaque pièce pour voir ses détails et regardez-le de plus près grâce au lien fourni ! \r\n Bonne visite!",
      "Ciao! \r\n Benvenuto al Louvre! \r\n Qui, come all'interno dell'iconico museo, troverai i miei esperimenti con le arti 3D (realizzati principalmente con Blender). Interagisci con ogni pezzo per vederne i dettagli e dai un'occhiata più da vicino attraverso il link fornito! \r\n Buona visita!",
      "Здравствуйте! \r\n Добро пожаловать в Лувр! \r\n Здесь, как и в культовом музее, вы найдете мои эксперименты с 3D-искусством (в основном, с помощью Blender). Взаимодействуйте с каждым произведением, чтобы увидеть его детали и ознакомьтесь с ним по предоставленной ссылке! \r\n Приятного посещения!"
    ),
  ],
]);
