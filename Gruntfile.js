module.exports = function(grunt) {
	var tmpFolderForJs	= 'compiled/',
		filesToCompile	= {},
		fileList		= [
		'Analyzer',
		'EventRouter',
		'Finger',
		'MethodsHelper',
		'StateMachine',
		'AnalyzerSpec',
		'EventRouterSpec',
		'FingerSpec',
		'HelpersSpec',
		'StateMachineSpec',
		'SpecHelper'
	];

	fileList.forEach(function(file) {
		var prefix = 'src/';
		if (file.indexOf('Spec') != -1) {
			prefix = 'spec/';
		}

		filesToCompile[tmpFolderForJs + prefix + file + '.js'] = prefix + file +'.coffee';
	});

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		coffee: {
			compileForTest: {
				options: {
					bare: true
				},
				files: filesToCompile
			},
			compileJoined: {
				options: {
					join: true
				},
				files: {
					'build/<%= pkg.name %>.js': ['src/*.coffee'] // concat then compile into single file
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'build/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		jasmine: {
			src: tmpFolderForJs + 'src/*.js',
			options: {
				vendor: [
					'bower_components/jquery/dist/jquery.js',
					'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
				],
				specs: tmpFolderForJs + 'spec/*Spec.js',
				helpers: tmpFolderForJs + 'spec/*Helper.js',
				template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: 'coverage/coverage.json',
						report: 'coverage'
					}
			}
		},
		clean: [tmpFolderForJs]
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Default task(s).
	grunt.registerTask('default', ['coffee:compileJoined', 'uglify']);
	grunt.registerTask('test', ['coffee:compileForTest', 'jasmine', 'clean']);
};
