/*global define*/
define([], function () {
    "use strict";

    return {
        Events : {
            SPEAKER_SAVED : "E_SPEAKER_SAVED",
            SPEAKER_REMOVED : "E_SPEAKER_REMOVED"
        },

        Actions : {
            SHOW_CREATE_SPEAKER: "A_SHOW_CREATE_SPEAKER",
            SAVE_SPEAKER : "A_SAVE_SPEAKER",
            EDIT_SPEAKER : "A_EDIT_SPEAKER",
            SHOW_EDIT_SPEAKER : "A_SHOW_EDIT_SPEAKER",
            REMOVE_SPEAKER : "A_REMOVE_SPEAKER",
            LOAD_ALL_SPEAKERS : "A_LOAD_ALL_SPEAKERS"
        },

        EventManager : {

            delegates : {},

            getDelegate : function (name) {
                return this.delegates[name];
            },

            register : function (name, callback) {
                this.delegates[name] = callback;
            },

            fire : function (name, params) {
                this.delegates[name](params);
            }
        }
    };
});