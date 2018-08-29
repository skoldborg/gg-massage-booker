const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TimeSlot = mongoose.model('TimeSlot');

router.get('/timeslots', async (req, res) => {
    try {
        const timeSlots = await TimeSlot.find().sort({
            time: 'ascending'
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
    console.log('req body ', req.body);
    
    try {
        const timeSlot = await TimeSlot.findByIdAndUpdate(
            req.params.id,
            {
                $set: { client: req.body.client }
            }
        )
        console.log(timeSlot);
        
        
        res.status(200).json(timeSlot);
    } catch (error) {
        res.send(500).send(`Something went wrong: ${error}`);
    }
})

module.exports = router;