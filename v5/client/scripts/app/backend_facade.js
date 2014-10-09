/*global define*/
define(["app/client/speakers_ajax_client"], function (speakersClient) {
    "use strict";

    return {
        loadAllSpeakers : function (callbackHandle) {
            speakersClient.loadAllSpeakers(callbackHandle);
        },

        saveSpeaker : function (speaker, callbackHandle) {
            speakersClient.saveSpeaker(speaker, callbackHandle);
        },

        removeSpeaker : function (speakerId, callbackHandle) {
            speakersClient.removeSpeaker(speakerId, callbackHandle);
        },

        loadSpeaker : function (speakerId, callbackHandle) {
            speakersClient.loadSpeaker(speakerId, callbackHandle);
        },

        updateSpeaker : function (speaker, callbackHandle) {
            speakersClient.updateSpeaker(speaker, callbackHandle);
        }
    };
});