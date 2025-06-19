import express from 'express';
import generateMeetingNotes from '../services/generateMeetingNotes.js';

const router = express.Router();

router.post('/process-meeting', async (req, res) => {
    const meetingNotes = req.body;
    if (!meetingNotes || typeof meetingNotes !== 'string' || meetingNotes.trim().length === 0) {
        return res.status(400).json({ message: "Missing or invalid meeting notes input." });
    }
    console.log("Meeting Notes Received!\n", meetingNotes);
    try {
        const response = await generateMeetingNotes(meetingNotes);
        res.json(response);
    } catch (err) {
        console.error(err);
        let status = 500;
        let message = `Error while generating notes: ${err.message}`;
        if (err.code === 'ETIMEDOUT') {
            status = 504;
            message = "AI service timeout. Please try again later.";
        } else if (err.message && err.message.includes('API key')) {
            status = 401;
            message = "Invalid or missing API key.";
        }
        res.status(status).json({ message });
    }
});

export default router;