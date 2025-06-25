# Lancement du projet

Pour lancer le projet, il est conseillé de suivre ces étapes :

1 - cloner le repo sur votre pc  
2 - ouvrir le dossier backend dans IntelliJ  
3 - ouvrir le dossier frontend dans Webstorm  

Une fois les dossiers ouvert, vous devez :

1 - Dans le backend sur intellij, vous devez simplement exécuter dans le terminal
   ```bash
   docker compose up -d
   ```
2 - Ensuite, vous devez lancer BackendApplication se trouvant dans
   ```bash
   backend/src/main/java/.com.dorian.rh.backend
   ```
   s'il ne propose pas de le lancer automatiquement
3 - Une fois Spring lancé, le backend sera prêt à être utilisé  
4 - Dans le frontend sur Webstorm, vous devez simplement faire un
   ```bash
   npm install
   ```
   et ensuite faire un
   ```bash
   npm start
   ```
et le front se lancera  
