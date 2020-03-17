const express = require('express');
const router = express.Router();
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

const app = express();

const GtfsRealtimeBindings = require('gtfs-realtime-bindings').transit_realtime;
const { FeedMessage, FeedHeader, FeedEntity, VehiclePosition } = GtfsRealtimeBindings;
const request = require('request');


const port = process.env.PORT || 3000;
const currentTime = new Date();

const requestSettings = {
  method: 'GET',
  url: 'http://datamine.mta.info/mta_esi.php?key=7b99a964d1e99eda248f749b773051d8&feed_id=16',
  encoding: null
};
app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


request(requestSettings, function(error, response, body){
    if(!error && response.statusCode == 200){
        
        const feed = FeedMessage.decode(body);
        app.use('/', router.post('/', (req,res,next)=>{
            let dataArr = [];
            console.log(req.body.id)
            feed.entity.forEach(function(entity){
                if (entity.tripUpdate&&entity.tripUpdate.stopTimeUpdate){
                    entity.tripUpdate.stopTimeUpdate.forEach(update=>{
                        if(update.stopId===req.body.id){
                            dataArr.push(Number(update.arrival.time));
                        }
                    })
                }
            })
            let timeArr = dataArr.sort((a,b)=>{return a-b}).slice(0,3);
            res.status('201').json({
                timeList: timeArr.map(el=>Math.floor((new Date(el*1000)-currentTime)/60000))
            })
        }))

    }
})


app.listen(port,()=>{
  console.log(`Listening on port ${port}!`);
})