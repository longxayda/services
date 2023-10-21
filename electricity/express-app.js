const express = require('express');
const cors  = require('cors');
const { electricityUsage} = require('./api');

module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //api
    // appEvents(app);


    electricityUsage(app);
    // error handling
    
}