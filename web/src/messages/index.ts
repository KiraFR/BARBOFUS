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
    descriptionRegister2:
      "Warning! The verification email may end up in your spam/junk folder.",
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
