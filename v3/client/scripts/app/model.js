define([], function () {
    'use strict';

    return {
        Agenda : {
        	Speaker : function (id,firstName, lastName, topic, sessionTime, track) {
        		this.id           = id;
                this.firstName    = firstName;
        		this.lastName     = lastName;
        		this.topic        = topic;
        		this.sessionTime  = sessionTime;
        		this.track        = track;
        	}
        }
    };
});