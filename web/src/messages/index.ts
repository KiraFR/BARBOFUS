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
    titleLogin: "Connexion",
    descriptionLogin: "Bienvenue sur Barbofus !",
    inputEmail: "E-mail",
    inputPassword: "Mot de passe",
    inputRememberMe: "Se souvenir de moi",
    buttonLogin: "Se connecter",
    buttonForgotPassword: "Mot de passe oublié ?",
    descriptionNoAccount: "Aucun compte ?",
    buttonRegister: "S'enregistrer",
    // Messages de validation — absents du Laravel, qui valide côté serveur.
    // Le front valide avant l'envoi, donc ces textes-là sont nouveaux.
    errorEmailRequired: "Renseigne ton adresse e-mail.",
    errorEmailInvalid: "Cette adresse e-mail n'est pas valide.",
    errorPasswordRequired: "Renseigne ton mot de passe.",
    errorCredentials: "E-mail ou mot de passe incorrect.",
  },
  en: {
    titleLogin: "Login",
    descriptionLogin: "Welcome to Barbofus !",
    inputEmail: "Email",
    inputPassword: "Password",
    inputRememberMe: "Remember me",
    buttonLogin: "Log in",
    buttonForgotPassword: "Forgot password ?",
    descriptionNoAccount: "No account yet ?",
    buttonRegister: "Register",
    errorEmailRequired: "Please enter your email address.",
    errorEmailInvalid: "This email address is not valid.",
    errorPasswordRequired: "Please enter your password.",
    errorCredentials: "Incorrect email or password.",
  },
  es: {
    titleLogin: "Iniciar sesión",
    descriptionLogin: "¡Bienvenido a Barbofus!",
    inputEmail: "Email",
    inputPassword: "Contraseña",
    inputRememberMe: "Recuérdame",
    buttonLogin: "Iniciar sesión",
    buttonForgotPassword: "¿Olvidaste tu contraseña?",
    descriptionNoAccount: "¿Aún no tienes cuenta?",
    buttonRegister: "Regístraste",
    errorEmailRequired: "Introduce tu dirección de email.",
    errorEmailInvalid: "Esta dirección de email no es válida.",
    errorPasswordRequired: "Introduce tu contraseña.",
    errorCredentials: "Email o contraseña incorrectos.",
  },
  pt: {
    titleLogin: "Login",
    descriptionLogin: "Boas vindas ao Barbofus !",
    inputEmail: "E-mail",
    inputPassword: "Senha",
    inputRememberMe: "Manter-me conectado",
    buttonLogin: "Log in",
    buttonForgotPassword: "Esqueceu sua senha ?",
    descriptionNoAccount: "Ainda não tem uma conta ?",
    buttonRegister: "Registrar-se",
    errorEmailRequired: "Informe seu endereço de e-mail.",
    errorEmailInvalid: "Este endereço de e-mail não é válido.",
    errorPasswordRequired: "Informe sua senha.",
    errorCredentials: "E-mail ou senha incorretos.",
  },
} satisfies Record<Locale, Record<string, string>>;

/** Récupère le dictionnaire d'une langue, avec repli sur le français. */
export function getMessages(locale: Locale = defaultLocale): Messages {
  return messages[locale] ?? messages[defaultLocale];
}
