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
	sass: './scss/*.scss',
	sassWatch: ['./scss/**/*']
};


gulp.task('sass', function() {
	gulp.src(sources.sass)
		.pipe(plugins.plumber())
		.pipe(plugins.sass({
			includePaths: [vendorsDir + '/foundation/scss'],
			imagePath: '/_Resources/Static/Packages/M12.Site/Images',
			sourceComments: 'map',
			outputStyle: 'nested',
			errLogToConsole: true
		}))
		.pipe(plugins.autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
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
	gulp.watch(sources.sassWatch, ['sass']);
});

// Default Task
gulp.task('default', [
	'sass'
]);
