/*global define, requirejs*/
define(["jquery", "app/model"], function ($, model) {
    "use strict";

    /*jslint nomen: true*/
    var baseURL = requirejs.s.contexts._.config.cs["api-url"],
        speakersURL = baseURL + "speakers/",
        speakerURL = baseURL + "speaker/";
    /*jslint nomen: false*/

    function convertToModel(speakerData) {
        return new model.Agenda.Speaker(speakerData.id, speakerData.firstName, speakerData.lastName, speakerData.topic, speakerData.sessionTime, speakerData.track);
    }

    return {
        loadAllSpeakers : function (callbackHandle) {
            $.getJSON(speakersURL, function (speakersData) {
                var speakers = [];
                /*jslint unparam: true */
                $.each(speakersData, function (index, speakerData) {
                    var speaker = convertToModel(speakerData);
                    speakers.push(speaker);
                });
                /*jslint unparam: false */
                callbackHandle.success(speakers);
            });
        },

        saveSpeaker : function (speaker, callbackHandle) {
            $.ajax({
                type: "POST",
                url: speakersURL,
                data: JSON.stringify(speaker),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: callbackHandle.success,
                failure: callbackHandle.failure
            });
        },

        removeSpeaker : function (speakerId, callbackHandle) {
            $.ajax({
                type: "DELETE",
                url: speakerURL + speakerId,
                success: callbackHandle.success
            });
        },

        loadSpeaker : function (speakerId, callbackHandle) {
            $.getJSON(speakerURL + speakerId, function (speakerData) {
                var speaker = convertToModel(speakerData);
                callbackHandle.success(speaker);
            });
        },

        updateSpeaker : function (speaker, callbackHandle) {
            $.ajax({
                type: "PUT",
                url: speakerURL + speaker.id,
                data: JSON.stringify(speaker),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: callbackHandle.success,
                failure: callbackHandle.failure
            });
        }
    };
});