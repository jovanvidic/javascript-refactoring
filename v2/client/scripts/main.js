requirejs.config({
    paths: {
        "jquery": "lib/jquery.min",
        "bootstrap": "lib/bootstrap.min"
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});

require(["app/speakers","bootstrap"], function (speakers) {

	$("#btnSaveSpeaker").click(function() {
  		speakers.save();
	});

    $("#btnAddSpeaker").click(function() {
        speakers.createSpeaker();
    });

    speakers.loadAll();
});