import type { Metadata } from "next";

import { alternatesPour } from "@/lib/seo";
import type { Locale } from "@/messages";

// Cette page n'existe qu'en français : c'est un document juridique, et
// l'original (resources/views/mentions-legales.blade.php) n'a lui-même
// jamais été traduit. Le texte est donc en dur ci-dessous plutôt que passé
// par src/messages, et il ne faut PAS y ajouter de clés de traduction tant
// que la version française n'a pas, elle, été officiellement traduite en
// amont (c'est un choix éditorial/juridique, pas un oubli technique).

export const metadata: Metadata = {
  title: "Mentions légales",
  ...alternatesPour("/mentions-legales"),
};

/** Style commun aux liens dorés du corps de texte. */
const LIEN = "text-gold-text hover:text-gold-text-lit underline transition-colors";

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  // Le paramètre n'est pas utilisé (page monolingue), mais on l'attend tout
  // de même : Next 16 fournit `params` comme une promesse sur toutes les
  // pages de `[locale]`, et il faut la consommer pour rester cohérent avec
  // le reste du routage.
  await params;

  return (
    <main className="w-full flex-1">
      <h1 className="mt-10 text-center text-[min(4rem,15vw)] font-normal uppercase">
        Mentions légales
      </h1>

      <section className="text-md mx-auto my-16 w-[calc(100%-1rem)] max-w-3xl space-y-6 font-light text-ivory min-[800px]:text-lg">
        <h2 className="font-display pt-4 text-3xl text-gold-text">Informations légales</h2>

        <p>
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={LIEN}
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className={LIEN}
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>

        <p>
          En conformité aux directives de l&apos;article 6-III et 19 de la Loi numero 2004-575 du 21
          juin 2004 pour la Confiance en l&apos;économie numérique, dite L.C.E.N., nous portons à la
          connaissance des utilisateurs du site internet :{" "}
          <a href="https://barbofus.com" target="_blank" rel="noopener noreferrer" className={LIEN}>
            barbofus.com
          </a>{" "}
          les informations ci-jointes :
        </p>

        <h3 className="font-display pt-4 text-xl text-ivory min-[800px]:text-2xl">
          1. Données légales :
        </h3>

        <p>
          Le site internet{" "}
          <a href="https://barbofus.com" target="_blank" rel="noopener noreferrer" className={LIEN}>
            barbofus.com
          </a>{" "}
          est l&apos;unique propriété de <strong>EI</strong> <strong>Mathieu LEHR</strong>, qui le
          fournit.
        </p>

        <p>
          <strong>EI</strong> <strong>Mathieu LEHR</strong>
        </p>

        <p>
          <strong>54134 Voinemont</strong>
          <br />
          Référencée au Registre du Commerce et des Sociétés au numéro{" "}
          <strong>90520214900019</strong>
        </p>

        <p>
          Numéro de TVA Intracommunautaire : <strong>FR85905202149</strong>
          <br />
          Adresse mail :{" "}
          <strong>
            <a
              href="mailto:mathieu.lehr@gmail.com?subject=Contact a partir des mentions légales via le site barbofus.com"
              className={LIEN}
            >
              mathieu.lehr@gmail.com
            </a>
          </strong>
          <br />
          <br />
          Le Créateur du site internet est : <strong>Charly Mollard</strong>
          <br />
          Le Décideur de la publication est : <strong>Mathieu LEHR</strong>
          <br />
          Par quel moyen joindre le Directeur de publication :{" "}
          <strong>
            <a
              href="mailto:mathieu.lehr@gmail.com?subject=Contact a partir des mentions légales via le site barbofus.com"
              className={LIEN}
            >
              mathieu.lehr@gmail.com
            </a>
          </strong>
        </p>

        <p>
          Le Réalisateur est : <strong>Charly Mollard</strong>
          <br />
          Où entrer en contact avec le Concepteur :{" "}
          <strong>
            <a
              href="mailto:charly.mollard@gmail.com?subject=Contact a partir des mentions légales via le site barbofus.com"
              className={LIEN}
            >
              charly.mollard@gmail.com
            </a>
          </strong>
          <br />
          <br />
          Entreprise qui assure l&apos;hébergement : O2Switch
          <br />
          SASU
          <br />
          Registre du commerce et des sociétés (RCS) Clermont-Ferrand B 510909807
          <br />
          Code d&apos;Activité principale exercée (APE) 6311Z
          <br />
          Num. de TVA : FR 35 510 909 807
          <br />
          Siège Sociale de l&apos;hébergeur : 222-224 Boulevard Gustave Flaubert - 63000
          Clermont-Ferrand - France
          <br />
          <br />
          Les mentions ont été générées via{" "}
          <strong>
            <a
              href="https://www.generateur-de-mentions-legales.com"
              target="_blank"
              rel="noopener noreferrer"
              className={LIEN}
            >
              ce site
            </a>
          </strong>
        </p>

        <h3 className="font-display pt-4 text-xl text-ivory min-[800px]:text-2xl">
          2. Introduction :
        </h3>

        <p>
          Tout internaute se connectant et utilisant le site suivant :{" "}
          <a href="https://barbofus.com" target="_blank" rel="noopener noreferrer" className={LIEN}>
            barbofus.com
          </a>{" "}
          est considéré comme utilisateur du site internet.
          <br />
          Le site web <strong>barbofus.com</strong> réunit un ensemble de services, en l&apos;état,
          mis à la disposition des utilisateurs. Il est ici précisé que ces derniers doivent rester
          honnêtes et faire preuve de bonne foi tant envers les différents utilisateurs
          qu&apos;envers le Webmaster du site barbofus.com. Le site barbofus.com est actualisé de
          façon régulière par Charly Mollard.
          <br />
          Charly Mollard s&apos;efforce d&apos;indiquer sur le site suivant barbofus.com des
          informations les plus claires possibles (sous réserve de modifications apportées depuis
          leur mise en ligne), mais ne peuvent attester l&apos;exactitude, l&apos;exhaustivité et
          les informations transmises sur son site, qu&apos;elles soient ou non de son fait. En
          conséquence, l&apos;utilisateur reconnaît utiliser ces informations fournies sous son
          unique responsabilité.
        </p>

        <h3 className="font-display pt-4 text-xl text-ivory min-[800px]:text-2xl">
          3. Accessibilité :
        </h3>

        <p>
          Le site barbofus.com est par principe accessible aux utilisateurs 24/24h, 7/7j, sauf en
          cas de maintenance, programmée ou pas, pour les besoins de sa maintenance ou cas de force
          majeure. En cas d&apos;impossibilité d&apos;accès au service, barbofus.com s&apos;engage à
          faire son maximum pour rétablir l&apos;accès au site internet et tentera alors de
          communiquer au préalable aux utilisateurs informations de l&apos;intervention.
          N&apos;étant subordonné qu&apos;à une obligation de moyen, barbofus.com ne pourrait être
          tenu comme responsable de tout dommage, peu importe la nature.
        </p>

        <h3 className="font-display pt-4 text-xl text-ivory min-[800px]:text-2xl">
          4. Propriété intellectuelle :
        </h3>

        <p>
          Mathieu LEHR est le propriétaire exclusif de l&apos;intégralité des droits de propriété
          intellectuelle ou détient les droits et autorisations d&apos;usage sur tous les éléments
          accessibles sur le site web, tant structurellement que sur les articles et textes, images,
          graphismes, icônes, sons, logiciels…
          <br />
          Toute reproduction totale ou partielle du site suivant barbofus.com, représentation,
          edition, adaptation totalement ou partiellement de l&apos;un de ces éléments, quel que
          soit le moyen ou le procédé utilisé, est strictement interdite, excepté acceptation écrite
          préalable de Mathieu LEHR, propriétaire du site internet à l&apos;email :
          mathieu.lehr@gmail.com, à défaut, elle sera considérée comme constitutive d&apos;une
          contrefaçon et passible de poursuite conformément aux dispositions des articles L.335-2 et
          suivants du Code de Propriété Intellectuelle.
        </p>

        <p>
          Toute reproduction totale ou partielle de l&apos;affichage, edition, adaptation totalement
          ou partiellement de l&apos;un de ces éléments, peu importe le moyen ou le procédé utilisé,
          est interdite, sauf autorisation écrite préalable de Mathieu LEHR, responsable du site
          suivant à cette adresse : mathieu.lehr@gmail.com, à contrario elle sera considérée comme
          constitutive d&apos;une contrefaçon étant passible de poursuite d&apos;après les
          dispositions des différents articles L.335-2 et suivants du Code de Propriété
          Intellectuelle.
        </p>

        <p>
          Bon nombre d&apos;images présente sur le site barbofus.com sont la propriété d&apos;Ankama
          Games et Dofus.
        </p>

        <h3 className="font-display pt-4 text-xl text-ivory min-[800px]:text-2xl">
          5. Cookies &amp; Liens Hypertextes :
        </h3>

        <p>
          Le site barbofus.com contient différents liens hypertextes vers différents sites
          (partenariats, sites sources .) mis en ligne suite à l&apos;autorisation de Charly
          Mollard. Cependant, Charly Mollard n&apos;a pas la possibilité de sécuriser
          l&apos;intégralité des élements des sites visités et décline donc toute responsabilité de
          ce fait quand aux risques de contenus illicites.
          <br />
          L&apos;utilisateur est donc avisé que au cours de ses visites sur le site barbofus.com, un
          ou des cookies peuvent s&apos;intégrer automatiquement sur son pc grâce à son logiciel
          informatique de navigation. Un cookie est un bloc de données qui ne permet pas de savoir
          qui l&apos;utilise, néanmoins qui note des indications en lien avec la navigation de
          l&apos;utilisateur sur le site.
          <br />
          La configuration du logiciel de navigation laisse libre de notifier de la présence de
          cookie et éventuellement, de la refuser de la procédure expliquée à l&apos; adresse :{" "}
          <a
            href="https://www.barbofus.com"
            target="_blank"
            rel="noopener noreferrer"
            className={LIEN}
          >
            www.barbofus.com
          </a>
          . La mise en place à la possibilité néanmoins de paramétrer le navigateur de son pc pour
          contester l&apos;installation des cookies, en sachant que le rebut d&apos;installation
          d&apos;un cookie pourrait potentiellement entraîner l&apos;impossibilité d&apos;accéder à
          plusieurs secteurs. Pour tout blocage de cookies, cherchez dans un moteur de recherche :
          blocage des cookies et suivez les enseignements en fonction de votre navigateur.
        </p>

        <h3 className="font-display pt-4 text-xl text-ivory min-[800px]:text-2xl">
          6. Protection des personnes &amp; biens - Utilisation des données personnelles :
        </h3>

        <p>
          En France, les données personnelles sont par exemple protégées par la loi n° 78-87 du 6
          janvier 1978 et la loi n° 2004-801 datant du 6 août 2004, l&apos;article L. 226-13 du Code
          pénal ainsi que la Directive Européenne du 24 octobre 1995.
        </p>

        <p>
          Sur le site internet barbofus.com, Charly Mollard ne collecte pas d&apos;informations
          personnelles (suivant l&apos;article 4 loi n°78-17 du 06 janvier 1978) relatives à
          l&apos;utilisateur que pour la nécessité de différents services mis à disposition par le
          site suivant barbofus.com. L&apos;utilisateur offre les données en toute conscience de
          cause, notamment lorsqu&apos;il procède de lui-même à leur saisie. Il est donc résumé à
          l&apos;usagé du site interne barbofus.com l&apos;obligation ou pas de mentionner ces
          informations.
          <br />
          Conformément aux agencements des articles 38 et autres de la loi 78-17 du 6 janvier 1978
          relative à l&apos;informatique, les fichiers et aux différentes libertés, tout utilisateur
          possède un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux
          informations personnelles le concernant. Pour l&apos;exercer, adressez une requête à
          barbofus.com par email :{" "}
          <strong>
            <a
              href="mailto:charly.mollard@gmail.com?subject=Contact à partir des mentions légales via le site barbofus.com"
              className={LIEN}
            >
              charly.mollard@gmail.com
            </a>
          </strong>{" "}
          ou via lettre manuscrite dûement signée, accompagnée d&apos;une copie du titre
          d&apos;identité avec signature du propriétaire du document, en précisant l&apos;adresse à
          laquelle une réponse doit être envoyée.
        </p>

        <p>
          Sans information personnelle de l&apos;utilisateur du site internet barbofus.com ne sera
          publiée sans consentement de l&apos;utilisateur, échangée, transférée, cédée sur
          n&apos;importe quel support à des groupes. Seulement l&apos;hypothèse de vente du site
          interne barbofus.com et de l&apos;intégralité de ses droits autorise Charly Mollard à
          céder les dites informations personnelles à l&apos;éventuel acquéreur qui serait donc à
          son tour tenu à la même obligation de conservation et de modification des données
          concernant l&apos;utilisateur du site barbofus.com.
        </p>

        <p>
          Les bases de données sont sécurisées par les obligations de la loi du 1er juillet 1998
          transposant la directive 96/9 du 11 mars 1996 concernant la protection juridique des bases
          de données.
        </p>
      </section>
    </main>
  );
}
