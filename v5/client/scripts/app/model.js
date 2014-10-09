/*global define*/
define([], function () {
    "use strict";

    function Speaker(id, firstName, lastName, topic, sessionTime, track) {
        this.id           = id;
        this.firstName    = firstName;
        this.lastName     = lastName;
        this.topic        = topic;
        this.sessionTime  = sessionTime;
        this.track        = track;

        this.hasId = function () {
            return (this.id !== undefined) && (this.id !== null) && (this.id !== "");
        };

        this.getFullName = function () {
            return this.firstName + " " + this.lastName;
        };
    }

    return {
        "Agenda" : {
            "Speaker" : Speaker
        }
    };
});