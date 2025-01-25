const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://tihanovalaura:KKZMJnVwiQLwvqO0@test-task-landing-page.pdlki.mongodb.net/analytics?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

const EventSchema = new mongoose.Schema({
    userId: String,
    type: String,
    timestamp: String,
    userAgent: String,
    pageURL: String,
    ip: String,
});

const Event = mongoose.model('Event', EventSchema);

// Root route for the analytics service
app.get('/', (req, res) => {
    res.send('Welcome to the Analytics Service!');
});

// Endpoint to log events
app.post('/log-event', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const newEvent = { ...req.body, ip };

    try {
    await Event.create(newEvent);
    res.status(200).send('Event logged');
  } catch (error) {
    res.status(500).send('Error logging event');
  }
});

app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Analytics Service running on http://localhost:${PORT}`));
