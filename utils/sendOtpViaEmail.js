// import nodemailer from "nodemailer";
// import { caching } from "cache-manager";
// // Create a memory cache with a maximum of 100,000 items
// export const memoryCache = await caching("memory", {
//   max: 100000,
//   ttl: 150 * 1000, // milliseconds
// });

// // Function to generate a random OTP
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
// }

// // Function to generate and store OTP in cache
// export async function generateAndStoreOTP(userid) {
//   const otp = generateOTP();
//   console.log("🚀 ~ generateAndStoreOTP ~ otp:", otp)
//   const cacheKey = "otp_" + userid;
//   console.log("🚀 ~ generateAndStoreOTP ~ cacheKey:", cacheKey)
//   try {
//     await memoryCache.set(cacheKey, otp);
//   } catch (err) {
//     console.error("Error storing OTP in cache:", err);
//   }
//   return otp;
// }
import nodemailer from "nodemailer";
import NodeCache from "node-cache";

// Create a NodeCache instance with a TTL of 120 seconds and check period of 600 seconds
export const memoryCache = new NodeCache({
  stdTTL: 120, // Default TTL in seconds (2 minutes)
  checkperiod: 60, // Interval in seconds to check for expired keys
  maxKeys: 100000, // Maximum number of keys to store
});

// Function to generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
}

// Function to generate and store OTP in cache
export function generateAndStoreOTP(userid) {
  const otp = generateOTP();
  const cacheKey = `otp_${userid}`;
  try {
    // Use set method of node-cache
    memoryCache.set(cacheKey, otp, 120); // Store OTP with TTL of 120 seconds
  } catch (err) {
    console.error("Error storing OTP in cache:", err);
  }
  return otp;
}

// export async function sendOtpViaEmail(recipient, otp) {
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "iqbal.rajput@mozilit.com",
//       pass: "bnbt nsei xsfz ffge",
//     },
//   });

//   try {
//     let htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>OTP for Verification</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         margin: 0;
//         padding: 0;
//         background-color: #f5f5f5;
//       }
//       .container {
//         max-width: 600px;
//         margin: 0 auto;
//         padding: 20px;
//       }
//       .card {
//         background-color: #ffffff;
//         border-radius: 10px;
//         box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
//         padding: 30px;
//       }
//       h1 {
//         color: #333333;
//         margin-bottom: 20px;
//       }
//       p {
//         color: #666666;
//         font-size: 16px;
//         margin-bottom: 10px;
//       }
//       .otp-box {
//         background-color: #eeeeee;
//         border-radius: 8px;
//         padding: 20px;
//         margin-top: 20px;
//         text-align: center;
//       }
//       .otp {
//         font-size: 36px;
//         color: #333333;
//         margin: 0;
//       }
//     </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="card">
//           <h1>OTP for Verification</h1>
//           <p>Your One-Time Password (OTP) is:</p>
//           <div class="otp-box">
//             <h2 class="otp">${otp}</h2>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//     `;

//     let mailOptions = {
//       from: "iqbal.rajput@mozilit.com",
//       to: recipient,
//       subject: "Otp for Onbid verification",
//       html: htmlContent,
//     };
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.log(error);
//     console.error("Error sending email:", error);
//   }
// }

// export async function sendOtpViaEmail(recipient, otp) {
//   let transporter = nodemailer.createTransport({
//     host: "email-smtp.us-east-1.amazonaws.com", // Replace with your SES SMTP endpoint
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "AKIAQ3EGUTPRG4WCJJVI",
//       pass: "BGSt0uPEIm8NAXJByqH5UqMdQVp5ShJ8wc5exKEcDwDZ",
//     },
//   });

//   try {
//     let htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>OTP for Verification</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         margin: 0;
//         padding: 0;
//         background-color: #f5f5f5;
//       }
//       .container {
//         max-width: 600px;
//         margin: 0 auto;
//         padding: 20px;
//       }
//       .card {
//         background-color: #ffffff;
//         border-radius: 10px;
//         box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
//         padding: 30px;
//       }
//       h1 {
//         color: #333333;
//         margin-bottom: 20px;
//       }
//       p {
//         color: #666666;
//         font-size: 16px;
//         margin-bottom: 10px;
//       }
//       .otp-box {
//         background-color: #eeeeee;
//         border-radius: 8px;
//         padding: 20px;
//         margin-top: 20px;
//         text-align: center;
//       }
//       .otp {
//         font-size: 36px;
//         color: #333333;
//         margin: 0;
//       }
//     </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="card">
//           <h1>OTP for Verification</h1>
//           <p>Your One-Time Password (OTP) is:</p>
//           <div class="otp-box">
//             <h2 class="otp">${otp}</h2>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//     `;

//     let mailOptions = {
//       from: "contact@onbid.in",
//       to: recipient,
//       subject: "Otp for Onbid verification",
//       html: htmlContent,
//     };
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.log(error);
//     console.error("Error sending email:", error);
//   }
// }

export async function sendOtpViaEmail(recipient, otp) {
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false, // false for TLS
    auth: {
      user: "support@onbid.co.in", // Your email address
      pass: "Demo@123", // Your email password
    },
  });

  try {
    let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP for Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .card {
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        padding: 30px;
      }
      h1 {
        color: #333333;
        margin-bottom: 20px;
      }
      p {
        color: #666666;
        font-size: 16px;
        margin-bottom: 10px;
      }
      .otp-box {
        background-color: #eeeeee;
        border-radius: 8px;
        padding: 20px;
        margin-top: 20px;
        text-align: center;
      }
      .otp {
        font-size: 36px;
        color: #333333;
        margin: 0;
      }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <h1>OTP for Verification</h1>
          <p>Your One-Time Password (OTP) is:</p>
          <div class="otp-box">
            <h2 class="otp">${otp}</h2>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    let mailOptions = {
      from: "support@onbid.co.in",
      to: recipient,
      subject: "Otp for Onbid verification",
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    console.error("Error sending email:", error);
  }
}

