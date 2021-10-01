const express = require('express')
const Razorpay = require('razorpay')
require('dotenv').config({ path: './.env' })

const app = express()

const razorpay = new Razorpay({
    key_id: process.env.keyId,
    key_secret: process.env.keySecret
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render("razorpay", {
        keyId: process.env.keyId
    })
})

app.post('/success', (req, res) => {
    razorpay.payments.fetch(req.body.razorpay_payment_id).then(paymentDocument => {
        if (paymentDocument.status === 'captured') {
            res.json({
                status: 'Success'
            })
        }
        else {
            res.json({
                status: 'Failed'
            })
        }
    })
})

app.post('/order', (req, res) => {
    var options = {
        amount: 50000,
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    razorpay.orders.create(options, (err, order) => {
        res.json(order)
    });
})

app.listen(3000, (req, res) => {
    console.log("Server running on port 3000")
})