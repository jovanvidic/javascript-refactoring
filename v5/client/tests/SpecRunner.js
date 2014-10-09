requirejs.config({
    baseUrl: "../scripts/",
    paths: {
        "jquery": "../lib/jquery/dist/jquery.min",
        "squire" : "../lib/squire/src/Squire",

        "jasmine" : "../lib/jasmine/lib/jasmine-core/jasmine",
        "jasmine-html": "../lib/jasmine/lib/jasmine-core/jasmine-html",
        "boot": "../lib/jasmine/lib/jasmine-core/boot",
    },
    shim: {
        "jasmine": {
            exports: "jasmine"
        },
        "jasmine-html": {
            deps: ["jasmine"],
            exports: "jasmine"
        },
        "boot": {
            deps: ["jasmine", "jasmine-html"],
            exports: "jasmine"
        },
        "squire": {
            exports: "squire"
        }
    }
});

var specs = [
      "../tests/spec/backend_facade",
      "../tests/spec/events",
      "../tests/spec/speakers",
      "../tests/spec/speakers_ajax_client",

];

require(["boot"], function () {
    // Load the specs
    require(specs, function () {

        // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
        window.onload();
    });
});