
const express = require('express');
const app = express();
const path = require('path');
const static = require('serve-static');
const openAPI = require('./openAPI');
const template = require('./template')

app.use('/public', static(path.join(__dirname,'public')));

let dustKind = '미세먼지';
app.get('/',function(request,response){

    var PM = openAPI.PM;
    var PMImage = template.image(dustKind,PM.pm10Value,PM.pm25Value);
    var PMinfo = template.info(dustKind,PM.pm10Value,PM.pm25Value);
    var weather = openAPI.weather;
    var detailWeather = openAPI.detailWeather;
    var html = template.html(PM,PMImage,PMinfo,weather,detailWeather);
    response.send(html);
});

app.get('/fine_Dust',function(request,response){
    dustKind='미세먼지';
    response.redirect('/');
});

app.get('/fine_fine_Dust',function(request,response){
    dustKind='초미세먼지';
    response.redirect('/');
});

app.listen(3000,function(){
});
