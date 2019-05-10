const logger = require('morgan');

module.exports = function(app, express) {
    app.set('views', path.join(__basedir, 'views'));
    app.set('view engine', 'hbs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(require('cookie-parser')());
    app.use(express.static(path.join(__basedir, 'public')));
}