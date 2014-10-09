define(["jquery","app/theme"], function ($, theme) {
    "use strict";

    var SpeakerControler = {
        loadAll : function () {
            $.getJSON("http://localhost:4730/speakers", function (data) {
                var speakersTable = $("." + theme.SPEAKERS_TABLE +" tbody");
                speakersTable.html("");
                $.each(data, function (index, item) {
                    var sessionTime = new Date(Date.parse(item.sessionTime)),
                        row,
                        cell;
    
                    row = $("<tr/>");
                    row.append("<td>" + sessionTime.toLocaleString() +"</td>").append("<td>" + item.track +"</td>").append("<td>" + item.topic + "</td>")
                        .append("<td>"  + item.firstName +"</td>").append("<td>" + item.lastName +"</td>");

                    cell = $("<td/>");

                    cell.append($("<button class='"+theme.EDIT_BUTTON+"'></button>").click(function () {
                            SpeakerControler.editSpeaker(item.id);
                        }));

                    cell.append("&nbsp;");

                    cell.append($("<button class='"+theme.DELETE_BUTTON+"'></button>").click(function () {
                            SpeakerControler.remove(item.id);
                        }));
                    

                    row.append(cell);

                    speakersTable.append(row);

                });

            });
        },

        save : function () {
            var speakerId = $('#speakerId').val();

            $.ajax({
                type: speakerId == '' ? "POST" : "PUT",
                url: speakerId == '' ? "http://localhost:4730/speakers" : "http://localhost:4730/speaker/" + speakerId,
                data: JSON.stringify({id: speakerId, firstName: $('#firstName').val(), lastName : $('#lastName').val(), topic : $('#topic').val(), sessionTime : new Date(2014,9,10), track : 2} ),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){ $('#speakerId').val(''); $('#firstName').val(''); $('#lastName').val(''); $('#topic').val(''); $('#myModal').modal('hide'); SpeakerControler.loadAll();},
                failure: function(errMsg) {alert(errMsg);}
            });
        },

        createSpeaker : function() {
            $('#myModal').modal('show');
            $('#myModalLabel').html('Add speaker');
        },

        editSpeaker : function(id) {
            $('#myModal').modal('show');
            $('#myModalLabel').html('Edit speaker');
            $.getJSON( "http://localhost:4730/speaker/" + id, function(speaker) {
                if(speaker) {
                    $('#myModalLabel').html('Edit speaker <strong>' + speaker.firstName + " " + speaker.lastName + "</strong>");
                    $('#speakerId').val(speaker.id);
                    $('#firstName').val(speaker.firstName);
                    $('#lastName').val(speaker.lastName);
                    $('#topic').val(speaker.topic);
                }
            });
        },

        cancel : function () {
            $('#firstName').val('');
            $('#lastName').val('');
        },

        remove : function(id) {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:4730/speaker/" + id,
                success: function() {
                    SpeakerControler.loadAll();
                }
            });
        }
    };

    return SpeakerControler;
});