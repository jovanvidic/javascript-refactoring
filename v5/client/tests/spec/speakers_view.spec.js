define(["squire"], function (Squire) {
    "use strict";

    var injector = new Squire(),
        callbackHandle  = jasmine.createSpy("callback"),
        builder = injector.mock("app/client/speakers_ajax_client", callbackHandle)
        		  .mock("app/events", callbackHandle)
                  .mock("app/components", callbackHandle)
                  .mock("app/speakers/speakers_popup", callbackHandle);


    describe("Test speakers view", function() {
        "use strict";

        var Model;

        beforeEach(function(done) {
            require(["app/speakers/speakers_view"], function (model) {
                Model = model;
                done();
            });
        });

		it("should open popup on create", function() {
            
        });        
    });
});