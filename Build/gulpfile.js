/* jshint strict: false */

var args = require('yargs').argv;
var del = require('del');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ camelize:true });
var config = require('./gulpconfig.json');

var isProduction = /prod/i.test(args.env);


gulp.task('styles', function() {
	gulp.src(config.source.styles)
		.pipe($.plumber())
		.pipe($.sass({
			includePaths: config.source.includePaths,
			imagePath: config.dest.images,
			sourceComments: 'map',
			sourceMap: isProduction === false,
			errLogToConsole: true
		}))
		.pipe($.autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe($.if(isProduction,
			$.csso() // only minify/compress on Production
		))
		.pipe(gulp.dest(config.dest.styles))
		.pipe($.size({ showFiles:true }))
		.pipe($.size({ gzip:true }))
	;
});

gulp.task('scripts', function() {
	var scripts = config.source.vendorScripts.concat(config.source.scripts);
	return gulp.src(scripts)
		.pipe($.if(isProduction,
			$.uglify({ mangle: false }) // only minify/uglify on Production
		))
		.pipe($.concat('App.js'))
		.pipe(gulp.dest(config.dest.scripts))
		.pipe($.size({ showFiles:true }))
		.pipe($.size({ gzip:true }))
	;
});

gulp.task('scripts-hinting', function() {
	return gulp.src(config.source.scripts)
		.pipe($.jshint('../.jshintrc'))
		.pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('assets', function() {
	del.sync(config.clear, {force:true});
	
	// fonts
	return gulp.src(config.source.fonts)
		.pipe(gulp.dest(config.dest.fonts))
	;
});

gulp.task('build', [
	'assets',
	'styles',
	'scripts-hinting',
	'scripts'
]);

// Watch
gulp.task('watch', function () {
	// Watch .scss files
	gulp.watch(config.watch.styles, ['styles']);
	// Watch .js files
	gulp.watch(config.watch.scripts, ['scripts-hinting', 'scripts']);
});

// Default Task
gulp.task('default', ['build']);
