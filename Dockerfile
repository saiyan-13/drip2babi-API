# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define the command to run your app using CMD which keeps the container running
CMD [ "npm", "start" ]
