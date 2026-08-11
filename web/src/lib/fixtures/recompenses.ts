import { storageUrl } from "@/lib/assets";
import type { Recompense } from "@/types/ecrans";

/**
 * Les récompenses de repli, relevées en production le 11 août 2026.
 *
 * Ne servent que si la production ne répond pas — la page va normalement
 * chercher la vraie liste, voir `src/lib/ecrans-source.ts`.
 *
 * Le JSON de production ne contient qu'un chemin d'image par récompense, sans
 * nom ni description. On garde donc juste les chemins, et `storageUrl` les
 * transforme en URL, comme pour le reste de l'imagerie.
 */
const CHEMINS = [
  "images/rewards/hEIq11qVePMXoNnKiVtkxwkKWoa00FtSHuC6FXLd.png",
  "images/rewards/XMRJagi2D1JXOAaMcUoIrm9dvF5WIA5uiGm6TUYd.png",
  "images/rewards/MOpi9zcmlanUh9gHqrOvzTo80U6VWkBZeNXiZR6k.png",
  "images/rewards/8eLhfPjwWXlI1DdkpO8bX5Rv7XQUytS96rKKZuOH.png",
  "images/rewards/ZUmjYQSHmJd32K6nL34uMtBBr2YTQ3dEDfN7R2MY.png",
  "images/rewards/sBRrGUgY6ZV5Wo5Jc79qsZZRl6w96ibzOUvZw4mL.png",
  "images/rewards/yFloX1oGQwswo2eNdIcBrgXb3frh5Huio3TMiki5.png",
  "images/rewards/0ckf9tnrH8vMJI3pSnmMA9P3VrLyO8HpyNqy0Vbj.png",
  "images/rewards/jMoyxtySSb5FgI3kttZYQ3ka2CHepOmer9XG5Tsn.png",
  "images/rewards/Lw0gu2qS0nwnsHNJ1Se7H5t9fCiOix5u7wluvjcj.png",
  "images/rewards/bLXdTQ4bku2AZNBQMvKuvncJ5CEMv8dboKXO8s5D.png",
  "images/rewards/mDGw3XZMrB2A2ik6NUADSNM9rjhBSyZU6MjiVwBM.png",
  "images/rewards/vHGsrfGXOvfB8AgL6YOLyvvqFZeSf94NXogis0vh.png",
  "images/rewards/SXfmDUKQNHMF3UFxWZrL8XNy0e57hEF4WIfLzMR9.jpg",
  "images/rewards/YXP7R7CzrY6yNxdwot2f3zJUP5H6sAKBSG2SuV44.jpg",
  "images/rewards/yj0YEzleYHhPMsId5tj42zWdSd6lrU97hWjU5o7g.jpg",
  "images/rewards/hMbr1AQSI4seltvmsDkPk4OCi6r9HMk8fexg4uvO.jpg",
  "images/rewards/PHvol5e2MzaBOKj6K0UM7SlowOW9LcahG2PToKLz.jpg",
  "images/rewards/z638OWKlQTou1mXcpvDEY81lbBYoqZ9V6EATNTT9.jpg",
  "images/rewards/wU0QVeTxNRd7DQ437QfphzBKB1voFT5Xb1FBY5gr.jpg",
  "images/rewards/lcnVHDRDgHNFetD8WdmtXnsoPHPXRJSGJ7PJggSD.jpg",
  "images/rewards/yMMWkLpPP3eLDSuaV9Kwafx5e68U94cGqGgaK2EN.jpg",
  "images/rewards/yhnwUDETXoSF9GkgygPZm8lSKdC48OhGQyumUaLR.jpg",
  "images/rewards/vLuk4ZvgReuV7vbFY2S0hGehJct5zD9ioOvqwkl2.jpg",
  "images/rewards/HXBmebn2kGh8klLDwbbhaXSQgbdByLR7TXJYFj48.jpg",
  "images/rewards/6xemLAuxcWHZZzpYXwdDACxJgAsd4AUeFrVXIPYp.jpg",
  "images/rewards/pwBSxpZUTLSdhhZCkpgnxGELrpN5E0hg0VjU11cQ.jpg",
  "images/rewards/GARmHCO1jgxy2Zjqb7gRgYAV5Y4X87QF6gVHOrrF.jpg",
  "images/rewards/ipffMadEw5XAFtaoA98oMUFYbybEPFGN1kBuODbH.jpg",
  "images/rewards/F9nEs7GQ7B34rmEhVrpk5WgimaymMjAf0C3FEike.jpg",
  "images/rewards/VtmP3QIiTpiFhF0HejzYtL2zYsDmmzA9lcFzFXoQ.jpg",
  "images/rewards/5p7HahYd07zjyv1v7XBSeobATQmlVsnZeCy2VgI9.jpg",
  "images/rewards/Xj53vFlj6cwWeZt25CsSVJ4m88PC2rQ7pcwTv792.png",
  "images/rewards/hdq9uMeV6JEXuhffXVylrPeUWAuQolYCLWzvCBTy.png",
  "images/rewards/j4N2eCvPRdmnxVt02x2YMoGcSxMhYdvSvlg8mr5n.png",
  "images/rewards/dLdqWvi1Pds2ZtXiLFafzPm7CLZCqOLgjnpw7LHG.png",
  "images/rewards/rXJDTBffC188uF7SodGzRW9wsdJUn7ZjZSfSMsdC.png",
  "images/rewards/X29JiDouNPJI2AyHvbujRtPOqrgMn17cdWn4sviH.png",
  "images/rewards/g2tHJRlB3CQo8CwATppJfFp5TptBzostxNappy4f.png",
];

export const recompensesFixtures: Recompense[] = CHEMINS.map((chemin) => ({
  image: storageUrl(chemin),
}));
