define(["squire"], function (Squire) {
    "use strict";

    var injector = new Squire(),
        jquery  = jasmine.createSpyObj("jquery", ["ajax", "getJSON"]),
        builder = injector.mock("jquery", jquery);

    describe("Test ajax client", function() {

        var AjaxClient;

        beforeEach(function(done) {
            builder.require(["app/client/speakers_ajax_client"], function(client) {
                AjaxClient = client;
                done();
            });
        });

        it("should execute jquery getJSON when loadAllSpeakers is called", function() {
            var callback =  jasmine.createSpy("callback");
            AjaxClient.loadAllSpeakers(callback);
            expect(jquery.getJSON).toHaveBeenCalled();
        });

        it("should execute jquery ajax when saveSpeaker is called", function() {
            var callback =  jasmine.createSpy("callback"),
                speaker =  jasmine.createSpy("speaker");
            AjaxClient.saveSpeaker(speaker, callback);
            expect(jquery.ajax).toHaveBeenCalled();
        });

        it("should execute jquery ajax when removeSpeaker is called", function() {
            var callback =  jasmine.createSpy("callback"),
                speakerId =  1;
            AjaxClient.removeSpeaker(speakerId, callback);
            expect(jquery.ajax).toHaveBeenCalled();
        });
    });
});