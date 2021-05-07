const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./src/routes/User');
const bookingRouter = require('./src/routes/Booking');
const authRouter = require('./src/routes/Auth');

mongoose.connect('mongodb://localhost:27017/logindb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);    
});

db.on('open', () => {
    console.log('Database connected');    
});

// Initializations
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log("Server on port ", PORT);
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/booking', bookingRouter);