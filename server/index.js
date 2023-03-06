import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

const app = express();

dotenv.config();
mongoose.set('strictQuery', true);

app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors());


app.use('/posts', postRoutes);
app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.send('Hello to GidiSpot API');
});

const CONNECTION_URL =  'mongodb+srv://kimonie:uzLrlRVr8Uiya9On@cluster0.pvah8dk.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

// mongoose.connect( process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect( CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

    
// mongoose.set('useFindAndModify', false);
