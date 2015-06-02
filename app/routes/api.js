/*
*    We want the API to return data in different formats
*    based on the accept header of the request.
*
*    For example, we expect to return JSON for AJAX
*    GET requests and HTML otherwise.
*
*    A request to /user?name=bob with accept='application/json' header returns:
*       { id: 123,
*         username: 'bob',
*         photoUrl: 'cdn.zen.com/1234.jpg',
*         friends: { ... },
*         posts: { ... }
*       }
*
*    A request to /user?name=bob with accept='text/html' header returns:
*       <html>
*       <body>
*           <header />
*           <div class="profile">
*               <h1>bob</h1>
*               <img src="cdn.zen.com/1234.jpg" />
*               <div class="friends"> ... </div>
*               <div class="posts"> ... </div>
*           </div>
*       </body>
*       </html>
*
*/

module.exports = function(app, passport, url) {

    // =====================================
    // Temporary fake data, until the db is made
    // also serves as the allowed data types
    // =====================================
    var fakeData = {
        // =====================================
        // User
        // @param username
        // returns username and some stuff, TBD
        // =====================================
        user: {
            id: 123,
            username: 'bob',
            photoUrl: '//lorempixel.com/300/300/',
            zenlevel: 85
        },
        // =====================================
        // Tasks
        // @param user_id
        // returns an array of tasks
        // =====================================
        tasks: [
        {
            id: 456,
            user_id: 123,
            title: 'Be Awesome',
            type: 'task',
            datetime: '2015-05-01 00:00:00 PDT',
            location: 'the schoolyard',
            notes: 'I like puppies'
        },
        {
            id: 789,
            user_id: 123,
            title: 'Take a nap',
            type: 'task',
            datetime: '2015-05-01 12:00:00 PDT',
            location: 'my bed',
            notes: 'I like pillows'
        }],
        // =====================================
        // Quote
        // returns a random quote
        // (this is an internal API only -
        // using AJAX to get the quote is overkill)
        // =====================================
        quote: {
            text: "If you ain't first, yer last.",
            author: 'Reese Bobby, Talledega Nights'
        }
    };

    // =====================================
    // Data retrieval, query the DB
    // =====================================
    var getData = function(req, dataType, id) {
        var pathname = url.parse(req.url).pathname.split('/'),
            dataType = dataType || pathname.length && pathname[1], // only the first part of path, no deep nesting yet
            id       = id || pathname.length && pathname[2],
            response = {};

        response.title = dataType; // TODO map dataType to a nicely formatted title
        response.user  = fakeData.user; // always need the user; TODO get userID and other basic info from the session cookie

        // hacky
        if (dataType == 'task') { response.task = getTask(id); }

        if (dataType in fakeData && fakeData.hasOwnProperty(dataType)) {
            // TODO, actually query the DB with parameters and return asynchronously
            response[dataType] = fakeData[dataType];
        }

        return JSON.stringify(response);
    };

    var getTask = function(id) {
        for (var i = 0; i < fakeData.tasks.length; i++) {
            if (fakeData.tasks[i].id == id) { return fakeData.tasks[i]; }
        }
    }

    // =====================================
    // Data update
    // =====================================
    var postData = function(req) {
        var pathname = url.parse(req.url).pathname.split('/'),
            dataType = dataType || pathname.length && pathname[1]; // only the first part of path, no deep nesting yet

        // hacky
        dataName = dataType + 's';

        if (dataName in fakeData && fakeData.hasOwnProperty(dataName)) {
            // TODO, actually query the DB with parameters and return asynchronously
            var data = fakeData[dataName]; //should be an array
            var id   = getNextId(data);

            var newItem = { id: id };
            for (key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    newItem[key] = req.body[key];
                }
            }
            data.push(newItem);
        }
        return newItem;
    }

    var getNextId = function(arr) {
        var id = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id > id) { id = arr[i].id; }
        }
        id++;
        return id;
    }

    // =====================================
    // return a function that responds with
    // JSON or HTML depending on the request
    // =====================================
    var responseFormatter = function(templatePath, options) {
        options = options || {};
        return function(req, res) {
            // TODO: make this async, or make separate post function
            if (req.method == 'POST') {
                var result = postData(req);
                if (!result) {
                    options.message = 'Error updating DB!';
                    return;
                }
                options.id = result.id;
            }

            var accept = req.headers.accept,
                data   = getData(req, options.dataType, options.id);

            if (accept && accept.indexOf('application/json') > -1) {
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*', // TODO: only allow our domain
                });
                res.write(data);
                res.end();
            }
            else {
                try {
                    data = JSON.parse(data);
                    data.message = options.message;
                }
                catch (e) { } // TODO
                res.render(templatePath, data);
            }
        }
    };

    app.all('*', isLoggedIn);
    app.get('/user', responseFormatter('pages/user'));
    app.get('/controlcenter', responseFormatter('pages/controlcenter', {dataType: 'tasks'}));
    app.route('/task*')
        .get(responseFormatter('pages/task'))
        .post(responseFormatter('pages/task', {message: 'Task saved!'}));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (true || req.isAuthenticated()) // testing, always logged in
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
