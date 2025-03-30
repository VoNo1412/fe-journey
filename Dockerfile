# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Remove package-lock.json and node_modules to avoid dependency issues
RUN rm -rf node_modules package-lock.json

# Install dependencies with legacy peer dependencies handling
RUN npm install --legacy-peer-deps

# Copy the rest of the app files
COPY . .

# Build the React app
RUN npm run build

# Use nginx to serve static files
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose frontend port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
