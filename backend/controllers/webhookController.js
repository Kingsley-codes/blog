import User from "../models/userModel.js";
import { Webhook } from "svix";


export const clerkWebHook = async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error("CLERK_WEBHOOK_SECRET is missing!");
        return res.status(400).json({ message: "Webhook secret needed!" });
    }

    const payload = req.body;
    const headers = req.headers;

    console.log("Received webhook payload:", payload.toString('utf8')); // Log raw payload
    console.log("Headers:", headers);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
        console.log("Verified event:", JSON.stringify(evt, null, 2));
    } catch (err) {
        console.error("Webhook verification failed:", err);
        return res.status(400).json({ message: "Webhook verification failed" });
    }

    if (evt.type === "user.created") {
        try {
            console.log("Processing user.created event");

            // Safely extract email
            const email = evt.data.email_addresses?.[0]?.email_address;
            if (!email) {
                throw new Error("No email found in webhook payload");
            }

            const newUser = new User({
                clerkUserId: evt.data.id,
                username: evt.data.username || email.split('@')[0],
                email: email,
                img: evt.data.profile_image_url || "",
            });

            const savedUser = await newUser.save();
            console.log("User saved successfully:", savedUser);

        } catch (error) {
            console.error("Failed to save user:", error);
            // Don't return error response here as Clerk expects 200
        }
    }

    return res.status(200).json({ message: "Webhook received" });
};
