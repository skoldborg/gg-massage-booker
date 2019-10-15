const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Slack integration
const { IncomingWebhook } = require('@slack/webhook');
const webhookUrl = 'https://hooks.slack.com/services/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';
const webhook = new IncomingWebhook(webhookUrl);

const auth = require('./auth');
const TimeSlot = mongoose.model('TimeSlot');

router.get('/timeslots', async (req, res) => {
    try {
        const timeSlots = await TimeSlot.find().sort({
            dateTimeISO: 'ascending'
        });

        res.json(timeSlots);
    } catch (error) {
        console.log(error);
    }
})

router.post('/timeslots', async (req, res) => {
    
    try {
        const timeSlot = new TimeSlot(req.body);
        await timeSlot.save();
        
        if (req.body['name'].toLowerCase() === 'patrik') {
            await webhook.send({
                text: 'Timeslot added for Patrik'
            });
        }

        res.status(200).send('Time slot saved');
    } catch (error) {
        console.log('er', error);
        
        res.status(500).send(`Time slot not saved: ${error}`);
    }
})

router.post('/timeslots/:id', async (req, res) => {
    try {
        const timeSlot = await TimeSlot.findByIdAndUpdate(
            req.params.id,
            {
                $set: { client: req.body.client }
            }
        )
        
        res.status(200).json(timeSlot);
    } catch (error) {
        res.send(500).send(`Something went wrong: ${error}`);
    }
})

router.delete('/timeslots/:id', async (req, res) => {
    try {
        await TimeSlot.findByIdAndRemove(req.params.id);

        res.status(200).send('Time slot removed');
    } catch (error) {
        res.send(500).send(`Something went wrong: ${error}`);
    }
})

router.get('/authorize', auth.authorize);

router.get('/gettoken', auth.gettoken);

router.get('/signin', auth.signin);

router.get('/signout', auth.signout);

module.exports = router;