import express from 'express';
import meetingNotesRoute from './routes/meetingNotesRoute.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.text());

app.use('/', meetingNotesRoute);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});