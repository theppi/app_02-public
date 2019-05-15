const indexRouter = require(path.join(__basedir,"routes","index")),
      usersRouter = require(path.join(__basedir,"routes","api")),
      createError = require('http-errors');

module.exports = function(app, express) {

    app.use(express.static(path.join(__basedir, 'public')));
    
    app.use("/libs/socket", express.static(path.join(__basedir, 'node_modules', 'socket.io-client', 'dist')));

    app.use('/', indexRouter);
    app.use('/api', usersRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });
  
    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
  
}