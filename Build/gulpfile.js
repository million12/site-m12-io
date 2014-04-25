// Include gulp
var gulp = require('gulp');
// Include Our Plugins
var plugins = require('gulp-load-plugins')({
	camelize: true
});

// Variables
var destDir = '../Resources/Public';     // Destination directory
var vendorsDir = destDir + '/Vendors';   // Vendors directory (e.g. with Foundation source)
var sources = {                          // File sources
	sass: './scss/*.scss'
};


gulp.task('sass', function() {
	gulp.src(sources.sass)
		.pipe(plugins.plumber())
		.pipe(plugins.sass({
			includePaths: [vendorsDir + '/foundation/scss'],
			sourceComments: 'map',
			outputStyle: 'nested'
		}))
		.pipe(gulp.dest(destDir + '/Styles'))
		.pipe(plugins.connect.reload())
	;
});

// Connect Server
gulp.task('connect', function() {
	plugins.connect.server({
		root: __dirname,
		port: 9000,
		livereload: false
	});
});

// Watch
gulp.task('watch', ['connect', 'sass'], function () {
	// Watch .scss files
	gulp.watch(sources.sass, ['sass']);
});

// Default Task
gulp.task('default', [
	'sass'
]);
