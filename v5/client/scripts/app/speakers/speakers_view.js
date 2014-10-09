/*global define */
define(["app/events", "app/components", "app/speakers/speakers_popup"], function (events, components, SpeakersPopup) {
    "use strict";

    var EventManager = events.EventManager;

    function SpeakersView() {
        var speakersTable   = new components.SpeakersTable(),
            createButton    = new components.Button("btnAddSpeaker"),
            popup           = new SpeakersPopup();

        function showCreateSpeakerDialog() {
            EventManager.fire(events.Actions.SHOW_CREATE_SPEAKER);
        }

        function init() {
            createButton.addClickListener(showCreateSpeakerDialog);
        }

        init();

        return {
            showAll : function (speakers) {
                var i, len;
                speakersTable.clear();
                for (i = 0, len = speakers.length; i < len; i += 1) {
                    speakersTable.addSpeaker(speakers[i]);
                }
            },

            edit : function (speakerToUpdate) {
                popup.openAndSet(speakerToUpdate);
            },

            create : function () {
                popup.open();
            },

            close : function () {
                popup.close();
            }
        };
    }

    return SpeakersView;
});

