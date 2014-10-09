define(["jquery", "app/model", "app/theme"], function ($, model, theme) {
    'use strict';

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

    function showSpeakers(speakers) {
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
        var speakerName = speaker.firstName + " " + speaker.lastName;
        
        $('#myModalLabel').html('Edit speaker <strong>' + speaker.firstName + " " + speaker.lastName + "</strong>");
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
            var speakerId = $('#speakerId').val(),
                speaker = new model.Agenda.Speaker(speakerId,$('#firstName').val(), $('#lastName').val(), $('#topic').val(), new Date(2014, 9, 10), 2);

            $.ajax({
                type: speakerId == '' ? "POST" : "PUT",
                url: speakerId == '' ? "http://localhost:4730/speakers" : "http://localhost:4730/speaker/" + speakerId,
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
            $.getJSON( "http://localhost:4730/speaker/" + id, function(speaker) {
                if(speaker) {
                    showEditSpeakerPopup(speaker);
                }
            });
        }
    };

    return SpeakerControler;
});