# Block Test

### Server Requirements
In server you will need to make sure your server meets the following requirements:

* Node >= 6.7.0

### Installation

Clone this Repository and run following commands.

Install the dependencies and devDependencies and start the server.

```sh
$ cd to 'project/path'
$ npm install
```
 
I used `nodemon` to run in my local.

### Edit Config file

The next thing you should do after installing Express is set your `secret` key to a random string.

In config file there are several environtments like 'development' and 'production'. The environment should depends on environment variable `NODE_ENV`. Depends on that variable, this project will run.
```
root: rootPath,
app: {
    name: 'auction'
},   
secret: 'ilovenodeexpress',
```
### Directory Permissions

After installing, you may need to configure some permissions. Directories within the `public/images` directory should be writable by your web server if we need to upload something. In this project there are no uploading yet but we can easily enhance.


### Routers
It can be found under `routes` folder

 

