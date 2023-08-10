
const stripe = require('stripe')('sk_test_51NbMeoSAgswOLPgsbzB0SSGrpehFPSHZFwZikKJzwESf86Vit2ud4C92C2Gx7IM3EimEz8OH44PD1HDnGJ0S2H6J00vUXU0OuO');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Node server starting...");
})
app.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.

    const {amount,currency} = req.body;
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2022-11-15'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customer.id,
      payment_method_types: [ 'card'],
    //   automatic_payment_methods: {
    //     enabled: true,
    //   },
    });
  
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  });

  // app.post('/payment', async (req, res) => {
  //   // Use an existing Customer ID if this is a returning customer.
  //   const customers = await stripe.customers.list();
  //   const customer = customers.data[0];

  //   if(!customer){
  //     return res.send({error:'you have no customer created'});
  //   }

  //   const ephemeralKey = await stripe.ephemeralKeys.create(
  //     {customer: customer.id},
  //     {apiVersion: '2022-11-15'}
  //   );
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: 59,
  //     currency: 'usd',
  //     customer: customer.id,
  //     payment_method_types:['card']
  //   });
  
  //   res.json({
  //     paymentIntent: paymentIntent.client_secret,
  //     ephemeralKey: ephemeralKey.secret,
  //     customer: customer.id,
  //     publishableKey:"pk_test_51NbMeoSAgswOLPgsxZBnEvDq1LbDTcC3fwnbvoSqIK7a40ob0hZ4ewCwEElm8rkOyNCd79D8IST7Gr5hyqu2Yeej003fyadMAp"
  //   });
  // });


app.listen(4002,()=>console.log("Running on http://localhost:4002"));