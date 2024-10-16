
import { EmailTemplate } from '@/app/_components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response =await req.json();
  
  console.log(response)
  try {
    const { data, error } = await resend.emails.send({
      from: 'Abhishek@resend.dev',
       to: [response.emailToSend],
      // to: ["abhishekk11603@gmail.com"],
      subject: response?.userName+" share file with you",
      react: EmailTemplate({response}),
    });

    if (error) {
      console.error("Error sending email:", error)
      return Response.json({ error }, { status: 501 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ error }, { status: 500 });
  }
}
