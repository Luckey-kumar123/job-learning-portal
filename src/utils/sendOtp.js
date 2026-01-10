import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // eslint-disable-next-line no-undef
      user: process.env.EMAIL_USER,
      // eslint-disable-next-line no-undef
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    // eslint-disable-next-line no-undef
    from: `"JobLearn" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your JobLearn OTP Verification Code",
    html: `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for <b>2 minutes</b>.</p>
    `
  });
};
