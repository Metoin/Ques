var connect = require('connect')
  , middlePipe = require('middleware-pipe')
  , path = require('path')
  , qiqi = require('./gulp/qiqi');

connect()
  .use(
    '/components',
    middlePipe(__dirname + '/components', /(\.html\.js)|(\.css\.js)$/, function (url) {
      return url.replace(/\.js$/, '');
    }).pipe(qiqi.tpl())
  )
  .use(
    '/components',
    middlePipe(__dirname + '/components', /\.js$/)
      .pipe(qiqi.js())
  )
  .use(
    '/components',
    middlePipe(__dirname + '/components', /\.css$/)
      .pipe(qiqi.css())
  )
  .use(
    '/components',
    middlePipe(__dirname + '/components', /render\.js$/, function () {
      return 'render.js';
    }).pipe(qiqi.js())
  )
  .use(
    '/pages',
    middlePipe(__dirname + '/pages', function (url) {
      return path.join(url.replace(/\.js$/, ''), 'main.js');
    }).pipe(qiqi.js())
  )
  .use(
    middlePipe(__dirname, /\.html$/)
      .pipe(qiqi.html())
  )
  .listen(3000);