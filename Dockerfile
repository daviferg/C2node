# select your base image to start with
FROM daviferg/c1nodejs:latest

# Create app directory
# this is the location where you will be inside the container
#WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers
#COPY package*.json ./

# RUN npm install
RUN npm install --save-dev nodemon
# If you are building your code for production
# RUN npm ci --only=production
# RUN npm install --save-dev nodemon

# Bundle app source
#COPY . .

# Make this port accessible from outside the contaiexner
# Necessary for your browser to send HTTP requests to your Node app
#EXPOSE 8080

# Command to run when the container is ready
# Separate arguments as separate values in the array
CMD [ "npm", "run", "start"]
