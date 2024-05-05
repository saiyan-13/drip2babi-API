# Utiliser une version spécifique de Node.js pour éviter les problèmes de compatibilité
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 8000
