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
            type: 'task',
            datetime: '2015-05-01 00:00:00 PDT',
            location: 'the schoolyard',
            notes: 'I like puppies'
        }
        ],
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
    var getData = function(req) {
        var pathname = url.parse(req.url).pathname.split('/'),
            dataType = pathname.length && pathname[1], // only the first part of path, no deep nesting yet
            response = {};

        response.title = dataType;
        response.user  = fakeData.user; // always need the user; TODO get userID and other basic info from the session cookie

        if (dataType in fakeData && fakeData.hasOwnProperty(dataType)) {
            // TODO, actually query the DB with parameters and return asynchronously
            response[dataType] = fakeData[dataType];
        }

        return JSON.stringify(response);
    };

    // =====================================
    // return a function that responds with
    // JSON or HTML depending on the request
    // =====================================
    var responseFormatter = function(templatePath) {
        return function(req, res) {
            var accept = req.headers.accept,
                data   = getData(req);

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
                }
                catch (e) { } // TODO
                res.render(templatePath, data);
            }
        }
    };

    app.get('/user', isLoggedIn, responseFormatter('pages/user'));
    app.get('/controlcenter', isLoggedIn, responseFormatter('pages/controlcenter'));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (true || req.isAuthenticated()) // testing, always logged in
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
