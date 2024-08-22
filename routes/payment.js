import express from "express";
import stripeFunc from "stripe";

const paymentRouter = express.Router();

const stripe = stripeFunc(process.env.STRIPE_PRIVATE_KEY);

paymentRouter.post("/get-payment-session", async (req, res) => {
  try {
    const { services = [] } = req.body;

    const lineItems = services.map((service) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: service.name,
          images: service.images,
        },
        unit_amount: Math.round(service.price * 100), // Convert to cents
      },
      quantity: 1,
    }));

    if (lineItems.length === 0) {
      return res.status(400).json({ error: "No services found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FE_URL}/bookingSuccess`,
      cancel_url: `${process.env.FE_URL}/cart?payment=cancelled`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the payment session." });
  }
});

export default paymentRouter;
