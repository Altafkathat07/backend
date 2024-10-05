import prisma from "./prisma/prisma.js";
import md5 from "md5";
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const timeCreate = () => {
  const d = new Date();
  const time = new Date(d.getTime()).toISOString();
  return time;
};
function generateUniqueId() {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2); // Get last 2 digits of the year
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timestamp = year + month + day + hours + minutes + seconds;
  const uniqueDigit = Math.floor(Math.random() * 10);
  const uniqueId = timestamp + uniqueDigit;
  return uniqueId;
}

const createWingo = async () => {
  try {
    await prisma.crashedplane.create({});
    await prisma.refer.create({});
    await prisma.bonus.create({});
    await prisma.wingo.deleteMany({});
    await prisma.betwingo.deleteMany({});
    await prisma.wingo.deleteMany({ where: { status: 0 } });
    const games = ["wingo10", "wingo5", "wingo3", "wingo1"];
    for (const game of games) {
      await prisma.wingo.create({
        data: {
          period: generateUniqueId(),
          game: game,
          result: 6,
          status: 0,
        },
      });
    }
    console.log("Create Success Database Wingo.");
    let id_user = randomNumber(10000, 99999);
    await prisma.users.create({
      data: {
        id_user: id_user.toString(),
        email: "arjun@123.com",
        name_user: "Arjun Sharma",
        password: md5("12345678"), // Replace 'securepassword' with the actual password
        money: 1000, // Adjust the initial amount as needed
        code: "6fGGw42409",
        invite: "6fGGw42409",
        veri: 1,
        otp: "123456", // Example OTP, replace as needed
        ip_address: "192.168.1.1", // Example IP address, replace with actual IP
        status: 1,
        time: timeCreate(),
        phone: "9898989898", // Provided phone number
      },
    });
  } catch (error) {
    console.log(error);
    console.error("Error in CreateWingo function:", error);
  }
};
await prisma.transaction.deleteMany({ where: { token: 0 } });
createWingo();
