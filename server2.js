const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(cors())


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        const MONGODB_URI = 'mongodb+srv://admin:HavestLanka123@havestlanka.f3kte.mongodb.net/DMFFAS?retryWrites=true&w=majority&appName=HavestLanka';
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};
connectDB();

// Define Schema & Model
const PaymentSchema = new mongoose.Schema({
    merchant_id: String,
    order_id: String,
    payment_id: String,
    payhere_amount: String,
    payhere_currency: String,
    status_code: String,
    md5sig: String,
    custom_1: String,
    custom_2: String,
    method: String,
    status_message: String,
    card_holder_name: String,
    card_no: String,
    card_expiry: String,
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);

// Route to handle PayHere notifications
app.post('/payhere-notify', async (req, res) => {
    try {
        const paymentData = req.body;
        const newPayment = new Payment(paymentData);
        await newPayment.save();
        console.log('Payment notification received and saved:', paymentData);
        res.status(200).send('Payment recorded');
    } catch (error) {
        console.error('Error saving payment data:', error);
        res.status(500).send('Error saving payment');
    }
});

app.get('/paysite' , (req,res) => {
    res.sendfile(__dirname + '/pay.html')
})

app.get('/home' , (req,res) => {
    res.send('hello world')
})

// Start Server
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
