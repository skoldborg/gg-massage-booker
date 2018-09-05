const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const authHelper = require('../helpers/auth');
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

        res.status(200).send('Time slot saved');
    } catch (error) {
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