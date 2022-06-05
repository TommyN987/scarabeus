import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import loginRoute from './routes/login-route.js'
import registerRoute from './routes/register-route.js';
import usersRoute from './routes/users-route.js';
import projectsRoute from './routes/projects-route.js';
import ticketsRoute from './routes/tickets-route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', loginRoute);
app.use('/register', registerRoute);
app.use('/dashboard/users', usersRoute);
app.use('/dashboard/projects', projectsRoute);
app.use('/dashboard/tickets', ticketsRoute)

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => app.listen(PORT, () => console.log(`DB connection established, server running on port ${PORT}`)))
  .catch(err => console.log(err.message));