define(["jquery", "app/model", "app/theme"], function ($, model, theme) {
    "use strict";

    function clearAddSpeakerPopup() {
        $("#firstName").val("");
        $("#lastName").val("");
        $("#topic").val("");
        $('#speakerId').val("");
    }

    function refreshSpeakersTable() {
        SpeakerControler.loadAll();
    }

    function closeAddSpeakerPopup() {
        clearAddSpeakerPopup();

        $('#myModal').modal('hide');

        refreshSpeakersTable();
    }

    function convertToModel(speakerData) {
        return new model.Agenda.Speaker(speakerData.id, speakerData.firstName, speakerData.lastName, speakerData.topic, speakerData.sessionTime, speakerData.track);
    }

    function showSpeakers(speakersData) {
        var speakers = [];
        
        $.each(speakersData, function (index, speakerData) {
            var speaker = convertToModel(speakerData);
            speakers.push(speaker);
        });

        var speakersTable = $("." + theme.SPEAKERS_TABLE +" tbody");
        speakersTable.html("");
        $.each(speakers, function (index, speaker) {
            var sessionTime = new Date(Date.parse(speaker.sessionTime)),
                row,
                cell;

            row = $("<tr/>");
            row.append("<td>" + sessionTime.toLocaleString() +"</td>").append("<td>" + speaker.track +"</td>").append("<td>" + speaker.topic + "</td>")
                .append("<td>"  + speaker.firstName +"</td>").append("<td>" + speaker.lastName +"</td>");

            cell = $("<td/>");

            cell.append($("<button class='"+theme.EDIT_BUTTON+"'></button>").click(function () {
                            SpeakerControler.editSpeaker(speaker.id);
                        }));

            cell.append("&nbsp;");

            cell.append($("<button class='" + theme.DELETE_BUTTON + "'></button>").click(function () {
                SpeakerControler.remove(speaker.id);
            }));

            row.append(cell);

            speakersTable.append(row);
        });

    }

    function showError(error) {
        alert(error);
    }

    function showAddSpeakerPopup() {
        $('#myModalLabel').html("Add speaker");
         $("#myModal").modal("show");
    }

    function showEditSpeakerPopup(speaker) {
        
        $('#myModalLabel').html('Edit speaker <strong>' + speaker.getFullName() + "</strong>");
        $('#speakerId').val(speaker.id);
        $('#firstName').val(speaker.firstName);
        $('#lastName').val(speaker.lastName);
        $('#topic').val(speaker.topic);

         $("#myModal").modal("show");
    }

    var SpeakerControler = {
        loadAll : function () {
            $.getJSON("http://localhost:4730/speakers", showSpeakers);
        },

        save : function () {
            var speaker = new model.Agenda.Speaker($('#speakerId').val(), $('#firstName').val(), $('#lastName').val(), $('#topic').val(), new Date(2014, 9, 10), 2);

            $.ajax({
                type: speaker.hasId() ? "PUT" : "POST",
                url: speaker.hasId() ? "http://localhost:4730/speaker/" + speaker.id : "http://localhost:4730/speakers",
                data: JSON.stringify(speaker),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: closeAddSpeakerPopup,
                failure: showError
            });
        },

        remove : function(id) {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:4730/speaker/" + id,
                success: refreshSpeakersTable
            });
        },

        createSpeaker : function() {
            showAddSpeakerPopup();
        },

        editSpeaker : function(id) {
            $.getJSON( "http://localhost:4730/speaker/" + id, function(speakerData) {
                if(speakerData) {
                    var speaker = convertToModel(speakerData);
                    showEditSpeakerPopup(speaker);
                }
            });
        }
    };

    return SpeakerControler;
});