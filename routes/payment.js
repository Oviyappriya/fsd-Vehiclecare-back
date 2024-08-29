import express from "express";
import stripeFunc from "stripe";
import cookieParser from "cookie-parser";

const paymentRouter = express.Router();
const stripe = stripeFunc(process.env.STRIPE_PRIVATE_KEY);

paymentRouter.use(cookieParser());

paymentRouter.post("/get-payment-session", async (req, res) => {
  try {
    const { services = [] } = req.body;

    // Access cookies from the request
    const userCookie = req.cookies.user; // Example: fetching a cookie named 'user'
    
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
      success_url: 'https://spiffy-melba-42211b.netlify.app/bookingSuccess',
      cancel_url: 'https://spiffy-melba-42211b.netlify.app/cart?payment=cancelled',
      // Optionally, you can store information in a cookie or use cookies to customize the session.
    });

    // Set a cookie if needed
    res.cookie("paymentSession", session.id, { httpOnly: true });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the payment session." });
  }
});

export default paymentRouter;