# Use an official Node.js runtime as a parent image
FROM node:23-alpine3.20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build



ENV PORT=8000
# Start the application
CMD ["npm", "run", "start"]