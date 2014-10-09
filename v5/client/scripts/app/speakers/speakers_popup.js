/*global define */
define(["app/model", "app/events", "app/components"], function (model, events, components) {
    "use strict";

    var EventManager = events.EventManager,
        Speaker = model.Agenda.Speaker,
        TextField = components.TextField;

    function SpeakersPopup() {
        var speaker,
            popup           = new components.Popup("myModal"),
            firstNameInput  = new TextField("firstName"),
            lastNameInput   = new TextField("lastName"),
            topicInput      = new TextField("topic"),
            saveButton      = new components.Button("btnSaveSpeaker");

        function saveSpeaker() {
            speaker.firstName = firstNameInput.val();
            speaker.lastName = lastNameInput.val();
            speaker.topic = topicInput.val();

            if (speaker.hasId()) {
                EventManager.fire(events.Actions.EDIT_SPEAKER, speaker);
            } else {
                EventManager.fire(events.Actions.SAVE_SPEAKER, speaker);
            }
        }

        function getTitle() {
            if (speaker.hasId()) {
                return "Edit speaker <strong>" + speaker.getFullName() + "</strong>";
            }

            return "Add speaker";
        }

        function init() {
            saveButton.addClickListener(saveSpeaker);
        }

        init();

        return {
            open : function () {
                this.openAndSet(new Speaker("", "", "", "", new Date(2014, 10, 10), 2));
            },

            openAndSet : function (speakerToUpdate) {
                speaker = speakerToUpdate;

                firstNameInput.val(speaker.firstName);
                lastNameInput.val(speaker.lastName);
                topicInput.val(speaker.topic);

                popup.show(getTitle());
            },

            close : function () {
                popup.hide();
            }
        };
    }

    return SpeakersPopup;
});