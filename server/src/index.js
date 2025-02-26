const shortid = require('shortid')
var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const Utils = require('./utils');
app.use(bodyParser.json())

function serve() {

    app.get('/ohms/:id', async (req, res) => {
        const ohm = await Utils.getOhmById(req.params.id);
        res.send(ohm);
    })

    app.get('/ohms/getByTrackingId/:trackingId', async (req, res) => {
        const ohm = await Utils.getOhmByTrackingId(req.params.trackingId);
        res.send(ohm);
    })

    app.put('/ohms/decline/:trackingId', async (req, res) => {
        const ohm = await Utils.declineOhm({trackingId : req.params.trackingId, reasonDecline : req.body.reasonDecline});
        res.send(ohm);
    })

    app.put('/ohms/accept/:trackingId', async (req, res) => {
        const ohm = await Utils.acceptOhm(req.params.trackingId);
        res.send(ohm);
    })
    

    app.listen(3000, () => console.log('listening on port 3000'));
}

serve();