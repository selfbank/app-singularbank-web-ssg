var gulp = require('gulp');

// gulp-tasks-pleasure loads gulp-sass via gulp-load-plugins. gulp-sass v5 must be
// created with the Dart Sass compiler; register it before the plugin bundle loads.
var gulpSassPath = require.resolve('gulp-sass');
var gulpSassFactory = require('gulp-sass');
require.cache[gulpSassPath] = {
  id: gulpSassPath,
  filename: gulpSassPath,
  loaded: true,
  exports: gulpSassFactory(require('sass')),
};

require('gulp-tasks-pleasure')(gulp);