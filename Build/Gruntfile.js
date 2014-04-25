module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				includePaths: ['../Resources/Public/Vendors/foundation/scss'],
				sourceComments: 'map'
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'../Resources/Public/Styles/app.css': 'scss/app.scss'
				}
			}
		},

		watch: {
			grunt: { files: ['Gruntfile.js'] },

			sass: {
				files: 'scss/**/*.scss',
				tasks: ['sass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['sass']);
	grunt.registerTask('default', ['build', 'watch']);
}
