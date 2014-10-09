'use strict';
module.exports = function(grunt) {

grunt.initConfig({
  jasmine_node: {
    options: {
      forceExit: true,
      match: '.',
      matchall: false,
      extensions: 'js',
      specNameMatcher: 'spec',
      jUnit: {
        report: true,
        savePath : "./build/reports/jasmine/",
        useDotNotation: true,
        consolidate: true
      }
    },
    all: ['spec/']
  },

  selenium_start: {
      options: { port: 4444 }
  },

  connect: {
    example: {
      port: 8080,
      base: '../'
    }
  }

});

grunt.loadNpmTasks('grunt-selenium-webdriver');
grunt.loadNpmTasks('grunt-jasmine-node');
grunt.loadNpmTasks('grunt-connect');

grunt.registerTask('default', ['selenium_start','jasmine_node']);
grunt.registerTask('connect1', ['connect']);

}