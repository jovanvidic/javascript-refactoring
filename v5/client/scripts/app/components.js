/*global define */
define(["jquery", "app/events", "app/theme"], function ($,  events, theme) {
    "use strict";

    var EventManager = events.EventManager,
        ComponentsFactory;

    ComponentsFactory = {
        createButton : function (styleName, clickListener) {
            return $("<button class=\"" + styleName + "\"></button>").click(clickListener);
        }
    };

    function ComponentBuilder(tagName) {
        var tag = $(tagName);

        return {
            append : function (childComponent) {
                tag.append(childComponent);
                return this;
            },

            appendWhitespace : function () {
                tag.append("&nbsp;");
                return this;
            },

            build : function () {
                return tag;
            }
        };
    }

    function TableRowBuilder() {
        var row = $("<tr/>");

        return {
            addText : function (text) {
                row.append("<td>" + text + "</td>");
                return this;
            },

            addComponent : function (component) {
                row.append(component);
                return this;
            },

            build : function () {
                return row;
            }
        };
    }


    function SpeakersTable() {
        var htmlTable = $("." + theme.SPEAKERS_TABLE + " tbody");

        return {
            clear : function () {
                htmlTable.html("");
            },

            addSpeaker : function (speaker) {
                var sessionTime     = new Date(Date.parse(speaker.sessionTime)),
                    rowBuilder      = new TableRowBuilder(),
                    cellBuilder     = new ComponentBuilder("<td/>");

                rowBuilder
                        .addText(sessionTime.toLocaleString())
                        .addText(speaker.track)
                        .addText(speaker.topic)
                        .addText(speaker.firstName)
                        .addText(speaker.lastName);

                cellBuilder
                    .append(
                        ComponentsFactory.createButton(theme.EDIT_BUTTON, function () {
                            EventManager.fire(events.Actions.SHOW_EDIT_SPEAKER, speaker.id);
                        })
                    )
                    .appendWhitespace()
                    .append(
                        ComponentsFactory.createButton(theme.DELETE_BUTTON, function () {
                            EventManager.fire(events.Actions.REMOVE_SPEAKER, speaker.id);
                        })
                    );

                rowBuilder.addComponent(cellBuilder.build());

                htmlTable.append(rowBuilder.build());
            }
        };
    }

    function TextField(id) {
        var textField = $("#" + id);

        return {
            val : function (value) {
                if (value !== undefined) {
                    textField.val(value);
                } else {
                    return textField.val();
                }
            },

            clear : function () {
                this.val("");
            }
        };
    }

    function SimpleButton(id) {
        var button = $("#" + id);

        return {
            addClickListener : function (listener) {
                button.click(listener);
            }
        };
    }

    function Label(id) {
        var label = $("#" + id);

        return {
            val : function (value) {
                label.html(value);
            },

            clear : function () {
                this.val("");
            }
        };
    }

    function Popup(id) {
        var popup = $("#" + id),
            titleLabel = new Label("myModalLabel");

        return {
            show : function (title) {
                this.setTitle(title);
                popup.modal("show");
            },

            hide : function () {
                popup.modal("hide");
            },

            setTitle : function (title) {
                titleLabel.val(title);
            }
        };
    }

    return {
        SpeakersTable : SpeakersTable,
        TextField : TextField,
        Button : SimpleButton,
        Label : Label,
        Popup : Popup
    };
});