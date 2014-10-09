define([], function () {
    "use strict";

    describe("Test event manager", function() {

        var EventManager,
            Actions,
            Events;

        beforeEach(function(done) {
            require(["app/events"], function (events) {
                EventManager = events.EventManager;
                Actions = events.Actions;
                Events  = events.Events;
                done();
            });
        });

        it("should register delegate", function() {
            var callback = jasmine.createSpy("callback");
            EventManager.register(Actions.SAVE_SPEAKER, callback);

            expect(EventManager.getDelegate(Actions.SAVE_SPEAKER)).toBe(callback);
        });

        it("should return undefined for non registered delegate", function() {
            expect(EventManager.getDelegate(Events.SPEAKER_SAVED)).toBeUndefined();
        });

        it("should execute callback with parameter on fire event", function() {
            var callback = jasmine.createSpy("callback");
            EventManager.register(Actions.SAVE_SPEAKER, callback);

            EventManager.fire(Actions.SAVE_SPEAKER, "CodingSerbia");

            expect(callback).toHaveBeenCalledWith("CodingSerbia");
        });

    });
});