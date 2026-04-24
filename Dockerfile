# Use Node.js as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock* package-lock.json* bun.lockb* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "preview", "--host", "--port", "3000"]

