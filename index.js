require('dotenv').config();

const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

const PORT = process.env.PORT || 3500;
// const controllerFetchPendingInvoices = require("./controllers/fetchPendingInvoide.controller");

// MIDDLEWARE
app.use(express.json());
app.use(cors());

app.post('/checkout', async (req, res) => {
  // you can get more data to find in a database, and so on
  const { id, email, name, description, amount } = req.body;
  // console.log(req.body);
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      receipt_email: email,
      currency: 'USD',
      description,
      payment_method: id,
      confirm: true, //confirm the payment at the same time
    });
    // const session = await stripe.checkout.sessions.create({
    //   id,
    //   mode: 'payment',
    //   success_url: 'http://localhost:3000/success',
    //   cancel_url: 'http://localhost:3000/cancel',
    // });

    // console.log(payment);

    return res
      .status(200)
      .json({ status: 'ok', message: 'Successful Payment', payment });
  } catch (error) {
    // console.log(error);
    return res.json({ status: 'bad', message: error.raw });
    // return res.json({ status: 'bad', message: error });
  }
});
app.listen(PORT, () => {
  console.log(`backend server is running in port ${PORT}`);
});
