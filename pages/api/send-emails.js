import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session?.accessToken)
    return res.status(401).json({ message: "Not authenticated" });

  const { subject, content, recipient_emails } = req.body;
  const gmail = google.gmail({ version: "v1" });

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: Buffer.from(
          `To: ${recipient_emails}\r\nSubject: ${subject}\r\n\r\n${content}`
        )
          .toString("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, ""),
      },
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
}
