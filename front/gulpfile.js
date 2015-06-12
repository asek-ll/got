var gulp = require('gulp');
var clean = require('gulp-clean');
var wiredepResources = require('wiredep');
var wiredep = require('wiredep').stream;

var inject = require('gulp-inject');
var concat = require('gulp-concat');
var series = require('stream-series');
var ngHtml2Js = require('gulp-ng-html2js');
var less = require('gulp-less');

var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var coffee = require('gulp-coffee');
var sourcemaps = require('gulp-sourcemaps');

var watch = require('gulp-watch');

var dist = './dist';
var src = {
  templates: './src/app/**/*.tpl.html',
  coffee: './src/app/**/*.coffee',
  css: './src/styles/css/**/*.css',
  html: './src/index.html'
};

gulp.task('clean', function() {
  return gulp.src(dist, {
      read: false
    })
    .pipe(clean());
});

var getTemplateStream = function(isDev) {
  var templateStream = gulp.src(src.templates)
    .pipe(ngHtml2Js({
      moduleName: 'app-templates'
    }));

  if (!isDev) {
    templateStream = templateStream
      .pipe(concat('partials.js'))
      .pipe(uglify());
  }

  return templateStream.pipe(gulp.dest(dist + '/partials'));
};

var getScriptStream = function(isDev) {
  var appStream = gulp.src(src.coffee)
    .pipe(sourcemaps.init())
    .pipe(coffee({
      bare: true
    }));

  if (isDev) {
    appStream = appStream.pipe(sourcemaps.write());
  }

  if (!isDev) {
    appStream = appStream
      .pipe(concat('app.js'))
      .pipe(uglify());
  }

  return appStream.pipe(gulp.dest(dist + '/scripts/app'));
};

var getStyleStream = function(isDev) {
  var appCssStream = gulp.src(src.css);
  if (!isDev) {
    appCssStream = appCssStream
      .pipe(concat('style.css'))
      .pipe(minifyCss());
  }

  return appCssStream.pipe(gulp.dest(dist + '/styles'));
};

var getVendorResources = function(isDev) {
  var bowerResources = wiredepResources();
  var vendorStream = gulp.src(bowerResources.js);

  if (!isDev) {
    vendorStream = vendorStream
      .pipe(concat('vendors.js'))
      .pipe(uglify());
  }

  return vendorStream.pipe(gulp.dest(dist + '/scripts/vendor'));
};

var getBootstrapStyles = function() {
  return gulp.src('src/styles/bootstrap/bootstrap.less')
    .pipe(less({
      strictMath: true,
      paths: ['node_modules/bootstrap/less']
    }))
    .pipe(gulp.dest(dist + '/styles'));
};

gulp.task('dev-html', ['clean'], function() {

  var isDev = true;
  var vendorStream = getVendorResources(isDev);
  var templateStream = getTemplateStream(isDev);
  var appStream = getScriptStream(isDev);
  var appCssStream = getStyleStream(isDev);
  var bootstrapCss = getBootstrapStyles();

  return gulp.src(src.html)
    .pipe(inject(series(vendorStream, templateStream, appStream, appCssStream, bootstrapCss), {
      relative: true,
      ignorePath: '../dist'
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('html', ['clean'], function() {

  var isDev = false;
  var vendorStream = getVendorResources(isDev);
  var templateStream = getTemplateStream(isDev);
  var appStream = getScriptStream(isDev);
  var appCssStream = getStyleStream(isDev);
  var bootstrapCss = getBootstrapStyles();

  return gulp.src(src.html)
    .pipe(inject(series(vendorStream, templateStream, appStream, appCssStream, bootstrapCss), {
      relative: true,
      ignorePath: '../dist'
    }))
    .pipe(minifyHtml())
    .pipe(gulp.dest(dist));
});

gulp.task('watch', ['dev-html'], function() {

  watch(src.html, function() {
    gulp.start('dev-html');
  });

  watch(src.coffee, function(file) {

    gulp.src(src.coffee)
      .pipe(watch(src.coffee))
      .pipe(sourcemaps.init())
      .pipe(coffee({
        bare: true
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dist + '/scripts/app'));
  });

  watch(src.css, function(file) {

    gulp.src(src.css)
      .pipe(watch(src.css))
      .pipe(gulp.dest(dist + '/styles'));
  });

  watch(src.templates, function(file) {

    var templateStream = gulp.src(src.templates)
      .pipe(watch(src.templates))
      .pipe(ngHtml2Js({
        moduleName: 'app-templates'
      }))
      .pipe(gulp.dest(dist + '/partials'));
  });

});

gulp.task('default', ['watch']);
