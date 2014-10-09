"use strict";
module.exports = function(grunt) {

grunt.initConfig({

  jslint: {
    src: [
      "scripts/**/*.js"
    ],

  },

  karma: {
    unit: {
      configFile: "karma.conf.js"
    }
  },

  clean: {
    build: {
      src: ["dist/"]
    }
  },

  copy: {
    main: {
      files: [
        {expand: true, src: ["lib/bootstrap/dist/css/**"], dest: "dist/"},
        {expand: true, src: ["lib/bootstrap/dist/fonts/**"], dest: "dist/"},
        {expand: true, src: ["lib/requirejs/require.js"], dest: "dist/"}
      ]
    }
  },

  requirejs: {
    compile: {
      options: {
        baseUrl: "scripts/",
        name: "main",
        out: "dist/app-built.js",

        paths: {
            app: "app/",
            "jquery": "../lib/jquery/dist/jquery.min",
            "bootstrap": "../lib/bootstrap/dist/js/bootstrap"
        }
      }
    }
  },

  processhtml: {
    options: {
      data: {
       
      }
    },
    dist: {
      files: {
        "dist/index.html": ["index.html"]
      }
    }
  }
  
});

grunt.loadNpmTasks("grunt-jslint");
grunt.loadNpmTasks("grunt-karma");
grunt.loadNpmTasks("grunt-contrib-copy");
grunt.loadNpmTasks("grunt-contrib-clean");
grunt.loadNpmTasks("grunt-contrib-requirejs");
grunt.loadNpmTasks("grunt-processhtml");

grunt.registerTask("test", ["karma"]);
grunt.registerTask("lint", ["jslint"]);
grunt.registerTask("default", ["lint","test"]);

grunt.registerTask("build", ["default","clean","copy","requirejs","processhtml"]);

}