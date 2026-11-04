# Checklist : ce composant entre-t-il dans le design system ?

> À copier dans `.github/pull_request_template.md` (ou l'équivalent GitLab / Azure DevOps) du dépôt de votre design system.

**La règle : ce qui entre est générique, stable et partagé.** Le reste vit ailleurs, et ce n'est pas un échec : c'est une autre adresse.

Ces questions sont des repères pour décider ensemble, pas des seuils imposés. Adaptez-les à votre équipe.

## Générique : sert-il sans connaître le métier ?

Un « non » ici : le composant est une **recipe** (lib de domaine) ou un **snowflake** (application).

- [ ] **G1. Aucun vocabulaire métier ?** Aucun nom, input ou texte qui parle d'un domaine (événement, contrat, client…).
- [ ] **G2. Composition plutôt que configuration ?** Les variations passent par des slots (`ng-content`, `children`…), pas par des booléens.
- [ ] **G3. Uniquement des tokens sémantiques ?** Aucune valeur brute (couleur, espacement, rayon) en dur.

## Stable : peut-on s'appuyer dessus dans la durée ?

Un « non » ici veut dire « pas encore », pas « jamais ».

- [ ] **S1. Une API petite ?** Je peux décrire ses inputs en une phrase, sans options pour des cas hypothétiques.
- [ ] **S2. Des états visibles et l'accessibilité vérifiée ?** Une story par état utile (défaut, chargement, désactivé, erreur…). Contrôle automatique s'il est configuré, et vérification au clavier, du focus et au lecteur d'écran.
- [ ] **S3. Quelqu'un le maintient ?** Personne ou équipe : @…
- [ ] **S4. Des changements cassants maîtrisés ?** Ils sont annoncés, et les anciennes versions sont dépréciées puis migrées progressivement.

## Partagé : en a-t-on vraiment besoin à plusieurs ?

Un « non » ici : on attend. Le composant reste où il est jusqu'à ce que le besoin se confirme.

- [ ] **P1. Introuvable dans le catalogue ?** J'ai cherché dans Storybook : rien d'équivalent, ni d'extensible par composition.
- [ ] **P2. Un besoin réel dans plusieurs produits ?** Liens vers les usages :

## Où va le composant sinon ?

| Contexte | Pour quoi | Où vit le code | Exemples |
| --- | --- | --- | --- |
| Design system component | générique, stable, partagé | `libs/ui` (fondations : `libs/tokens`) | `Button`, `Card`, `SearchField` |
| Recipe | composition partagée d'un domaine | lib de domaine (`libs/events`) | `EventCard`, `AddressField` |
| Snowflake | usage unique | l'application (`apps/web`) | le bandeau ponctuel |

Le niveau Atomic Design (atome, molécule, organisme…) dit de quoi un composant est fait, pas où il vit. `Card` et `EventCard` sont toutes deux des organismes, mais n'ont pas la même adresse.

Une recipe peut être promue dans le design system le jour où elle devient vraiment générique et partagée, sans se presser.

## Sources

- Brad Frost, *Atomic Design*, et *Design system components, recipes, and snowflakes*
- Alla Kholmatova, *Design Systems*
- Design Tokens Community Group, *Design Tokens Format Module* 2025.10
- Sandi Metz, *The Wrong Abstraction*

La règle et ces questions sont notre proposition, inspirée de ces sources.
