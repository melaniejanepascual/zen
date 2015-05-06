module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // (probably move this into api.js eventually)
    // =====================================
    app.get('/', function(req, res) {
        res.render('pages/index', { title: 'Zen' });
    });

};