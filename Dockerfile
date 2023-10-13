FROM node:18-alpine

# Create app directory
WORKDIR /app

# Bundle files
COPY . .

# Update npm 
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Start app
CMD source migrate-and-start.sh