# Utiliser une version spécifique de Node.js pour éviter les problèmes de compatibilité
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json, puis installer les dépendances
COPY package*.json./
RUN npm install

# Copier le reste du code source de l'application
COPY..

# Exposer le port via une variable d'environnement pour plus de flexibilité
ENV PORT=8000
EXPOSE $PORT

# Définir la commande pour démarrer l'application
CMD [ "npm", "start" ]
