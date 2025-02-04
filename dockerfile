# Use Node.js 20.13.1 as the base image
FROM node:20.13.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
