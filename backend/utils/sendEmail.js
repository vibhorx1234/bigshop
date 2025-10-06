const transporter = require('../config/email');

// Send verification email with OTP
exports.sendVerificationEmail = async ({ to, subject, otp }) => {
  try {
    const mailOptions = {
      from: `"BigShop" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #D32F2F;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .otp-box {
              background-color: white;
              border: 2px dashed #D32F2F;
              padding: 20px;
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 10px;
              margin: 20px 0;
              color: #D32F2F;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>BigShop</h1>
            </div>
            <div class="content">
              <h2>Email Verification</h2>
              <p>Thank you for choosing BigShop. Please use the following OTP to verify your email address:</p>
              <div class="otp-box">${otp}</div>
              <p>This OTP is valid for 10 minutes.</p>
              <p>If you didn't request this verification, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} BigShop. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// Send enquiry notification to owner
exports.sendEnquiryEmail = async ({ to, subject, enquiryData }) => {
  try {
    const { name, email, phone, productCode, productName, message } = enquiryData;

    const mailOptions = {
      from: `"BigShop" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #D32F2F;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .info-row {
              margin: 10px 0;
              padding: 10px;
              background-color: white;
              border-left: 4px solid #D32F2F;
            }
            .label {
              font-weight: bold;
              color: #D32F2F;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Product Enquiry</h1>
            </div>
            <div class="content">
              <h2>Customer Details</h2>
              <div class="info-row">
                <span class="label">Name:</span> ${name}
              </div>
              <div class="info-row">
                <span class="label">Email:</span> ${email}
              </div>
              <div class="info-row">
                <span class="label">Phone:</span> ${phone}
              </div>
              <div class="info-row">
                <span class="label">Product Code:</span> ${productCode}
              </div>
              <div class="info-row">
                <span class="label">Product Name:</span> ${productName}
              </div>
              ${message ? `
              <div class="info-row">
                <span class="label">Message:</span><br>${message}
              </div>
              ` : ''}
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Enquiry email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending enquiry email:', error);
    throw error;
  }
};

// Send bulk enquiry notification to owner
exports.sendBulkEnquiryEmail = async ({ to, subject, enquiryData }) => {
  try {
    const { companyName, contactPerson, email, phone, products, message } = enquiryData;

    const productsHtml = products.map(product => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${product.productCode}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${product.productName}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${product.quantity}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: `"BigShop" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 700px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #D32F2F;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .info-row {
              margin: 10px 0;
              padding: 10px;
              background-color: white;
              border-left: 4px solid #D32F2F;
            }
            .label {
              font-weight: bold;
              color: #D32F2F;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              background-color: white;
            }
            th {
              background-color: #D32F2F;
              color: white;
              padding: 12px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Bulk Enquiry</h1>
            </div>
            <div class="content">
              <h2>Company Details</h2>
              <div class="info-row">
                <span class="label">Company Name:</span> ${companyName}
              </div>
              <div class="info-row">
                <span class="label">Contact Person:</span> ${contactPerson}
              </div>
              <div class="info-row">
                <span class="label">Email:</span> ${email}
              </div>
              <div class="info-row">
                <span class="label">Phone:</span> ${phone}
              </div>
              
              <h2>Requested Products</h2>
              <table>
                <thead>
                  <tr>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  ${productsHtml}
                </tbody>
              </table>
              
              ${message ? `
              <div class="info-row">
                <span class="label">Additional Message:</span><br>${message}
              </div>
              ` : ''}
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Bulk enquiry email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending bulk enquiry email:', error);
    throw error;
  }
};