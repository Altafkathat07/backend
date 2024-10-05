import prisma from "../prisma/prisma.js";
import { successResponse, failedResponse } from "../utils/response.js";

import Web3 from "web3";
import contractABI from "./contractABI.js";
const NXBTContractAddress = "0x94651A5a28D43569bDA103F38f4F27aBb8499BcB";
const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT Token Address on BSC

const NXBTChainParams = {
  rpcUrl: "https://rpc-nodes.nexablockscan.io",
  chainId: 9025,
  networkId: 9025,
  blockExplorerUrl: "https://nexablockscan.io",
};

const BEP20ChainParams = {
  rpcUrl: "https://bsc-dataseed.binance.org/",
  chainId: 56,
  networkId: 56,
  blockExplorerUrl: "https://bscscan.com",
};

const web3NXBT = new Web3(NXBTChainParams.rpcUrl);
const web3BEP20 = new Web3(BEP20ChainParams.rpcUrl);

const NXBTContract = new web3NXBT.eth.Contract(
  contractABI,
  NXBTContractAddress
);
const USDTContract = new web3BEP20.eth.Contract(
  contractABI,
  USDTContractAddress
);

export const performWithdrawal = async (req, res) => {
  try {
    const email = req.email;
    const { points, amount, cur, type, sender, receiver, name_user, phone } =
      req.body;
    if (!amount || !points || !cur || !type || !sender || !receiver) {
      return res.status(400).json({ error: "Invalid input!" });
    }
    const referDetails = await prisma.refer.findFirst({
      select: { privatekey: true },
    });
    if (!referDetails) {
      return failedResponse(res, "Key Details Not Found");
    }

    const privateKey = referDetails.privatekey;
    let web3, contract, txObject, account, gas, gasPrice;

    if (cur === "NXBT") {
      web3 = web3NXBT;
      contract = NXBTContract;
      account = web3.eth.accounts.privateKeyToAccount(privateKey);
      web3.eth.accounts.wallet.add(account);

      gas = await contract.methods
        .transfer(receiver, web3.utils.toWei(amount, "ether"))
        .estimateGas({ from: account.address });
      gasPrice = await web3.eth.getGasPrice();

      txObject = {
        from: account.address,
        to: NXBTContractAddress,
        data: contract.methods
          .transfer(receiver, web3.utils.toWei(amount, "ether"))
          .encodeABI(),
        gas,
        gasPrice,
      };
    } else if (cur === "USDT") {
      web3 = web3BEP20;
      contract = USDTContract;
      account = web3.eth.accounts.privateKeyToAccount(privateKey);
      web3.eth.accounts.wallet.add(account);

      gas = await contract.methods
        .transfer(receiver, web3.utils.toWei(amount, "ether")) // USDT often uses 6 decimals
        .estimateGas({ from: account.address });
      gasPrice = await web3.eth.getGasPrice();

      txObject = {
        from: account.address,
        to: USDTContractAddress,
        data: contract.methods
          .transfer(receiver, web3.utils.toWei(amount, "ether"))
          .encodeABI(),
        gas,
        gasPrice,
      };
    } else {
      return failedResponse(res, "Unsupported currency!");
    }
    // const balanceBefore = await contract.methods
    //   .balanceOf(account.address)
    //   .call();
    const signedTx = await web3.eth.accounts.signTransaction(
      txObject,
      privateKey
    );
    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    // const balanceAfter = await contract.methods
    //   .balanceOf(account.address)
    //   .call();
    if (txReceipt.status) {
      await prisma.users.update({
        where: {
          email: email,
        },
        data: {
          money: {
            decrement: Number(points),
          },
        },
      });
      if (Number(points)>0) {
        await prisma.transaction.create({
          data: {
            points: Number(points),
            type,
            cur,
            email,
            receiver,
            sender,
            name_user,
            phone,
            token: Number(amount),
          },
        });
      }
      return res.status(200).json({
        status: true,
        message: "Withdrawal successful.",
        txHash: txReceipt.transactionHash,
        explorerLink: `${
          cur === "NXBT"
            ? NXBTChainParams.blockExplorerUrl
            : BEP20ChainParams.blockExplorerUrl
        }/tx/${txReceipt.transactionHash}`,
      });
    }
    return failedResponse(res, "Something went wrong!");
  } catch (error) {
    console.log(error);
    if (error.code === 310) {
      return failedResponse(
        res,
        "Something Went Wrong, Please Try Again Later"
      );
    }
    return res
      .status(500)
      .json({ status: false, message: error.reason || error.message });
  }
};

export const depositFunds = async (req, res) => {
  try {
    const email = req.email;
    if (!email) {
      return failedResponse(res, "Email Not Found");
    }

    const { points, cur, type, receiver, sender, name_user, phone, token } =
      req.body;
    if (!points || !cur || !type || !receiver || !sender) {
      return failedResponse(res, "Invalid Input");
    }
    const user = await prisma.users.findUnique({ where: { email: email } });
    const parentCode = user.invite;
    const userEmail = user.email;
    await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        deposit: {
          increment: Number(points),
        },
      },
    });
    if (Number(points) > 0) {
      await prisma.transaction.create({
        data: {
          points: Number(points),
          type,
          cur,
          email,
          receiver,
          sender,
          name_user,
          phone,
          token: Number(token),
        },
      });
    }
    const allDeposits = await prisma.transaction.findMany({
      where: { type: "d" },
    });
    const totalDeposit = allDeposits.reduce((acc, cur) => acc + cur.points, 0);
    const referDetails = await prisma.refer.findMany();
    const mda = referDetails[0].mda;
    let parentCommission = referDetails[0].parentCommission;
    let childrenCommission = referDetails[0].childrenCommission;
    parentCommission = Math.floor((points * parentCommission) / 100);
    childrenCommission = Math.floor((points * childrenCommission) / 100);
    const parentUser = await prisma.users.findFirst({
      where: { code: parentCode },
    });
    if (parentUser) {
      let pendingReferralsArray = parentUser.pendingReferrals
        ? JSON.parse(parentUser.pendingReferrals)
        : [];
      const pendingUser = await prisma.pendingUsers.findFirst({
        where: {
          email: userEmail,
          invite: parentCode,
        },
      });
      console.log("🚀 ~ depositFunds ~ pendingUser:", pendingUser);
      if (
        totalDeposit &&
        totalDeposit >= mda &&
        (pendingReferralsArray.includes(email) || pendingUser)
      ) {
        pendingReferralsArray.pop(email);
        await prisma.pendingUsers.deleteMany({
          where: {
            email: userEmail,
            invite: parentCode,
          },
        });
        const updatedPendingReferrals = JSON.stringify(pendingReferralsArray);
        const earnedCommission =
          parentUser.earnedCommission + Number(parentCommission);
        const pendingCommission =
          parentUser.pendingCommission - Number(parentCommission);
        await prisma.users.updateMany({
          where: { code: parentCode },
          data: {
            money: {
              increment: Number(parentCommission),
            },
            pendingCommission: pendingCommission,
            earnedCommission: earnedCommission,
            pendingReferrals: updatedPendingReferrals,
          },
        });
        if (Number(parentCommission)>0) {
          await prisma.transaction.create({
            data: {
              points: Number(parentCommission),
              type: "d",
              cur: "INR",
              email: parentUser.email,
              receiver: "Referral Bonus",
              sender: "Referral Bonus",
              name_user: parentUser.name_user,
              phone: parentUser.phone,
              token: 0,
            },
          });
        }
        await prisma.users.updateMany({
          where: {
            email: email,
          },
          data: {
            money: {
              increment: Number(childrenCommission),
            },
          },
        });
        if (Number(childrenCommission)>0) {
          await prisma.transaction.create({
            data: {
              points: Number(childrenCommission),
              type: "d",
              cur: "INR",
              email,
              receiver: "Referral Bonus",
              sender: "Referral Bonus",
              name_user,
              phone,
              token: 0,
            },
          });
        }
      }
    }

    return successResponse(res, "Funds successfully deposited");
  } catch (error) {
    console.log(error);
    console.error("Failed to deposit funds: ", error);
    return failedResponse(res, "something Went wrong");
  }
};
