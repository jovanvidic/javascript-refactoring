/*global define, self*/
define(["app/backend_facade", "app/speakers/speakers_view", "app/events"], function (backend, SpeakersView, events) {
    "use strict";

    var EventManager    = events.EventManager,
        Actions         = events.Actions;

    function SpeakerPresenter() {
        var view = new SpeakersView(),
            self;

        return {
            init : function () {
                self = this;
                EventManager.register(Actions.REMOVE_SPEAKER, this.remove);
                EventManager.register(Actions.SAVE_SPEAKER, this.save);
                EventManager.register(Actions.LOAD_ALL_SPEAKERS, this.loadAll);
                EventManager.register(Actions.SHOW_CREATE_SPEAKER, this.create);
                EventManager.register(Actions.SHOW_EDIT_SPEAKER, this.show);
                EventManager.register(Actions.EDIT_SPEAKER, this.update);
            },

            loadAll : function () {
                backend.loadAllSpeakers({
                    "success" : function (speakers) {
                        view.showAll(speakers);
                    }
                });
            },

            save : function (speaker) {
                backend.saveSpeaker(speaker, {
                    "success" : function () {
                        view.close();
                        self.loadAll();
                    },
                    "failure" : undefined
                });
            },

            remove : function (id) {
                backend.removeSpeaker(id, {
                    "success" : function () {  self.loadAll(); },
                    "failure" : undefined
                });
            },

            show : function (id) {
                backend.loadSpeaker(id, {
                    "success" : function (speaker) {  view.edit(speaker); },
                    "failure" : undefined
                });
            },

            update : function (speaker) {
                backend.updateSpeaker(speaker, {
                    "success" : function () {
                        view.close();
                        self.loadAll();
                    },
                    "failure" : undefined
                });
            },

            create : function () {
                view.create();
            }
        };
    }

    return SpeakerPresenter;
});