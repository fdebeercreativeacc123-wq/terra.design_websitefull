/* global process */

const sendJson = (res, status, body) => {
  res.status(status).setHeader("Cache-Control", "no-store");
  return res.json(body);
};

const isAllowedOrigin = (origin) => {
  const configuredOrigins = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const allowList = new Set([
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://franksites.co",
    "https://www.franksites.co",
    ...configuredOrigins,
  ]);

  return !origin || allowList.has(origin);
};

const sanitizeLine = (value, maxLength) =>
  String(value || "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const sanitizeBlock = (value, maxLength) =>
  String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim()
    .slice(0, maxLength);

const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { ok: false, message: "Method not allowed." });
  }

  const origin = req.headers.origin;
  if (!isAllowedOrigin(origin)) {
    return sendJson(res, 403, { ok: false, message: "Origin not allowed." });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL || "franksitesza@gmail.com";
  const contactFrom = process.env.CONTACT_FROM || "Frank Sites <onboarding@resend.dev>";

  if (!resendApiKey) {
    return sendJson(res, 500, {
      ok: false,
      message: "Contact form is not configured yet. Please email us directly for now.",
    });
  }

  const body =
    typeof req.body === "string"
      ? (() => {
          try {
            return JSON.parse(req.body);
          } catch {
            return null;
          }
        })()
      : req.body;

  if (!body || typeof body !== "object") {
    return sendJson(res, 400, { ok: false, message: "Invalid request body." });
  }

  const name = sanitizeLine(body.name, 120);
  const email = sanitizeLine(body.email, 160).toLowerCase();
  const business = sanitizeLine(body.business, 160);
  const message = sanitizeBlock(body.message, 3000);
  const website = sanitizeLine(body.website, 160);
  const formStartedAt = Number(body.formStartedAt || 0);
  const submittedAt = Date.now();

  if (website) {
    return sendJson(res, 200, { ok: true, message: "Thanks, your enquiry has been received." });
  }

  if (!name || !email || !message) {
    return sendJson(res, 400, { ok: false, message: "Please complete all required fields." });
  }

  if (!validEmail(email)) {
    return sendJson(res, 400, { ok: false, message: "Please enter a valid email address." });
  }

  if (!formStartedAt || submittedAt - formStartedAt < 2500) {
    return sendJson(res, 400, { ok: false, message: "Please try again in a moment." });
  }

  const escapedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br />");

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFrom,
        to: [contactEmail],
        reply_to: email,
        subject: `New Frank Sites enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Business: ${business || "Not provided"}`,
          "",
          "Project details:",
          message,
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1c1612;">
            <h2 style="margin: 0 0 16px;">New Frank Sites enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Business:</strong> ${business || "Not provided"}</p>
            <p><strong>Project details:</strong></p>
            <p>${escapedMessage}</p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend error:", errorText);
      return sendJson(res, 502, {
        ok: false,
        message: "We could not send your enquiry just now. Please email us directly.",
      });
    }

    return sendJson(res, 200, { ok: true, message: "Thanks, your enquiry has been sent." });
  } catch (error) {
    console.error("Contact form request failed:", error);
    return sendJson(res, 500, {
      ok: false,
      message: "We could not send your enquiry just now. Please email us directly.",
    });
  }
}
