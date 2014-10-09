define(["squire"], function (Squire) {
    "use strict";

    var injector = new Squire(),
        client  = jasmine.createSpyObj("client", ["loadAllSpeakers", "saveSpeaker", "removeSpeaker"]),
        callbackHandle  = jasmine.createSpy("callback"),
        builder = injector.mock("app/client/speakers_ajax_client", client);

    describe("Test backend facade", function() {

        var backend;

        beforeEach(function(done) {
            builder.require(["app/backend_facade"], function(backendFacade) {
                backend = backendFacade;
                done();
            });
        });

        it("should loadAllSpeakers", function() {
            backend.loadAllSpeakers(callbackHandle);
            expect(client.loadAllSpeakers).toHaveBeenCalledWith(callbackHandle);
        });

        it("should saveSpeaker", function() {
            var speaker =  jasmine.createSpy("speaker");
            backend.saveSpeaker(speaker, callbackHandle);
            expect(client.saveSpeaker).toHaveBeenCalledWith(speaker,callbackHandle);
        });

        it("should removeSpeaker", function() {
            var speakerId = 1;
            backend.removeSpeaker(speakerId, callbackHandle);
            expect(client.removeSpeaker).toHaveBeenCalledWith(speakerId, callbackHandle);
        });

    });
});