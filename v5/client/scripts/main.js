/*global requirejs, require */
requirejs.config({
    paths: {
        "jquery": "../lib/jquery/dist/jquery.min",
        "bootstrap": "../lib/bootstrap/dist/js/bootstrap"
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    },
    cs: {
        "api-url": "http://127.0.0.1:4730/"
    }
});

require(["app/speakers/speakers_presenter", "bootstrap"], function (SpeakerPresenter) {
    "use strict";
    var presenter = new SpeakerPresenter();

    presenter.init();

    presenter.loadAll();
});