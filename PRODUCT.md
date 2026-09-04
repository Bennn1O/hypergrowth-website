# HyperGrowth

## Produit

Le site présente l’offre HyperGrowth et héberge des parcours opérationnels utilisés par les prospects et les clients.

## Questionnaire d’immersion

- Utilisateurs : dirigeants et équipes dont une immersion HyperGrowth est planifiée.
- Objectif : recueillir les informations de préparation utiles aux Operating Partners avant les deux jours d’immersion.
- Entrée : lien privé contenant les identifiants Cockpit de la mission et du client.
- Sortie : réponses, métadonnées du deck facultatif, horodatage et source `immersion_questionnaire`, transmis au workflow n8n.
- Succès : le répondant reçoit une confirmation claire, un document Markdown interne est créé sur le client Cockpit et une activité contenant son lien est ajoutée à la mission.

## Contraintes du parcours

- La page n’est ni indexée ni ajoutée à la navigation ou au sitemap.
- Les identifiants Cockpit sont retirés de l’adresse dès l’ouverture du formulaire et conservés dans un cookie HttpOnly pendant sept jours.
- Le suivi d’audience et la bannière associée ne sont pas montés sur cette page privée.
- La cible Cockpit est échangée contre un cookie HttpOnly, puis retirée de l’adresse avant l’affichage du formulaire.
- Les réponses restent confidentielles.
- Le formulaire conserve les réponses textuelles dans la session de l’onglet, mais jamais le fichier joint.
- L’absence de cible Cockpit ou de configuration serveur empêche l’envoi avec un message explicite.

## Intégration n8n vers Cockpit

Le workflow `HyperGrowth · Questionnaire immersion · Cockpit` reçoit le formulaire, vérifie que la mission appartient au client, transforme les réponses en Markdown, crée un document interne non publié dans Cockpit, puis journalise le lien du document dans les activités de la mission.

Le binaire du deck ne peut pas être archivé par l’API Cockpit actuelle. Son nom, sa taille et son type sont ajoutés au document. Une destination de fichiers devra être définie avant de considérer cette pièce jointe comme persistée.

## Contrat d’intégration v1

### Lien client

Le lien distribué depuis Cockpit suit le format :

```text
https://www.hypergrowth.fr/questionnaire-immersion?t=<mission-id>.<client-id>
```

La première partie est l’identifiant UUID de la mission Cockpit. La seconde est l’identifiant UUID du client Cockpit. À l’ouverture, `POST /api/immersion-session` échange cette cible contre le cookie HttpOnly `hg_immersion_session`, puis l’adresse est remplacée par `/questionnaire-immersion`. Le suivi d’audience est désactivé sur toute cette route. Le workflow vérifie ensuite via l’API Cockpit que la mission figure bien parmi les missions actives du client avant toute écriture.

### Requête du site

`POST /api/immersion-questionnaire` reçoit un corps `multipart/form-data` :

- cookie `hg_immersion_session` : cible Cockpit, inaccessible au JavaScript
- `payload` : JSON contenant `submissionId` et `answers`
- `deck` : fichier facultatif PDF, PowerPoint ou Keynote, limité à 10 Mo

Le serveur transmet au webhook défini par `IMMERSION_QUESTIONNAIRE_WEBHOOK_URL` un nouveau corps `multipart/form-data`. La requête interservices porte `Authorization: Bearer <IMMERSION_QUESTIONNAIRE_WEBHOOK_SECRET>`.

- `payload` : JSON normalisé selon l’exemple ci-dessous
- `deck` : binaire facultatif

```json
{
  "accessToken": "<mission-id>.<client-id>",
  "submissionId": "123e4567-e89b-42d3-a456-426614174000",
  "event": "immersion_questionnaire.completed",
  "formsSource": "immersion_questionnaire",
  "form": {
    "id": "HADRQfDW",
    "name": "Immersion - Questionnaire Hypergrowth",
    "source": "immersion_questionnaire",
    "version": 1
  },
  "answers": [
    {
      "fieldId": "Vot3Wy4LavQZ",
      "fieldRef": "944fee07-ccc0-4728-9b02-4046a8684842",
      "question": "Si tu devais décrire ton entreprise en une phrase à quelqu'un qui ne connaît pas ton secteur ?",
      "type": "short_text",
      "value": "Réponse",
      "label": "Réponse"
    }
  ],
  "deck": null,
  "submittedAt": "2026-09-04T12:00:00.000Z"
}
```

`formsSource` est le nom de transport aligné avec les formulaires existants. L’adaptateur CRM écrit la valeur dans le champ persistant `forms_source`.

Les réponses non renseignées sont omises. Pour un choix, `value` conserve la référence Typeform et `label` contient le libellé lisible. Les `fieldRef` restent stables pour une même version. Toute modification de question ou de sémantique impose d’incrémenter `form.version`.

### Traitement dans Cockpit

1. Valider le format de la cible et l’événement reçu.
2. Vérifier le client et son rattachement à la mission via `get_client`.
3. Produire le document Markdown avec toutes les réponses renseignées et les métadonnées disponibles.
4. Créer le document interne avec `create_document`.
5. Ajouter une note à la mission avec `log_activity` et le lien renvoyé par Cockpit.
6. Renvoyer un statut HTTP 2xx uniquement après ces deux écritures.

Une cible inconnue, une incohérence client-mission ou une erreur Cockpit fait échouer le workflow. Le site présente alors l’échec comme une erreur temporaire et permet de renvoyer la même soumission.
