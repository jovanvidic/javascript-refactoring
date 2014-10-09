/*jslint node: true, nomen: true, es5 : true */
"use strict";
var express = require('express'),
    cors = require('cors'),
    _ = require('underscore'),
    bodyParser = require('body-parser'),
    app = express(),
    lastAssignedId = 2,
    speakers;

app.use(cors());
app.use(bodyParser.json());

function Speaker (id, firstName, lastName, topic, sessionTime, track) {
    this.id           = id;
    this.firstName    = firstName;
    this.lastName     = lastName;
    this.topic        = topic;
    this.sessionTime  = sessionTime;
    this.track        = track;
}

speakers = [
        new Speaker(1, 'Siegfried', 'Steiner', 'Big data processing the lean way', new Date(2014, 10, 10, 11, 50), 1),
        new Speaker(2, 'Alex', 'Mang', 'Design Patterns For Scalable Microsoft Azure Cloud Applications', new Date(2014, 10, 9, 11, 0), 1)
    ];

app.get('/speakers', function (request, response) {
    response.json(_.sortBy(speakers, 'sessionTime'));
});

app.post('/speakers', function (request, response) {
    var speaker = request.body;
    lastAssignedId++;
    speakers[speakers.length] = new Speaker(lastAssignedId,speaker.firstName, speaker.lastName, speaker.topic, speaker.sessionTime, speaker.track);
    response.status(200);
    response.type('json');
    response.send({id:  lastAssignedId});
});


app.delete('/speaker/:id', function (request, response) {
    speakers = _.filter(speakers, function (speaker) {
        return speaker.id != parseInt(request.params.id);
    });
    response.status(200);
    response.send({response: ''});
});

app.get('/speaker/:id', function (request, response) {
    var speakerId = request.params.id,
        speaker = _.findWhere(speakers , {id  : parseInt(speakerId)});

    if (speaker !== undefined) {
        response.json(speaker);
    } else {
        response.status(400);
        response.send({response: "Speaker with id " + speakerId + " does not exist"});
    }
});

app.put('/speaker/:id', function (request, response) {
    var speakerId = request.params.id,
        speaker = _.findWhere(speakers , {id  : parseInt(speakerId)});


    if (speaker !== undefined) {
        var updatedSpeaker = request.body;

        speaker.firstName = updatedSpeaker.firstName;
        speaker.lastName = updatedSpeaker.lastName;
        speaker.topic = updatedSpeaker.topic;
        //speaker.sessionTime = updatedSpeaker.sessionTime;
        //speaker.track = updatedSpeaker.track;

        response.status(200);
        response.send({response: ''});
    } else {
        response.status(400);
        response.send({response: "Speaker with id " + speakerId + " does not exist"});
    }
});

app.listen(process.env.PORT || 4730);