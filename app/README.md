Setup
-----

The Zen prototype app uses node.js and sass.

Note for Windows users:
It will probably be helpful to install a command line tool such as [cygwin](https://cygwin.com).
Also see [this note](http://stackoverflow.com/questions/4090301/root-user-sudo-equivalent-in-cygwin) about running commands as root in Windows.

1. Install node.js from [nodejs.org](https://nodejs.org/).
2. Install sass by following the directions [here](http://sass-lang.com/install).
3. cd to the zen/app directory
4. sudo npm install
5. sudo nodemon server.js
6. Open a browser to http://localhost:8080


Build tools
-----------
We use npm as our build tool instead of grunt or gulp, which just call the command line anyway.
A good discussion of this can be found [here](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/).

All tasks are in package.json.
Example usage: npm run serve

You can use the pre- and post- prefixes to schedule tasks that go before and after others.
Example: "prebuild:css": "npm run clean"


Resources
---------
[Node authentication](https://scotch.io/tutorials/easy-node-authentication-setup-and-local)