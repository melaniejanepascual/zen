The Zen prototype app uses node.js

1. Install node.js from [nodejs.org](https://nodejs.org/).
2. cd to the zen/app directory
3. sudo npm install
4. sudo nodemon server.js
5. Open a browser to http://localhost:8080


Build tools
-----------
We use npm as our build tool instead of grunt or gulp, which just call the command line anyway.
A good discussion of this can be found [here](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/).

All tasks are in package.json.
Example usage: npm run serve

You can use the pre- and post- prefixes to schedule tasks that go before and after others.
Example: "prebuild:css": "npm run clean"