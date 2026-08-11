/**
 * Textes de l'interface, dans les quatre langues du site.
 *
 * Repris de `lang/{fr,en,es,pt}/barbofus.php` côté Laravel, en conservant les
 * clés d'origine : la traduction existe déjà, il n'y a rien à refaire.
 *
 * Pourquoi un simple dictionnaire plutôt que next-intl : le choix d'une
 * bibliothèque d'internationalisation entraîne celui des URL (`/fr/...`,
 * `/en/...`), qui n'a de conséquence réelle que pour le référencement — donc
 * pour la galerie, pas pour un écran de connexion qui restera non indexé. On
 * tranchera à ce moment-là, avec l'information en main.
 *
 * Ce qui coûte cher, ce n'est pas le routage : c'est de réécrire des textes
 * codés en dur dans quinze écrans. Ça, c'est déjà évité.
 */

export const locales = ["fr", "en", "es", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/** La forme du dictionnaire, imposée par le français qui fait référence. */
export type Messages = (typeof messages)["fr"];

export const messages = {
  fr: {
    descriptionTools: "Voici une liste d'outils qui seront utiles pour votre aventure !",
    titleToolsTougli: "Tougli - Le guide opti des Dofus",
    descriptionToolsTougli:
      "Ce site web vous permet de suivre une route optimisée pour vos Dofus, d'avoir la liste des ressources requises et d'enregistrer votre progression.\n                    <br>Toutes les quêtes nécessaires à l'obtention du Dofus seront listées dans un ordre efficace, et le document garde en mémoire les quêtes achevées pour suivre votre avancée facilement.",
    buttonToolsTougli: "Cliquez ici pour ouvrir",
    titleToolsGrougalorasalar: "Grougalorasalar Solver",
    descriptionToolsGrougalorasalar:
      "Cette application web vous permet de résoudre le combat tactique contre le Grougalorasalar pour obtenir le Dofus Ébène.\n                    <br>Renseignez la configuration du combat et l'outil calculera automatiquement la stratégie optimale pour venir à bout de ce redoutable adversaire !",
    buttonToolsGrougalorasalar: "Ouvrir le Grougalorasalar Solver",
    titleToolsBolgrot: "Bolgrot Solver",
    descriptionToolsBolgrot:
      "Cette application web vous permet de résoudre le combat tactique contre le Bolgrot afin de continuer votre Dofus Turquoise.\n                    <br>Renseignez la configuration du combat et l'outil calculera automatiquement la stratégie optimale pour venir à bout de ce redoutable adversaire !",
    buttonToolsBolgrot: "Ouvrir le Bolgrot Solver",
    titleToolsMinigolem: "Minogolem Solver",
    descriptionToolsMinigolem:
      "Cette application web vous permet de simuler le combat tactique des minogolem pour obtenir le Dofus Pourpre.\n                    <br>Renseignez les états à venir et l'outil calculera automatiquement vos prochains tours de jeu optimaux, pour ne plus jamais rater une opportunité !",
    buttonToolsMinigolem: "Ouvrir le Minogolem Solver",
    titleToolsRainikrone: "Rainikrone Solver",
    descriptionToolsRainikrone:
      "Cette application web vous permet de résoudre le puzzle du combat contre la Rainikrone pour obtenir le Dofus Ivoire.\n                    <br>Importez une capture d'écran du combat et l'outil détectera automatiquement la disposition de la carte de combat, puis calculera la stratégie optimale pour venir à bout du boss !",
    buttonToolsRainikrone: "Ouvrir le Rainikrone Solver",
    titleToolsSkin20: "Un peu de nostalgie ? Les skins 2.0",
    descriptionToolsSkin20:
      "Plongez dans un océan de souvenirs avec le retour des skins emblématiques de Dofus 2.0 !\n                <br>Ces designs intemporels, qui ont marqué des générations d’aventuriers, réveillent la magie des premières explorations. Redécouvrez l’élégance des équipements d’antan et laissez la nostalgie vous guider à travers le Monde des Douze.",
    buttonToolsSkin20: "Cliquez ici pour les (re)découvrir",

    titleHome: "Barbofus, la galerie de skins dofus",
    descriptionHome:
      "Bienvenue sur le site, explore la galerie de skin, ou poste les tiens et deviens la miss'skin de Dofus !",
    buttonSkinExplore: "Explorer un skin",
    titleBarbe: "Découvre Barbe Douce",
    descriptionBarbe: "Le Streameur à l'origine de ce site",
    titleBarbeDetails: "Petite présentation rapide & efficace :",
    descriptionBarbeDetails1: "Je suis partenaire",
    descriptionBarbeDetails2: "En live chaque jour dès 7-8h sur :",
    descriptionBarbeDetails3: "Contact Pro :",
    titleUnity: "Et si on profitait des skins unity ?!",
    descriptionUnity1:
      "Avec une galerie de plus de <strong>:skinCount skins</strong> postés par <strong>:userCount joueurs</strong>, Barbofus te permet de trouver le meilleur skin Dofus pour ton personnage en jeu, ou de montrer à tout le monde tes propres créations !",
    descriptionUnity2:
      "Découvre toute la variété du monde des douzes, peu importe le sexe, la classe, les couleurs ou le choix d'items, tous les skins sont présentés pour le plus grand plaisir des joueurs.",
    descriptionUnity3:
      "Tu veux montrer à la commu' de Barbe que c'est toi le plus fashion ? Tous les mardis, le concours Miss'Skin choisira les 3 skins ayant reçu le plus de like dans la semaine, alors prépare ton meilleur outfit et impressionne le monde des douzes !",
    descriptionUnity4:
      "Féca, Osamodas, Enutrof, Sram, Xélor, Ecaflip, Eniripsa, Iop, Crâ, Sadida, Sacrieur, Pandawa, Roublard, Zobal, Steamer, Eliotrope, Huppermage, Ouginak, Forgelance, vous êtes tous bienvenu !",
    descriptionUnity5:
      "Désormais, partagez vos skins de la version 3.0 sous Unity de Dofus sur Barbofus !",
    titleThanks: "Remerciements",
    titleTranslation: "Traductions",

    filterTitle: "Affine ta recherche",
    filterSearchLabel: "Recherche un item ou un pseudo :",
    filterSearchPlaceholder: "Nom d'item ou pseudo",
    filterMissSkinOnly: "Voir uniquement les vainqueurs du Miss'Skin",
    filterBarbeDouceOnly: "Voir uniquement les skins de Barbe Douce",
    filterItemsCanBe: "Les items peuvent être :",
    filterItemCeremonial: "Objet d'apparat",
    filterItemLiving: "Objet vivant",
    filterItemMimibiotable: "Mimibiotable",
    filterOnlyShow: "Voir uniquement les :",
    filterTypePet: "Familier",
    filterTypeMountable: "Montilier",
    filterTypeMount: "Monture",
    filterChooseClass: "Choisis une classe ...",
    filterColors: "Couleurs :",
    filterGenderMale: "Homme",
    filterGenderFemale: "Femme",
    filterUnavailable: "Pas encore disponible : l'API ne fournit pas cette donnée.",
    filterNoResult: "Aucun skin ne correspond à ces filtres.",
    filterReset: "Réinitialiser les filtres",

    galleryTutorial: "Suivez le tutoriel pour poster un skin 3.0",
    galleryTutorialTitle: "Tutoriel pour poster un skin",
    galleryToSkinator: "Accès au skinator",
    gallerySkinsCount: "skins",
    gallerySortBy: "Trier par:",
    sortNewest: "Nouveauté",
    sortOldest: "Ancienneté",
    sortFavorites: "Favoris",
    sortRewards: "Récompenses",
    sortBreeds: "Classes",
    sortMostViewed: "Les plus vues",

    buttonHome: "Accueil",
    buttonSkins: "Skins",
    buttonHavenbags: "Havre-Sacs",
    buttonTools: "Barb'Outils",
    buttonDashboard: "Mon compte",
    buttonLogout: "Se déconnecter",

    titleLogin: "Connexion",
    descriptionLogin: "Bienvenue sur Barbofus !",
    inputEmail: "E-mail",
    inputPassword: "Mot de passe",
    inputRememberMe: "Se souvenir de moi",
    buttonLogin: "Se connecter",
    buttonForgotPassword: "Mot de passe oublié ?",
    descriptionNoAccount: "Aucun compte ?",
    buttonRegister: "S'enregistrer",

    titleRegister: "Inscription",
    descriptionRegister1: "Rejoins-nous sur Barbofus !",
    descriptionRegister2:
      "Attention! L'e-mail de vérification risque d'arriver dans tes spams/indésirables.",
    inputName: "Nom",
    inputPasswordConfirmation: "Confirmation",
    descriptionAlreadyRegistered: "Déjà inscrit ?",

    titleForgotPassword: "Mot de passe oublié",
    descriptionForgotPassword: "Reçois un lien de réinitialisation par email",
    alertPasswordResetSended:
      "Un e-mail de réinitialisation a été envoyé !\nPense à regarder tes spams / indésirables.",
    buttonSend: "Envoyer",
    descriptionPasswordRetrieved: "Mot de passe retrouvé ?",

    titleResetPassword: "Mot de passe oublié",
    descriptionResetPassword: "Réinitialise ton mot de passe",

    descriptionVerifyEmail1: "L'adresse mail doit être validée pour se connecter.",
    descriptionVerifyEmail2: "Un email de vérification a été envoyé.",
    descriptionVerifyEmail3: "Merci de cliquer sur le lien dans le mail.",
    descriptionVerifyEmail4: "Pense à vérifier tes spams/indésirables.",
    buttonSendVerifyEmail: "Réenvoyer l'e-mail de validation",
    alertVerifyEmailSended: "Un e-mail de vérification a été renvoyé !",

    // Messages de validation — absents du Laravel, qui valide côté serveur.
    // Le front valide avant l'envoi, donc ces textes-là sont nouveaux.
    errorEmailRequired: "Renseigne ton adresse e-mail.",
    errorEmailInvalid: "Cette adresse e-mail n'est pas valide.",
    errorPasswordRequired: "Renseigne ton mot de passe.",
    errorCredentials: "E-mail ou mot de passe incorrect.",
    errorNameRequired: "Choisis un nom.",
    errorPasswordTooShort: "Le mot de passe doit faire au moins 8 caractères.",
    errorPasswordMismatch: "Les deux mots de passe ne correspondent pas.",
  },
  en: {
    descriptionTools: "Here is a list of tools that will be useful for your adventure!",
    titleToolsTougli: "Tougli - An optimized guide for the Dofus",
    descriptionToolsTougli:
      "This Google Sheet allows you to track an optimized route for your Dofus, view the list of required resources, and record your progress.\n                    <br>All the quests required to obtain the Dofus will be listed in an efficient order, and the document will keep track of completed quests to easily monitor your progress.",
    buttonToolsTougli: "Click here to open",
    titleToolsGrougalorasalar: "Grougalorasalar Solver",
    descriptionToolsGrougalorasalar:
      "This web app lets you solve the tactical combat against the Grougalorasalar to obtain the Ebony Dofus.\n                    <br>Enter the fight configuration and the tool will automatically calculate the optimal strategy to overcome this formidable opponent!",
    buttonToolsGrougalorasalar: "Open the Grougalorasalar Solver",
    titleToolsBolgrot: "Bolgrot Solver",
    descriptionToolsBolgrot:
      "This web app lets you solve the tactical combat against the Bolgrot to continue your Turquoise Dofus quest.\n                    <br>Enter the fight configuration and the tool will automatically calculate the optimal strategy to overcome this formidable opponent!",
    buttonToolsBolgrot: "Open the Bolgrot Solver",
    titleToolsMinigolem: "Minogolem Solver",
    descriptionToolsMinigolem:
      "This web app lets you simulate the tactical minogolem combat required to obtain the Crimson Dofus.\n                    <br>Enter the upcoming states and the tool will automatically calculate your optimal next turns, so you never miss a winning move again!",
    buttonToolsMinigolem: "Open Minogolem Solver",
    titleToolsRainikrone: "Rainikrone Solver",
    descriptionToolsRainikrone:
      "This web app lets you solve the Rainikrone combat puzzle required to obtain the Ivory Dofus.\n                    <br>Upload a screenshot of the fight and the tool will automatically detect the battle map layout, then calculate the optimal strategy to defeat the boss!",
    buttonToolsRainikrone: "Open the Rainikrone Solver",
    titleToolsSkin20: "A bit of nostalgia? The 2.0 skins",
    descriptionToolsSkin20:
      "Dive into an ocean of memories with the return of the iconic Dofus 2.0 skins!\n                <br>These timeless designs, which have marked generations of adventurers, bring back the magic of early explorations. Rediscover the elegance of old gear and let nostalgia guide you through the World of Twelve.",
    buttonToolsSkin20: "Click here to (re)discover them",

    titleHome: "Barbofus, the Dofus skins gallery",
    descriptionHome:
      "Welcome to the website! Explore the skin gallery, share your own, and become the Miss'skin of Dofus!",
    buttonSkinExplore: "Explore the skins",
    titleBarbe: "Discover Barbe Douce",
    descriptionBarbe: "The streamer behind this site",
    titleBarbeDetails: "A quick & effective introduction:",
    descriptionBarbeDetails1: "I am a partner",
    descriptionBarbeDetails2: "Live every day from 7-8 AM on:",
    descriptionBarbeDetails3: "Professional contact:",
    titleUnity: "What if we enjoyed Unity skins?!",
    descriptionUnity1:
      "With a gallery of over <strong>:skinCount skins</strong> posted by <strong>:userCount players</strong>, Barbofus allows you to find the best Dofus skin for your character in the game, or showcase your own creations to everyone!",
    descriptionUnity2:
      "Discover the full variety of the World of Twelve, regardless of gender, breed, colors, or item choices. All skins are presented for the greatest pleasure of the players.",
    descriptionUnity3:
      "Want to show the Barbofus community that you're the most fashionable? Every Tuesday, the Miss'Skin contest will choose the 3 skins that received the most likes during the week. So get your best outfit ready and impress the World of Twelve!",
    descriptionUnity4:
      "Feca, Osamodas, Enutrof, Sram, Xelor, Ecaflip, Eniripsa, Iop, Cra, Sadida, Sacrier, Pandawa, Rogue, Masqueraider, Foggernaut, Eliotrope, Huppermage, Ouginak, Forgelance, you are all welcome!",
    descriptionUnity5:
      "From now on, share your skins from the Dofus 3.0 Unity version on Barbofus!",
    titleThanks: "Acknowledgements",
    titleTranslation: "Translations",

    filterTitle: "Refine your search",
    filterSearchLabel: "Search an item or a username:",
    filterSearchPlaceholder: "Item name or username",
    filterMissSkinOnly: "Only show Miss'Skin winners",
    filterBarbeDouceOnly: "Only show Barbe Douce's skins",
    filterItemsCanBe: "Items may be:",
    filterItemCeremonial: "Ceremonial item",
    filterItemLiving: "Living object",
    filterItemMimibiotable: "Mimibiotable",
    filterOnlyShow: "Only show:",
    filterTypePet: "Pet",
    filterTypeMountable: "Mountable pet",
    filterTypeMount: "Mount",
    filterChooseClass: "Choose a class ...",
    filterColors: "Colours:",
    filterGenderMale: "Male",
    filterGenderFemale: "Female",
    filterUnavailable: "Not available yet: the API does not provide this data.",
    filterNoResult: "No skin matches these filters.",
    filterReset: "Reset filters",

    galleryTutorial: "Follow the tutorial to post a 3.0 skin",
    galleryTutorialTitle: "Tutorial: how to post a skin",
    galleryToSkinator: "Go to the skinator",
    gallerySkinsCount: "skins",
    gallerySortBy: "Sort by:",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    sortFavorites: "Favourites",
    sortRewards: "Rewards",
    sortBreeds: "Classes",
    sortMostViewed: "Most viewed",

    buttonHome: "Home",
    buttonSkins: "Skins",
    buttonHavenbags: "Havenbags",
    buttonTools: "Barb'Tools",
    buttonDashboard: "My profile",
    buttonLogout: "Log out",

    titleLogin: "Login",
    descriptionLogin: "Welcome to Barbofus !",
    inputEmail: "Email",
    inputPassword: "Password",
    inputRememberMe: "Remember me",
    buttonLogin: "Log in",
    buttonForgotPassword: "Forgot password ?",
    descriptionNoAccount: "No account yet ?",
    buttonRegister: "Register",

    titleRegister: "Register",
    descriptionRegister1: "Come join us on Barbofus !",
    descriptionRegister2: "Warning! The verification email may end up in your spam/junk folder.",
    inputName: "Name",
    inputPasswordConfirmation: "Confirmation",
    descriptionAlreadyRegistered: "Already registered ?",

    titleForgotPassword: "Forgot password",
    descriptionForgotPassword: "Receive your password reset link",
    alertPasswordResetSended:
      "A password reset email has been sent!\nRemember to check your spam/junk folder.",
    buttonSend: "Send",
    descriptionPasswordRetrieved: "Password retrieved ?",

    titleResetPassword: "Forgot password",
    descriptionResetPassword: "Reset your password",

    descriptionVerifyEmail1: "The email address must be verified to log in.",
    descriptionVerifyEmail2: "A verification email has been sent.",
    descriptionVerifyEmail3: "Please click on the link in the email.",
    descriptionVerifyEmail4: "Remember to check your spam/junk folder.",
    buttonSendVerifyEmail: "Resend verification email",
    alertVerifyEmailSended: "A verification email has been resent!",

    errorEmailRequired: "Please enter your email address.",
    errorEmailInvalid: "This email address is not valid.",
    errorPasswordRequired: "Please enter your password.",
    errorCredentials: "Incorrect email or password.",
    errorNameRequired: "Please choose a name.",
    errorPasswordTooShort: "The password must be at least 8 characters long.",
    errorPasswordMismatch: "The two passwords do not match.",
  },
  es: {
    descriptionTools: "¡Aquí hay una lista de herramientas que te serán útiles para tu aventura!",
    titleToolsTougli: "Tougli - Una guía optimizada para Dofus",
    descriptionToolsTougli:
      "En esta Hoja de cálculo de Google encontrarás una ruta optimicada para la búsqueda de tus Dofus, ver la lista de recursos requeridos,y llevar un registro de tu progreso.\n                    <br>Todas las misiones requeridas para obtener los Dofus están listadasen un orden eficiente, y el documento guardará registro de las misiones completadas para que puedas monitorear tu progreso fácilmente.",
    buttonToolsTougli: "Haz clic aquí para abrir",
    titleToolsGrougalorasalar: "Grougalorasalar Solver",
    descriptionToolsGrougalorasalar:
      "Esta aplicación web te permite resolver el combate táctico contra el Grougalorasalar para obtener el Dofus Ébano.\n                    <br>Introduce la configuración del combate y la herramienta calculará automáticamente la estrategia óptima para vencer a este formidable adversario!",
    buttonToolsGrougalorasalar: "Abrir el Grougalorasalar Solver",
    titleToolsBolgrot: "Bolgrot Solver",
    descriptionToolsBolgrot:
      "Esta aplicación web te permite resolver el combate táctico contra el Bolgrot para continuar con tu Dofus Turquesa.\n                    <br>Introduce la configuración del combate y la herramienta calculará automáticamente la estrategia óptima para vencer a este formidable adversario!",
    buttonToolsBolgrot: "Abrir el Bolgrot Solver",
    titleToolsMinigolem: "Minogolem Solver",
    descriptionToolsMinigolem:
      "Esta aplicación web te permite simular el combate táctico de los minogolem para obtener el Dofus Carmesí.\n                    <br>Introduce los estados por venir y la herramienta calculará automáticamente tus próximos turnos óptimos, ¡para no perder ninguna oportunidad ganadora!",
    buttonToolsMinigolem: "Abrir Minogolem Solver",
    titleToolsRainikrone: "Rainikrone Solver",
    descriptionToolsRainikrone:
      "Esta aplicación web te permite resolver el puzle del combate contra la Rainikrone para obtener el Dofus de Marfil.\n                    <br>Sube una captura de pantalla del combate y la herramienta detectará automáticamente la disposición del mapa de batalla, ¡luego calculará la estrategia óptima para derrotar al jefe!",
    buttonToolsRainikrone: "Abrir el Rainikrone Solver",
    titleToolsSkin20: "¿Algo de nostalgia? Las skins 2.0",
    descriptionToolsSkin20:
      "¡Sumérgete en un mar de memorias con el regreso de las icónicas skins de Dofus 2.0!\n                <br>Estos clásicos diseños, que han marcado generaciones de aventureros, traen de vuelta la magia de las primeras exploraciones. Redescubre la elegancia del atiguo equipamiento y deja que la nostalgia te guíe a través del Mundo de los Doce.",
    buttonToolsSkin20: "Haz clic aquí para (re)descubrirlas",

    titleHome: "Barbofus, la galería de skins de Dofus",
    descriptionHome:
      "¡Bienvenido al sitio! Explora la galería de skins, comparte tus creaciones y ¡gana el premio Miss'Skin de Dofus!",
    buttonSkinExplore: "Explorar skins",
    titleBarbe: "Conoce a Barbe Douce",
    descriptionBarbe: "El streamer detrás de este sitio",
    titleBarbeDetails: "Una rápida presentación:",
    descriptionBarbeDetails1: "Tengo partner en",
    descriptionBarbeDetails2: "En vivo todos los días de 7-8 AM en:",
    descriptionBarbeDetails3: "Contacto profesional:",
    titleUnity: "¡¿Y si le sacamos provecho a las skins de Unity?!",
    descriptionUnity1:
      "Con una galería de más de <strong>:skinCount skins</strong> publicadas por <strong>:userCount jugadores</strong>, ¡Barbofus te permite encontrar la mejor skin de Dofus para tu personaje en el juego, o compartir tus creaciones con todo el mundo!",
    descriptionUnity2:
      "Descubre toda la variedad del Mundo de los Doce, sin importar género, clase, color u objetos. Todas las skins son presentadas para el mayor disfrute de los jugadores.",
    descriptionUnity3:
      "¿Quieres mostrarle a la comunidad de Barbofus que tienes el mejor estilo? Todos los martes, el concurso Miss'Skin elegirá a las 3 skins que más likes hayan recibido durante la semana. ¡Ten listo tu mejor outfit e impresiona al Mundo de los Doce!",
    descriptionUnity4:
      "Feca, Osamodas, Anutrof, Sram, Xelor, Zurcarak, Aniripsa, Yopuka, Ocra, Sadida, Sacrogrito, Pandawa, Tymador, Zobal, Steamer, Selotrop, Hipermago, Uginak, Forjalanza, ¡son todos bienvenidos!",
    descriptionUnity5: "De ahora en adelante, ¡comparte tus skins de Dofus 3.0 en Barbofus!",
    titleThanks: "Agradecimientos",
    titleTranslation: "Traducciones",

    filterTitle: "Afina tu búsqueda",
    filterSearchLabel: "Busca un objeto o un usuario:",
    filterSearchPlaceholder: "Nombre de objeto o usuario",
    filterMissSkinOnly: "Ver solo los ganadores del Miss'Skin",
    filterBarbeDouceOnly: "Ver solo los skins de Barbe Douce",
    filterItemsCanBe: "Los objetos pueden ser:",
    filterItemCeremonial: "Objeto de apariencia",
    filterItemLiving: "Objeto viviente",
    filterItemMimibiotable: "Mimibiotable",
    filterOnlyShow: "Ver únicamente:",
    filterTypePet: "Mascota",
    filterTypeMountable: "Mascotura",
    filterTypeMount: "Montura",
    filterChooseClass: "Elige una clase ...",
    filterColors: "Colores:",
    filterGenderMale: "Hombre",
    filterGenderFemale: "Mujer",
    filterUnavailable: "Aún no disponible: la API no proporciona este dato.",
    filterNoResult: "Ningún skin coincide con estos filtros.",
    filterReset: "Restablecer los filtros",

    galleryTutorial: "Sigue el tutorial para publicar un skin 3.0",
    galleryTutorialTitle: "Tutorial para publicar un skin",
    galleryToSkinator: "Ir al skinator",
    gallerySkinsCount: "skins",
    gallerySortBy: "Ordenar por:",
    sortNewest: "Novedad",
    sortOldest: "Antigüedad",
    sortFavorites: "Favoritos",
    sortRewards: "Recompensas",
    sortBreeds: "Clases",
    sortMostViewed: "Los más vistos",

    buttonHome: "Inicio",
    buttonSkins: "Skins",
    buttonHavenbags: "Merkasakos",
    buttonTools: "Barb'Herramientas",
    buttonDashboard: "Mi perfil",
    buttonLogout: "Cerrar sesión",

    titleLogin: "Iniciar sesión",
    descriptionLogin: "¡Bienvenido a Barbofus!",
    inputEmail: "Email",
    inputPassword: "Contraseña",
    inputRememberMe: "Recuérdame",
    buttonLogin: "Iniciar sesión",
    buttonForgotPassword: "¿Olvidaste tu contraseña?",
    descriptionNoAccount: "¿Aún no tienes cuenta?",
    buttonRegister: "Regístraste",

    titleRegister: "Regístrate",
    descriptionRegister1: "¡Únete a la comunidad Barbofus!",
    descriptionRegister2:
      "¡Alerta! El correo de verificación podría llgar a tu carpeta de correo no deseado.",
    inputName: "Nombre",
    inputPasswordConfirmation: "Confirmación",
    descriptionAlreadyRegistered: "¿Ya tienes una cuenta?",

    titleForgotPassword: "Olvidaste tu contraseña",
    descriptionForgotPassword: "Recibe un link de reestablecimiento de contraseña",
    alertPasswordResetSended:
      "¡Se envió un correo para reestablecimiento de contraseña!\nRecuerda verificar tu carpeta de correo no deseado.",
    buttonSend: "Enviar",
    descriptionPasswordRetrieved: "¿Recuperaste tu contraseña?",

    titleResetPassword: "Olvidaste tu contraseña",
    descriptionResetPassword: "Reestablecer contraseña",

    descriptionVerifyEmail1:
      "Se debe verificar la dirección de correo electrónico para iniciar sesión.",
    descriptionVerifyEmail2: "Se envió un correo de verificación.",
    descriptionVerifyEmail3: "Por favor, haz clic en el link del correo.",
    descriptionVerifyEmail4: "Recuerda verificar tu carpeta de correo no deseado.",
    buttonSendVerifyEmail: "Reenviar correo de verificación",
    alertVerifyEmailSended: "¡Se envió un nuevo correo de verificación!",

    errorEmailRequired: "Introduce tu dirección de email.",
    errorEmailInvalid: "Esta dirección de email no es válida.",
    errorPasswordRequired: "Introduce tu contraseña.",
    errorCredentials: "Email o contraseña incorrectos.",
    errorNameRequired: "Elige un nombre.",
    errorPasswordTooShort: "La contraseña debe tener al menos 8 caracteres.",
    errorPasswordMismatch: "Las dos contraseñas no coinciden.",
  },
  pt: {
    descriptionTools: "Aqui está uma lista de ferramentas que serão úteis para sua aventura!",
    titleToolsTougli: "Tougli - Um guia otimizado para Dofus",
    descriptionToolsTougli:
      "Esta Planilha Google permite que você acompanhe uma rota otimizada para o Dofus, veja a lista de recursos necessários e grave seu progresso.\n                    <br>Todas as missões necessárias para obter os Dofus serão listadas na ordem mais eficiente e o documento Irá acompanhar as missões concluídas para monitorar facilmente o seu progresso.",
    buttonToolsTougli: "Clique aqui para abrir",
    titleToolsGrougalorasalar: "Grougalorasalar Solver",
    descriptionToolsGrougalorasalar:
      "Este aplicativo web permite resolver o combate tático contra o Grougalorasalar para obter o Dofus Ébano.\n                    <br>Insira a configuração do combate e a ferramenta calculará automaticamente a estratégia ideal para vencer este formidável adversário!",
    buttonToolsGrougalorasalar: "Abrir o Grougalorasalar Solver",
    titleToolsBolgrot: "Bolgrot Solver",
    descriptionToolsBolgrot:
      "Este aplicativo web permite resolver o combate tático contra o Bolgrot para continuar sua busca pelo Dofus Turquesa.\n                    <br>Insira a configuração do combate e a ferramenta calculará automaticamente a estratégia ideal para vencer este formidável adversário!",
    buttonToolsBolgrot: "Abrir o Bolgrot Solver",
    titleToolsMinigolem: "Minogolem Solver",
    descriptionToolsMinigolem:
      "Este aplicativo web permite simular o combate tático dos minogolem para obter o Dofus Carmesim.\n                    <br>Insira os estados futuros e a ferramenta calculará automaticamente seus próximos turnos ideais, para nunca mais perder uma jogada vencedora!",
    buttonToolsMinigolem: "Abrir o Minogolem Solver",
    titleToolsRainikrone: "Rainikrone Solver",
    descriptionToolsRainikrone:
      "Este aplicativo web permite resolver o puzzle do combate contra a Rainikrone para obter o Dofus de Marfim.\n                    <br>Envie uma captura de tela do combate e a ferramenta detectará automaticamente a disposição do mapa de batalha, calculando a estratégia ideal para derrotar o chefe!",
    buttonToolsRainikrone: "Abrir o Rainikrone Solver",
    titleToolsSkin20: "Um pouco de nostalgia? As aparências 2.0 ",
    descriptionToolsSkin20:
      "Mergulhe em um oceano de memórias com o retorno das aparências icônicas do Dofus 2.0!\n                <br>Estes designs atemporais, que marcaram gerações de aventureiros, trazem a à tona a magia das primeiras explorações. Redescubra a elegância do antigo equipamento e deixa a nostalgia guiar você através do Mundo dos Doze.",
    buttonToolsSkin20: "Clique aqui para (re)descobrir",

    titleHome: "Barbofus, a galeria de aparências do Dofus",
    descriptionHome:
      "Boas vindas ao site! Explore a galeria de aparências, compartilhe suas próprias criações e torne-se Miss'Aparência do Dofus!",
    buttonSkinExplore: "Explore as aparências",
    titleBarbe: "Descubra Barbe Douce",
    descriptionBarbe: "O streamer por trás deste site",
    titleBarbeDetails: "Uma introdução rápida e efetiva:",
    descriptionBarbeDetails1: "Eu sou um parceiro",
    descriptionBarbeDetails2: "Live todos os dias à partir das 7-8 AM na:",
    descriptionBarbeDetails3: "Contato profissional:",
    titleUnity: "E se nós gostamos das aparências do unity?!",
    descriptionUnity1:
      "Com uma galeria com mais de <strong>:skinCount skins</strong> postadas por <strong>:userCount players</strong>, Barbofus permite que você encontre a melhor aparência para seu personagem ou mostre suas próprias criações para todos verem!",
    descriptionUnity2:
      "Descubra toda a variedade do Mundo dos Doze, independente de gêneros, classes, cores ou escolha de itens. Todas as aparências são apresentadas para o maior prazer dos jogadores.",
    descriptionUnity3:
      "Quer mostrar para toda a comunidade do Barbofus que você é quem tem mais elegância? Toda Terça-feira o concurso Miss'Aparência do Dofus vai escolher as 3 aparências que receberam mais curtidas durante a semana. Então prepare seu melhor traje e impressione o Mundo dos Doze!",
    descriptionUnity4:
      "Feca, Osamodas, Enutrof, Sram, Xelor, Ecaflip, Eniripsa, Iop, Cra, Sadida, Sacrier, Pandawa, Ladino, Zobal, Steamer, Eliotrope, Huppermago, Kilorf, Forjalanca, todos são bem vindos!",
    descriptionUnity5:
      "Daqui adiante compartilhe suas aparências da versão Unity do Dofus 3.0 no Barbofus!",
    titleThanks: "Agradecimentos",
    titleTranslation: "Traduções",

    filterTitle: "Refine sua busca",
    filterSearchLabel: "Busque um item ou um usuário:",
    filterSearchPlaceholder: "Nome do item ou usuário",
    filterMissSkinOnly: "Ver apenas os vencedores do Miss'Skin",
    filterBarbeDouceOnly: "Ver apenas os skins do Barbe Douce",
    filterItemsCanBe: "Os itens podem ser:",
    filterItemCeremonial: "Item de aparência",
    filterItemLiving: "Objeto vivo",
    filterItemMimibiotable: "Mimibiotable",
    filterOnlyShow: "Ver apenas:",
    filterTypePet: "Mascote",
    filterTypeMountable: "Mascote montaria",
    filterTypeMount: "Montaria",
    filterChooseClass: "Escolha uma classe ...",
    filterColors: "Cores:",
    filterGenderMale: "Homem",
    filterGenderFemale: "Mulher",
    filterUnavailable: "Ainda indisponível: a API não fornece esse dado.",
    filterNoResult: "Nenhum skin corresponde a esses filtros.",
    filterReset: "Redefinir os filtros",

    galleryTutorial: "Siga o tutorial para publicar um skin 3.0",
    galleryTutorialTitle: "Tutorial para publicar um skin",
    galleryToSkinator: "Acessar o skinator",
    gallerySkinsCount: "skins",
    gallerySortBy: "Ordenar por:",
    sortNewest: "Novidade",
    sortOldest: "Antiguidade",
    sortFavorites: "Favoritos",
    sortRewards: "Recompensas",
    sortBreeds: "Classes",
    sortMostViewed: "Mais vistos",

    buttonHome: "Início",
    buttonSkins: "Aparência",
    buttonHavenbags: "Saco de viagem",
    buttonTools: "Barb'Ferramentas",
    buttonDashboard: "Meu perfil",
    buttonLogout: "Log out",

    titleLogin: "Login",
    descriptionLogin: "Boas vindas ao Barbofus !",
    inputEmail: "E-mail",
    inputPassword: "Senha",
    inputRememberMe: "Manter-me conectado",
    buttonLogin: "Log in",
    buttonForgotPassword: "Esqueceu sua senha ?",
    descriptionNoAccount: "Ainda não tem uma conta ?",
    buttonRegister: "Registrar-se",

    titleRegister: "Registrar-se",
    descriptionRegister1: "Junte-se a nós no Barbofus !",
    descriptionRegister2:
      "Cuidado! O e-mail de verificação pode ir parar na sua pasta de SPAM ou lixeira.",
    inputName: "Nome",
    inputPasswordConfirmation: "Confirmação",
    descriptionAlreadyRegistered: "Já registrado ?",

    titleForgotPassword: "Esqueci a senha",
    descriptionForgotPassword: "Receba o link para redefinir sua senha",
    alertPasswordResetSended:
      "Um e-mail para redefinir sua senha foi enviado!\nLembre de checar sua pasta de SPAM ou lixeira.",
    buttonSend: "Enviar",
    descriptionPasswordRetrieved: "Senha recuperada ?",

    titleResetPassword: "Esqueci a senha",
    descriptionResetPassword: "Redefinir sua senha",

    descriptionVerifyEmail1: "O endereço de e-mail deve ser verificado para fazer log in.",
    descriptionVerifyEmail2: "Um e-mail de verificação foi enviado.",
    descriptionVerifyEmail3: "Por favor clique no link no e-mail.",
    descriptionVerifyEmail4: "Lembre-se de checar sua pasta de SPAM ou lixeira.",
    buttonSendVerifyEmail: "Reenviar e-mail de verificação",
    alertVerifyEmailSended: "Um e-mail de verificação foi enviado!",

    errorEmailRequired: "Informe seu endereço de e-mail.",
    errorEmailInvalid: "Este endereço de e-mail não é válido.",
    errorPasswordRequired: "Informe sua senha.",
    errorCredentials: "E-mail ou senha incorretos.",
    errorNameRequired: "Escolha um nome.",
    errorPasswordTooShort: "A senha deve ter pelo menos 8 caracteres.",
    errorPasswordMismatch: "As duas senhas não coincidem.",
  },
} satisfies Record<Locale, Record<string, string>>;

/** Récupère le dictionnaire d'une langue, avec repli sur le français. */
export function getMessages(locale: Locale = defaultLocale): Messages {
  return messages[locale] ?? messages[defaultLocale];
}

/** Vrai si la chaîne est une des langues du site. Sert à valider les URL. */
export function estLocale(valeur: string): valeur is Locale {
  return (locales as readonly string[]).includes(valeur);
}

/**
 * Préfixe un chemin interne avec la langue courante.
 *
 * Toutes les pages vivent sous `/{langue}`, donc tout lien interne doit passer
 * par ici. Un `<Link href="/login">` écrit en dur enverrait le visiteur hors
 * de sa langue.
 */
export function lien(locale: Locale, chemin: string): string {
  return chemin === "/" ? `/${locale}` : `/${locale}${chemin}`;
}
