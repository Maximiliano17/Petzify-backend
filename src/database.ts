import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME1;
const password = process.env.DB_PASSWORD;

const URI = `mongodb+srv://${username}:${password}@cluster0.ktoxf8e.mongodb.net/pet-tracker?retryWrites=true&w=majority`;

// Localhost: mongodb://0.0.0.0:27017/pet-tracker

mongoose
    .connect(URI)
    .then(_db => console.log('Database is connected'))
    .catch(err => console.log(err));