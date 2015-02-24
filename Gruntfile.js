module.exports = function (grunt) {
    var config = grunt.file.readJSON('package.json').gruntConfig;

    grunt.initConfig({
        clean: {
            temp: ['temp'],
            all: [config.paths.target]
        },
        copy: {
            optimize: {
                files: [
                    {
                        expand: true,
                        cwd: config.paths.sources,
                        src: [
                            '**/*.html',
                            '**/*.css'
                        ],
                        dest: config.paths.compiled
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: config.paths.built,
                        src: ['Application.js', 'require.js', 'dist.html'],
                        dest: config.paths.dist
                    }
                ]
            }
        },
        typescript: {
            app: {
                src: [config.paths.sources + '**/*.ts'],
                dest: config.paths.compiled,
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true,
                    basePath: config.paths.sources
                }
            }
        },
        mocha_phantomjs: {
            test: {
                files: {
                    src: [
                        'src/test.html'
                    ]
                }
            }
        },
        requirejs: {
            app: {
                options: {
                    baseUrl: config.paths.compiled,
                    optimize: 'uglify2',
                    dir: config.paths.built,
                    stubModules: config.require.plugins,
                    preserveLicenseComments: false,
                    inlineText: true,
                    shim: config.require.shim,
                    paths: config.require.paths,
                    modules: [
                        {
                            name: "Application"
                        }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('compile', [
        'clean:all',
        'typescript:app'
    ]);

    grunt.registerTask('require', [
        'copy:optimize',
        'requirejs'
    ]);

    grunt.registerTask('dist', [
        'copy:dist'
    ]);

    grunt.registerTask('default', ['compile', 'mocha_phantomjs:test', 'require', 'dist']);
};