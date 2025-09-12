FROM node:12 as build

WORKDIR /app

RUN git config --global url."https://".insteadOf git://

# Copy all app code
COPY . .

# Optional debug
RUN ls -la /app && cat /app/package.json

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Production image
FROM nginx:alpine

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
