const express = require('express');
const axios = require('axios');
const app = express();

const secrets = require('./secrets.json');
const key = secrets["API_key"];


app.get('/:city/id', (req, res) => {
    console.log("data flow arrived in server!");
    // console.log("req.params.city: ", req.params.city); //expected: Berlin
    var id = 2950159; //search for the cityid in the city.list.json file
    res.json({cityid:id});
});

app.get('/:id/currentweather', (req, res) => {
    // console.log("cityid: ", req.params.id); //Berlin, DE: 2950159
    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=2950159&APPID=${key}`).then(results => {
        console.log("results from openweathermap: ", results.data);
        var data = JSON.stringify(results.data);
        res.json(data);
    }).catch(err => {
        console.log('err getting weather results: ', err);
    });
});

app.listen('8080', () => console.log("listening!"));
