const express = require('express'); 
const artist = require('../models/artist');  
const mongoose = require('mongoose');
const app = express();
const connectString =  "mongodb+srv://asim:asim007@tracktracer.wymbxwy.mongodb.net/Testing?retryWrites=true&w=majority&appName=TrackTracer";

mongoose.connect(connectString)
    .then((req,res)=> {
        console.log('Connected');
        app.listen(3000);})
    .catch((err)=>{
        console.log(err);
    })

app.get('/artist', (req,res)=>{
    console.log('req_made');

    const Artist = new artist({
        artistName: 'LinkinPark',
        country: 'USA',
        genre: 'Rock',
        joinDate: '2000'
    })

    Artist.save()
        .then((result)=> res.send(result));
})

app.get('/find', (req,res)=>{
    artist.find()
        .then((result)=> res.send(result));
})