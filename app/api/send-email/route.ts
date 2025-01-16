import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const getEmailTemplate = (userData: any) => {
  // Check if this is an OTP email
  if (userData.marathon_details.otp) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
          <h1>OTP Verification</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p>Your OTP for Abujhmad Marathon registration is:</p>
          <h2 style="color: #4CAF50; text-align: center; font-size: 32px; letter-spacing: 5px;">
            ${userData.marathon_details.otp}
          </h2>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      </div>
    `;
  }

  // Return the original registration confirmation template
  return `



  
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { text-align: center; padding: 20px; color: #666; }
  


  
    
      Registration Confirmation - Abujhmad Marathon 2025
    
    
      Dear ${userData.personal_info.firstName} ${userData.personal_info.lastName},
      Thank you for registering for the Abujhmad Marathon 2025! Your registration has been successfully completed.
      
      Registration Details:
      Race Category: ${userData.marathon_details.raceCategory}
      T-Shirt Size: ${userData.marathon_details.tShirtSize}
      
      We will send you further details about the race day schedule and requirements closer to the event date.
      
      If you have any questions, please don't hesitate to contact us.
    
    
      Best regards,Team Abujhmad Marathon 2025
    
  


`;
};

export async function POST(request: Request) {
  try {
    const { userData } = await request.json();

    const mailOptions = {
      from: `"Abujhmad Marathon" <${process.env.SMTP_USER}>`,
      to: userData.personal_info.email,
      subject: "Registration Confirmation - Abujhmad Marathon 2025",
      html: getEmailTemplate(userData),
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}
