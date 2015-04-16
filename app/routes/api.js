/*
*    We want the API to return data in different formats
*    based on the accept header of the request.
*
*	 For example, we expect to return JSON for AJAX
*    GET requests and HTML otherwise.
*
*	 A request to /user?name=bob with accept='application/json' header returns:
*		{ id: 123,
*		  username: 'bob',
*		  photoUrl: 'cdn.zen.com/1234.jpg',
*		  friends: { ... },
*		  posts: { ... }
*		}
*
*	 A request to /user?name=bob with accept='text/html' header returns:
*		<html>
*		<body>
*			<header />
*			<div class="profile">
*				<h1>bob</h1>
*				<img src="cdn.zen.com/1234.jpg" />
*				<div class="friends"> ... </div>
*				<div class="posts"> ... </div>
*			</div>
*		</body>
*		</html>
*
*/

module.exports = function(app) {

	// =====================================
	// Temporary fake data, until the db is made
	// =====================================
	var fakeData = {
		user: {}
	};

    // =====================================
    // User
    // @param username
    // returns username and some stuff, TBD
    // =====================================
    app.get('/user', function(req, res) {
    	var accept = req.headers.accept;
        if (accept && accept.indexOf('application/json') > -1) {
	        res.writeHead(200, {
	        	'Access-Control-Allow-Origin': '*', // TODO: only allow our domain
	        });
	        res.write(fakeData.user);
	        res.end();
	    }
	    else {
	    	res.render('pages/index', fakeData.user); // TODO: make a profile page tempate
	    }
    });

};