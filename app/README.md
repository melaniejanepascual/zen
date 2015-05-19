Setup
-----

The Zen prototype app uses node.js and sass.

Note for Windows users:
Windows 7+ users should use PowerShell which comes pre-installed.

1. Install node.js from [nodejs.org](https://nodejs.org/).
2. Install sass by following the directions [here](http://sass-lang.com/install).
3. cd to the zen/app directory
4. sudo npm install (note: Windows doesn't have a sudo equivalent, but you can run PowerShell as administrator)
5. gulp
6. Open a browser to http://localhost:8080


Build tools
-----------
We use gulp as our build tool. You can create new tasks by editing gulpfile.js.

NOTE: We previously used npm as our build tool instead of grunt or gulp, which just call the command line anyway.
However, Unix commands do not map well to Windows PowerShell commands, so we use gulp to streamline this process.
A good discussion of this can be found [here](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/).

Resources
---------
- [Using NPM as a build tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
- [Node authentication](https://scotch.io/tutorials/easy-node-authentication-setup-and-local)
