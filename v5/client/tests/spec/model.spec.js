define([], function () {
    "use strict";

    describe("Test model objects", function() {
        "use strict";

        var Model;

        beforeEach(function(done) {
            require(["app/model"], function (model) {
                Model = model;
                done();
            });
        });

        it("should create Speaker model with firstName, lastName, topic, sessionTime and track set", function() {
            var speaker = new Model.Agenda.Speaker(3,"Jovan","Vidic", "Refactoring JavaScript applications",new Date(2014, 10, 10), 1);

            expect(speaker.id).toBe(3);
            expect(speaker.firstName).toBe("Jovan");
            expect(speaker.lastName).toBe("Vidic");
            expect(speaker.topic).toBe("Refactoring JavaScript applications");
            expect(speaker.sessionTime.toString()).toBe(new Date(2014, 10, 10).toString());
            expect(speaker.track).toBe(1);

        });

        it("should return false when id is undefined, null or empty string", function() {
            var speaker = new Model.Agenda.Speaker();            
            expect(speaker.hasId()).toBe(false);

            speaker = new Model.Agenda.Speaker(null);            
            expect(speaker.hasId()).toBe(false);

            speaker = new Model.Agenda.Speaker("");            
            expect(speaker.hasId()).toBe(false);
        });

        it("should return true when id value is set", function() {
            var speaker = new Model.Agenda.Speaker(1);   
            expect(speaker.hasId()).toBe(true);
        });

        it("should return Jovan Vidic when firstName is Jovan and lastName is Vidic", function() {
            var speaker = new Model.Agenda.Speaker(1, "Jovan", "Vidic");
            expect(speaker.getFullName()).toBe("Jovan Vidic");
        });
    });
});