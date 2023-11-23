const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const orderModel = require("../models/orderModel");

let endpointSecret;
endpointSecret =
  "whsec_2d57ad11a001a5388971f50af0005542683a58ef8410edd742b1405e8d472ba4";

const stripeController = async (req, res) => {
  try {
    const newCart = req.body.stripeCart.map((item) => ({
      id: item._id,
      quantity: item.quantity,
    }));
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
        stripeCart: JSON.stringify(newCart),
      },
    });
    console.log("StripeCart: ", JSON.parse(customer.metadata.stripeCart));
    const line_items = await req.body.stripeCart.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
            metadata: {
              id: product._id,
            },
          },
          unit_amount: product.amountSale * 100,
        },
        quantity: product.quantity,
      };
    });

    const shippingRate = await stripe.shippingRates.create({
      display_name: "Ground shipping",
      type: "fixed_amount",
      fixed_amount: {
        amount: 500,
        currency: "usd",
      },
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 5,
        },
        maximum: {
          unit: "business_day",
          value: 7,
        },
      },
      display_name: "Air shipping",
      type: "fixed_amount",
      fixed_amount: {
        amount: 1500,
        currency: "usd",
      },
      delivery_estimate: {
        minimum: {
          unit: "business_day",
          value: 1,
        },
        maximum: {
          unit: "business_day",
          value: 2,
        },
      },
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["PH", "CN", "HK", "JP", "TW", "TH", "MY"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/merch/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/merch/checkout`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create order function
const createOrder = async (customer, data) => {
  const stripeCart = JSON.parse(customer.metadata.stripeCart);
  console.log(stripeCart);
  const products = stripeCart.map((item) => {
    return {
      product: item.id,
      quantity: item.quantity,
    };
  });

  const newOrder = new orderModel({
    buyer: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data.amount_subtotal / 100,
    total: data.amount_total / 100,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

const stripeWebhookController = async (req, res) => {
  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  const sig = req.headers["stripe-signature"];

  let data, eventType;
  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        createOrder(customer, data);
      })
      .catch((err) => console.log(err.message));
  }

  // switch (event.type) {
  //   case "payment_intent.succeeded":
  //     const paymentIntentSucceeded = event.data.object;
  //     // Then define and call a function to handle the event payment_intent.succeeded
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};
module.exports = { stripeController, stripeWebhookController };
