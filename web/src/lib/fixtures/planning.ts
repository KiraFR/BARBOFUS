import type { Planning } from "@/types/ecrans";

/**
 * Le planning de repli, relevé en production le 11 août 2026.
 *
 * Il ne sert que si la production ne répond pas : la page va normalement
 * chercher le planning réel — voir `src/lib/ecrans-source.ts`.
 *
 * Les données sont recopiées telles quelles, imperfections comprises : deux
 * activités masquées le lundi (décochées plutôt que supprimées), un dimanche
 * qui commence à 00:00, et une activité « Dofus » de 00:00 à 00:00, donc de
 * durée nulle. C'est ce que le site montre aujourd'hui, donc c'est ce qu'on
 * montre.
 *
 * La semaine est celle inscrite dans le JSON de production : la 14e de 2026,
 * soit fin mars. Elle est périmée de plusieurs mois — le planning n'a pas été
 * rechargé depuis. Là non plus on n'invente rien.
 */
export const planningFixture: Planning = {
  semaine: 14,
  annee: 2026,
  jours: [
    {
      nom: "LUN",
      activites: [
        {
          nom: "I.O.P. nouvelle aventure !",
          debut: "07:00",
          fin: "13:00",
          image:
            "https://barbofus.com/storage/images/planning/RV7FdgeV0dpHBqMP5sOy4cl0cNfwOHLzsOtFk3Ue.png",
          visible: false,
        },
        {
          nom: "I.O.P. nouvelle aventure !",
          debut: "13:00",
          fin: "15:30",
          image:
            "https://barbofus.com/storage/images/planning/x3b0OGaCWdAZcEFVycmEhKlsttzh8Lytf0CLToLh.png",
          visible: false,
        },
      ],
    },
    {
      nom: "MAR",
      activites: [
        {
          nom: "I.O.P. nouvelle aventure !",
          debut: "07:00",
          fin: "13:00",
          image:
            "https://barbofus.com/storage/images/planning/d5kFPxJNUWN9qL6t4wtqf1F8dmVbobACxyB9yINt.png",
          visible: true,
        },
        {
          nom: "I.O.P. nouvelle aventure !",
          debut: "13:00",
          fin: "15:30",
          image:
            "https://barbofus.com/storage/images/planning/nnUc4pQpg6qIuEGkLywCv1pmbgdM6oSbHvlPU77Y.png",
          visible: true,
        },
      ],
    },
    {
      nom: "MER",
      activites: [
        {
          nom: "I.O.P. nouvelle aventure !",
          debut: "07:00",
          fin: "13:00",
          image:
            "https://barbofus.com/storage/images/planning/fzaX6HpsGxrKTxwxRF8OU5RNdpvqUDxBGhEi2XZv.png",
          visible: true,
        },
        {
          nom: "I.O.P. nouvelle aventure !",
          debut: "13:00",
          fin: "15:30",
          image:
            "https://barbofus.com/storage/images/planning/5huewP5gSi0mWVrmtgCVNhnl7hK4nHdtPEGo0v0b.png",
          visible: true,
        },
      ],
    },
    {
      nom: "JEU",
      activites: [
        {
          nom: "I.O.P. nouvelle aventure !",
          debut: "07:00",
          fin: "13:00",
          image:
            "https://barbofus.com/storage/images/planning/TbnF8uV1tb7rxwPrbFtKw5hM2ArDeWwVB4w2WtHU.png",
          visible: true,
        },
        {
          nom: "I.O.P. nouvelle aventure !",
          debut: "13:00",
          fin: "15:30",
          image:
            "https://barbofus.com/storage/images/planning/5NTiAEP8txhgzWAf0nGMs5aQ2HqZc4c6mVgO8cC9.png",
          visible: true,
        },
      ],
    },
    {
      nom: "VEN",
      activites: [
        {
          nom: "I.O.P. nouvelle aventure !",
          debut: "07:00",
          fin: "13:00",
          image:
            "https://barbofus.com/storage/images/planning/mrAXKFZFPgdYuNzlx9gH9QtjLigYM1MTQf69IzLa.jpg",
          visible: true,
        },
        {
          nom: "I.O.P. nouvelle aventure !",
          debut: "13:00",
          fin: "15:30",
          image:
            "https://barbofus.com/storage/images/planning/UbfQ3VtXPvW3Y9vFdU4yIq7kZ1GwvY3s1v6SVBrD.png",
          visible: true,
        },
      ],
    },
    {
      nom: "SAM",
      activites: [
        {
          nom: "💀 !OMBRE ft. @DropDadou 👀",
          debut: "07:00",
          fin: "11:00",
          image:
            "https://barbofus.com/storage/images/planning/xSHYFokFlxh9RwHAxxelEgu2ZeO7rL91kZvLubpx.png",
          visible: true,
        },
        {
          nom: "Dofus",
          debut: "17:00",
          fin: "23:00",
          image: "https://barbofus.com/storage/images/planning/base_dofus.png",
          visible: false,
        },
      ],
    },
    {
      nom: "DIM",
      activites: [
        {
          nom: "💀 !OMBRE ft. @DropDadou 👀",
          debut: "00:00",
          fin: "11:00",
          image:
            "https://barbofus.com/storage/images/planning/SiojraIxrgTGTG76HEfzQR6NfuDx8CoZ41rZ39mx.png",
          visible: true,
        },
        {
          nom: "Dofus",
          debut: "00:00",
          fin: "00:00",
          image: "https://barbofus.com/storage/images/planning/base_dofus.png",
          visible: false,
        },
      ],
    },
  ],
};
