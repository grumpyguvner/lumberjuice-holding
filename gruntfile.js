module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
                stripBanners: false
            },
            bootstrap: {
                src: [
                    'src/vendor/bootstrap/js/transition.js',
                    'src/vendor/bootstrap/js/alert.js',
                    'src/vendor/bootstrap/js/button.js',
                    'src/vendor/bootstrap/js/carousel.js',
                    'src/vendor/bootstrap/js/collapse.js',
                    'src/vendor/bootstrap/js/dropdown.js',
                    'src/vendor/bootstrap/js/modal.js',
                    'src/vendor/bootstrap/js/tooltip.js',
                    'src/vendor/bootstrap/js/popover.js',
                    'src/vendor/bootstrap/js/scrollspy.js',
                    'src/vendor/bootstrap/js/tab.js',
                    'src/vendor/bootstrap/js/affix.js'
                ],
                dest: 'src/js/vendor/bootstrap.js'
            }
        },
        uglify: {
            plugins: {
                files: [{
                        expand: true,
                        cwd: 'src/js/plugins',
                        src: '**/*.js',
                        dest: 'assets/js/plugins/',
                        rename: function (dest, src) {
                            return dest + src.replace('.js', '.min.js');
                        }
                    }]
            },
            pluginsconcat: {
                files: {
                    'assets/js/plugins-concat.min.js': ['assets/js/plugins.min.js', 'assets/js/plugins/*.js']
                }
            },
            vendor: {
                files: [{
                        expand: true,
                        cwd: 'src/js/vendor',
                        src: '**/*.js',
                        dest: 'assets/js/vendor/',
                        rename: function (dest, src) {
                            return dest + src.replace('.js', '.min.js');
                        }
                    }]
            },
            main_files: {
                files: {
                    'assets/js/main.min.js': ['src/js/main.js'],
                    'assets/js/plugins.min.js': ['src/js/plugins.js']
                }
            },
            options: {
//                banner: '\n/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                preserveComments: 'some',
                report: 'min'
            }
        },
        less: {
            bootstrap: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    'assets/css/bootstrap.css': ['src/less/bootstrap.less']
                }
            },
            mainless: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    'assets/css/main.css': ['src/less/main.less']
                }
            },
            fontawesome: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    'assets/css/font-awesome.css': ['src/less/font-awesome.less']
                }
            }
        },
        imagemin: {// Task
            dynamic: {// Another target
                files: [{
                        expand: true, // Enable dynamic expansion
                        cwd: 'src/img', // Src matches are relative to this path
                        src: ['**/*.{png,jpg,JPG,gif}'], // Actual patterns to match
                        dest: 'assets/img'                  // Destination path prefix
                    }]
            }
        },
        cssmin: {
            target: {
                files: [{
                        expand: true,
                        cwd: 'assets/css',
                        src: ['**/*.css', '!**/*.min.css'],
                        dest: 'assets/css',
                        ext: '.min.css'
                    }]
            }
        },
        fontello: {
            dist: {
                options: {
                    config: 'src/vendor/fontello/config.json',
                    fonts: 'assets/fonts',
                    styles: 'src/css/fontello/',
                    sass: false,
                    force: true
                }
            }
        },
        copy: {
            fontello: {
                expand: true,
                cwd: 'src/css/fontello/',
                src: '**/*',
                dest: 'assets/css/fontello/',
                flatten: true,
                filter: 'isFile',
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/\.\.\/font\//g, "../../fonts/");
                    },
                }
            },
        },
        modernizr: {
            dist: {
                "devFile": "remote",
                // Path to save out the built file.
                "outputFile": "assets/js/modernizr-custom.min.js",
                // Based on default settings on http://modernizr.com/download/
                "extra": {
                    "shiv": false,
                    "printshiv": false,
                    "load": true,
                    "mq": false,
                    "cssclasses": true
                },
                // Based on default settings on http://modernizr.com/download/
                "extensibility": {
                    "addtest": false,
                    "prefixed": false,
                    "teststyles": false,
                    "testprops": false,
                    "testallprops": false,
                    "hasevents": false,
                    "prefixes": false,
                    "domprefixes": false,
                    "cssclassprefix": ""
                },
                // By default, source is uglified before saving
                "uglify": true,
                // Define any tests you want to implicitly include.
                "tests": [],
                // By default, this task will crawl your project for references to Modernizr tests.
                // Set to false to disable.
                "parseFiles": true,
                // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
                // except files that are in node_modules/.
                // You can override this by defining a "files" array below.
                "files": {
                    "src": ['assets/css/**/*.css', 'assets/js/*.js', '!assets/js/**/*.js']
                },
                // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
                // "handler": function (tests) {},

                // When parseFiles = true, matchCommunityTests = true will attempt to
                // match user-contributed tests.
                "matchCommunityTests": false,
                // Have custom Modernizr tests? Add paths to their location here.
                "customTests": []
            }
        },
        watch: {
            concat: {
                files: ['src/js/**/*.js'],
                tasks: ['newer:concat'],
                options: {
                    livereload: true,
                }
            },
            uglify: {
                files: ['src/js/**/*.js'],
                tasks: ['newer:uglify'],
                options: {
                    livereload: true,
                }
            },
            less_bootstrap: {
                files: ['src/less/bootstrap.less','src/less/build/bootstrap.less','src/less/build/bootstrap/**/*.{less,css}'],
                tasks: ['less:bootstrap']
            },
            less_font_awesome: {
                files: ['src/less/font-awesome.less'],
                tasks: ['less:fontawesome']
            },
            less_mainless: {
                files: ['src/less/main.less','src/less/**/*.{less,css}'],
                tasks: ['less:mainless']
            },
            cssmin: {
                files: ['assets/css/**/*.css', '!assets/css/**/*.min.css'],
                tasks: ['newer:cssmin'],
                options: {
                    livereload: true,
                }
            },
            imagemin:
                    {
                        files: ['src/img/**/*.{png,jpg,JPG,gif}'],
                        tasks: ['newer:imagemin'],
                        options: {
                            livereload: true,
                        }
                    },
            livereload: {
                // Start a live reload server on the default port 35729
                options: {livereload: true},
                files: ['*.{html,php}', 'elements/**/*.{html,php}', 'assets/**/*'],
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-fontello');
    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    // Default task(s).
    grunt.registerTask('default', ['fontello', 'less', 'newer:copy', 'newer:cssmin', 'newer:concat', 'newer:uglify', 'newer:imagemin', 'modernizr']);

};