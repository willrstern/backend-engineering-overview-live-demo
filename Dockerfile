# Start off with a Linux "virtual machine" a.k.a. Docker image
# that already has node.js installed
FROM node:10.16.0

# Make a directory in this image/virtual-machine called /app
RUN mkdir /app
# Commands now happen in that directory
WORKDIR /app

# Add package.json from my project into the image
ADD package.json package.json
ADD package-lock.json package-lock.json
# Run NPM install on the image
RUN npm install --production -q

# now add source code into the image
ADD . /app

# when the image runs, this is the command it should run "node app"
# (a running image is called a container)
CMD ["node", "app"]


# What do devs use this file for??
# If Docker is installed on your machine, you can run these commands:
#   "docker build -t my-user/my-image:2.0.1 ." => build a Docker image for your project
#   "docker login" => login to Docker hub (if you already have an account)
#   "docker push my-user/my-image:2.0.1" to push the image to Docker hub
# Now you have an image in the cloud!  And you have a few options:
#   - tell AWS Elastic Container Service "run 5 copies of this image"
#   - login to a server(s) you control
#     • install docker, then "docker login"
#     • "docker run my-user/my-image:2.0.1" => run the app on the server!