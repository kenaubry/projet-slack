# Mini-Slack

## Front-end

Lancer `npm install` pour installer les dependances.

Puis lancer `ng serve` pour lancer le serveur de développement. 

Si ce probleme au lancement de ng serve :

```
PS C:\Users\ib\Desktop\Angular\projet-slack-css> ng serve  
ng : Impossible de charger le fichier 
numériquement. Vous ne pouvez pas exécuter ce script sur   
le système actuel. Pour plus d’informations sur 
l’exécution de scripts et la définition de stratégies      
d’exécution, voir la rubrique about_Execution_Policies à   
l’adresse https://go.microsoft.com/fwlink/?LinkID=135170.  
Au caractère Ligne:1 : 1
+ ng serve
+ ~~
    + CategoryInfo          : Erreur de sécurité: (:) []   
  , PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

Tapez cette commande dans PowerShell : `Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force` puis refaites `ng serve`

Naviguez sur `http://localhost:4200/`. 

L'application rafraichira automatiquement en cas de modifications sur les fichiers.

## Back-end

Lancer `npm install -g json-server` pour installer les dependances.

Lancer 'json-server --watch db.json' pour lancer le serveur backend. 

Naviguez sur `http://localhost:3000/`. 

### Fonctionnalités/modifs

- Ajout de la possibilité de supprimer un message
- Ajout de la possibilité de créer un thread
- CSS plus propre

### A ajouter

- Supprimer un thread
