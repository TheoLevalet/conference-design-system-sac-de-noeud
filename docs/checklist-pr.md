# Checklist : ce composant entre-t-il dans le design system ?

> À copier dans `.github/pull_request_template.md` (ou l'équivalent GitLab / Azure DevOps) du dépôt de votre design system.

**La règle : ce qui entre est générique, stable et partagé.** Le reste vit ailleurs, et ce n'est pas un échec.

## ① Est-ce que ça a sa place ?

Un « non » ici : le composant reste dans une **lib métier partagée** (recipe) ou dans la **feature** (snowflake).

- [ ] **0. Introuvable dans le catalogue ?** J'ai cherché dans Storybook : rien d'équivalent, ni d'extensible par composition.
- [ ] **1. Zéro vocabulaire métier ?** Aucun nom, input ou texte qui parle d'un domaine (événement, contrat, client…).
- [ ] **2. Au moins 3 usages réels, dans plusieurs produits ?** Liens vers les usages :
- [ ] **3. Une API petite et stable ?** Je peux décrire ses inputs en une phrase, et je ne prévois pas de les changer.

## ② Est-ce que c'est prêt ?

Un « non » ici veut dire « pas encore », pas « jamais ».

- [ ] **4. Uniquement des tokens sémantiques ?** Aucune valeur brute (couleur, espacement, rayon) en dur.
- [ ] **5. Composition plutôt que configuration ?** Les variations passent par des slots (`ng-content`, `children`…), pas par des booléens.
- [ ] **6. Une story par état, et l'accessibilité testée ?** Défaut, chargement, désactivé, erreur… et 0 violation a11y.
- [ ] **7. Un propriétaire nommé ?** @…

## Où va le composant sinon ?

| Destination | Pour quoi | Exemples |
| --- | --- | --- |
| 🏛️ Design system | générique, stable, partagé | `Button`, `Card`, `TextField` |
| 🍳 Recipe (lib de domaine) | composition partagée d'un domaine | `EventCard`, `AddressField` |
| ❄️ Snowflake (feature) | usage unique | le bandeau de Noël |

Une recipe peut être promue dans le design system le jour où elle devient vraiment générique, sans se presser.

## Sources

- Brad Frost, *Atomic Design*, et *Design system components, recipes, and snowflakes*
- Alla Kholmatova, *Design Systems*
- Design Tokens Community Group, *Design Tokens Format Module* 2025.10
- Sandi Metz, *The Wrong Abstraction*
