function load() {
    $.getJSON( "http://localhost:4730/speakers", function( data ) {
        var newRows = "";
        $.each(data, function(i,item) {
            var sessionTime = new Date(Date.parse(item.sessionTime));

            newRows += "<tr><td>" + sessionTime.toLocaleString() +"</td><td>" + item.track +"</td><td>" + item.topic + "</td><td>"  + item.firstName +"</td><td>" + item.lastName +"</td><td><button class='btn btn-default glyphicon glyphicon-pencil' onclick='javascript: editSpeaker("+item.id+")'></button>&nbsp;<button class='btn btn-danger glyphicon glyphicon-remove' onclick='javascript: removeSpeaker("+item.id+")'></button></td></tr>"
        });
        $(".table-striped tbody").html("");
        $(".table-striped tbody").append(newRows);
    });
};

function add() {
    var speakerId = $('#speakerId').val();

    $.ajax({
        type: speakerId == '' ? "POST" : "PUT",
        url: speakerId == '' ? "http://localhost:4730/speakers" : "http://localhost:4730/speaker/" + speakerId,
        data: JSON.stringify({id: speakerId, firstName: $('#firstName').val(), lastName : $('#lastName').val(), topic : $('#topic').val(), sessionTime : new Date(2014,9,10), track : 2} ),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){ $('#speakerId').val(''); $('#firstName').val(''); $('#lastName').val(''); $('#topic').val(''); $('#myModal').modal('hide'); load();},
        failure: function(errMsg) {alert(errMsg);}
    });
};

function editSpeaker(id) {
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
}

function removeSpeaker(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:4730/speaker/" + id,
        success: function(data){ load();}
    });
}

function createSpeaker() {
    $('#myModal').modal('show');
    $('#myModalLabel').html('Add speaker');
}