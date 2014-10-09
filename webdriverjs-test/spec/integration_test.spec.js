/*global describe, jasmine, beforeEach, it, expect, afterEach */
/*jslint node: true, nomen: true, es5 : true */
"use strict";

var webdriverio = require("webdriverio");

describe("Test agenda", function() {

    var client = {},
        /* just for demo purposes*/
        EXECUTION_SPEED = 1000,
        timestamp = new Date().getTime(),
        speaker = {firstName : "Jovan" + timestamp, lastName : "Vidic" + timestamp, topic : "Refactoring JavaScript applications\n" + timestamp},
        newSpeaker = {firstName : "Ozren" + timestamp, lastName : "Gulan" + timestamp, topic : "MapReduce: Pig vs Java\n" + timestamp};


    jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999999;

    beforeEach(function() {
        client = webdriverio.remote({ desiredCapabilities: {browserName: "chrome"} });
        client.init();
    });

    function getURL() {
        if (process.env.CLIENT_VERSION) {
            return "http://localhost:8080/" + process.env.CLIENT_VERSION + "/client/index.html";
        }

        return "http://localhost:8080/v5/client/dist/index.html";
    }

    it("should add speaker", function(done) {
        client
            .url(getURL())
            .pause(EXECUTION_SPEED)
            .click("//button[contains(@class, 'btn btn-primary btn-lg')]", function(err) {

                client
                    .waitForVisible("//div[contains(@class, 'modal-backdrop')]")
                    .pause(EXECUTION_SPEED)
                    .setValue("//input[@id='firstName']", speaker.firstName)
                    .pause(EXECUTION_SPEED)
                    .setValue("//input[@id='lastName']", speaker.lastName)
                    .pause(EXECUTION_SPEED)
                    .setValue("//textarea[@id='topic']", speaker.topic)
                    .pause(EXECUTION_SPEED)
                    .click("//button[@id='btnSaveSpeaker']", function(err) {
                        expect(err).toBe(undefined);

                        client
                            .pause(EXECUTION_SPEED)
                            .isExisting("//td[text() = '" + speaker.lastName + "']", function(err, isSpeakerListed) {
                                expect(err).toBe(undefined);
                                expect(isSpeakerListed).toBe(true);
                            });
                    });

                expect(err).toBe(undefined);
            })
            .call(done);
    });

    it("should edit speaker", function(done) {
        client
            .url(getURL())
            .pause(EXECUTION_SPEED)
            .click("//td[text() = '" + speaker.lastName + "']/parent::tr//button[contains(@class,'btn btn-default glyphicon glyphicon-pencil')]", function(err) {

                client
                    .waitForVisible("//div[contains(@class, 'modal-backdrop')]")
                    .pause(EXECUTION_SPEED)
                    .setValue("//input[@id='firstName']", newSpeaker.firstName)
                    .pause(EXECUTION_SPEED)
                    .setValue("//input[@id='lastName']", newSpeaker.lastName)
                    .pause(EXECUTION_SPEED)
                    .setValue("//textarea[@id='topic']", newSpeaker.topic)
                    .pause(EXECUTION_SPEED)
                    .click("//button[@id='btnSaveSpeaker']", function(err) {
                        expect(err).toBe(undefined);

                        client
                            .pause(EXECUTION_SPEED)
                            .isExisting("//td[text() = '" + speaker.lastName + "']", function(err, isSpeakerListed) {
                                expect(err).toBe(undefined);
                                expect(isSpeakerListed).toBe(false);
                            })
                            .isExisting("//td[text() = '" + newSpeaker.lastName + "']", function(err, isSpeakerListed) {
                                expect(err).toBe(undefined);
                                expect(isSpeakerListed).toBe(true);
                            });
                    });

                expect(err).toBe(undefined);
            })
            .call(done);
    });

    it("should remove speaker", function(done) {
        client
            .url(getURL())
            .pause(EXECUTION_SPEED)
            .click("//td[text() = '" + newSpeaker.lastName + "']/parent::tr//button[contains(@class,'btn btn-danger glyphicon glyphicon-remove')]", function(err) {
                expect(err).toBe(undefined);
                client
                    .pause(2000)
                    .isExisting("//td[text() = '" + newSpeaker.lastName + "']", function(err, isSpeakerListed) {
                        expect(err).toBe(undefined);
                        expect(isSpeakerListed).toBe(false);
                    });
            })
            .call(done);
    });

    afterEach(function(done) {
        client.end(done);
    });
});