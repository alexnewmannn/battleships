var gulp = require('gulp');
var express = require('express');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');

gulp.task('start', function() {
  var app = express();
  app.use(express.static(__dirname));
  app.listen(4000);
});

gulp.task('lint', function() {
    return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(notify(function(file) {
    	if (file.jshint.success) {
    		return false;
    	}

    	var errors = file.jshint.results.map(function(data) {
    		if (data.error) {
    			return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
    		}
    	}).join('\n');
    	return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
    }));
});

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['lint']);
});