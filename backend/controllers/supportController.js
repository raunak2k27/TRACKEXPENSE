import nodemailer from "nodemailer";
import Support from "../models/support.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const submitSupportMessage = async (req, res) => {
    try {
        const { firstName, lastName, countryCode, phone, email, location, issueType, message } = req.body;

        if (!firstName || !email || !message) {
            return res.status(400).json({ success: false, message: "First name, email, and message are required." });
        }

        const supportEntry = await Support.create({
            firstName,
            lastName,
            countryCode,
            phone,
            email,
            location,
            issueType,
            message,
        });

        // fire-and-forget email; don't fail the request if email fails
        transporter
            .sendMail({
                from: `"ExpenseTracker Support" <${process.env.EMAIL_USER}>`,
                to: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER,
                replyTo: email,
                subject: `New Support Request: ${issueType || "General"} - ${firstName} ${lastName || ""}`,
                html: `
                    <h2>New Support Request</h2>
                    <p><strong>Name:</strong> ${firstName} ${lastName || ""}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${countryCode || ""} ${phone || "N/A"}</p>
                    <p><strong>Location:</strong> ${location || "N/A"}</p>
                    <p><strong>Issue Type:</strong> ${issueType || "N/A"}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, "<br/>")}</p>
                `,
            })
            .catch((emailErr) => {
                console.error("Failed to send support email:", emailErr);
            });

        return res.status(201).json({ success: true, message: "Your message has been sent!", data: supportEntry });
    } catch (err) {
        console.error("Support submission error:", err);
        return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
    }
};

export const getSupportMessages = async (req, res) => {
    try {
        const messages = await Support.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: messages });
    } catch (err) {
        console.error("Fetch support messages error:", err);
        return res.status(500).json({ success: false, message: "Failed to fetch messages." });
    }
};