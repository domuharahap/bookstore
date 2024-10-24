# Use Node.js official image
FROM node:20.9.0

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
