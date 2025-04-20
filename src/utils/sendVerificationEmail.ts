import nodemailer from "nodemailer";

export const sendVerificationEmail = async (data: {
  email: string;
  name: string;
  code: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "titumiranan.gtc@gmail.com",
      pass: "lmke ziod tysh bcgo",
    },
  });

  const mailOptions = {
    from: `"Your Portfolio" <titumiranan.gtc@gmail.com>`,
    to: data.email,
    subject: "Email Verification Code",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">🔐 Email Verification</h2>
      <p style="font-size: 16px; color: #555;">Hello ${data.name},</p>
      <p style="font-size: 16px; color: #555;">Thank you for signing up! Please use the following verification code to complete your registration:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; font-size: 24px; font-weight: bold; border-radius: 5px;">
          ${data.code}
        </span>
      </div>
      
      <p style="font-size: 14px; color: #777;">This code will expire in 15 minutes. If you didn't request this, please ignore this email.</p>
      
      <p style="font-size: 16px; color: #555; margin-top: 20px;">Best regards,<br>Your Portfolio Team</p>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
