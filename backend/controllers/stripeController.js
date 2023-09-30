const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {
  try {
    const line_items = await req.body.cart.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [
              `http://localhost:${process.env.PORT}/api/v1/product/product-photo/${product._id}`,
            ],
            description: product.description,
            metadata: {
              id: product.id,
            },
          },
          unit_amount: product.price * 100,
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
module.exports = stripeController;
