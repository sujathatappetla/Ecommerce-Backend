import nodemailer from "nodemailer";

export const sendOrderEmail = async (toEmail, order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${item.name} (Size: ${item.size}) × ${item.qty} — ₹${item.price * item.qty}</li>`
    )
    .join("");

  const htmlContent = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your purchase!</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
    <ul>${itemsHtml}</ul>
    <h3>Total: ₹${order.totalPrice}</h3>
    <br>
    <p>We appreciate your order 💙</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Your Order Confirmation",
    html: htmlContent,
  });
};
