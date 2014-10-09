var tests = [];
for (var file in window.__karma__.files) {
    if (/spec\.js$/.test(file)) {
        tests.push(file);
    }
}

var karmaStarted = false;

requirejs.config({
    baseUrl: "/base/scripts/",
    paths: {
        "jquery": "../lib/jquery/dist/jquery.min",
        "squire" : "../lib/squire/src/Squire"
    },
    shim: {
        
        "squire": {
            exports: "squire"
        },

        "jquery": {
            exports: "jquery"
        }
    },

    cs: {
        "api-url": "http://127.0.0.1:4730/"
    },

    deps: tests,

    // start test run, once Require.js is done
    callback:  function() {
        //prevent squire from startin Karma again
        //https://github.com/iammerrick/Squire.js/issues/31
        if (!karmaStarted) {
            karmaStarted = true;
            window.__karma__.start();
        }
    }
});