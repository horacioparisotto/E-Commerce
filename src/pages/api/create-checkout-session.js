const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: "gbp",
      product_data: {
        images: [item.image],
        name: item.title,
        description: item.description,
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  const sessionData = {
    payment_method_types: ["card"],
    shipping_options: [
      {
        shipping_rate: "shr_1PK1LBAkTPHdqSmh1E0Xsovu",
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  };

  if (items.length > 7) {
    sessionData.metadata.images = JSON.stringify(
      items.slice(0, 6).map((item) => item.image)
    );
  }

  const session = await stripe.checkout.sessions.create(sessionData);

  res.status(200).json({ id: session.id });
};
