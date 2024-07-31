import React, { lazy, Suspense, useEffect, useState } from "react";

// import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./LandingPage.css";
import "./modal.css";
import { ImagePaths } from "../ImagePath";
import { InputAdornment, TextField, useMediaQuery } from "@mui/material";

import Spiral from "../../Assets/SpiralLogo.svg";
import Planet from "../../Assets/planets.svg";
import GroupIcon from "../../Assets/Group.svg";
import ProtoColIcon from "../../Assets/Protocol Icon.svg";
import USDTIcon from "../../Assets/usdt.jpg";
import BNBIcon from "../../Assets/bnb.jpg";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

// import {
//   Connection,
//   PublicKey,
//   Transaction,
//   SystemProgram,
//   LAMPORTS_PER_SOL,
// } from "@solana/web3.js";
import axios from "axios";
import { Buffer } from "buffer";

import { TailSpin } from "react-loader-spinner"; //loading spinner

import Web3 from "web3";
import BigNumber from "bignumber.js";
import AdroxIcon from "./AdroxIcon";
import AdroxText from "./AdroxText";
import SuccessIcon from "./SuccessIcon";
import MiniAdroxIcon from "./MiniAdroxIcon";
import CopyIcon from "./CopyIcon";
import CloseIcon from "./CloseIcon";

import ErrorModal from "./errorModal";

import Part1 from "./contentPages/part1"
import Part2 from "./contentPages/part2"
import Part3 from "./contentPages/part3"
import Part4 from "./contentPages/part4";

const Container = lazy(() => import("@mui/material/Container"));
const Box = lazy(() => import("@mui/material/Box"));

// const Part1 = lazy(() => import("./contentPages/part1"));
// const Part2 = lazy(() => import("./contentPages/part2"));
// const Part3 = lazy(() => import("./contentPages/part3"));
// const Part4 = lazy(() => import("./contentPages/part4"));

// Polyfill Buffer for the browser
window.Buffer = window.Buffer || Buffer;

// Use Alchemy RPC endpoint
const SOLANA_NETWORK =
  "https://solana-mainnet.g.alchemy.com/v2/tTYFLcPvnWiJ0bhFXWPUtKiA8P3TTs-v";
const API_URL = "https://adrox-presale-5ab85417dddf.herokuapp.com/api/";

const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955"; // Replace with BEP-20 USDT contract address
const USDTAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "_decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "mint",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

function Content() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [selectedButton, setSelectedButton] = useState("USDT");
  const [icon1, setIcon1] = useState(USDTIcon);
  const [adxValue, setAdxValue] = useState("");
  const [dollarValue, setDollarValue] = useState("");

  const [walletAdress, setWalletAdress] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [amountAdrox, setAmountAdrox] = useState("");
  const [purchaseId, setPurchaseId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [errorText, setErrorText] = useState(
    "Some error occurred. Please try again later."
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(purchaseId);
    // setShowModal(true);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    setWalletAdress(localStorage.getItem("walletAddress"));
  }, []);

  const sendUsdtTransaction = async () => {
    if (isloading) return;
    setIsLoading(true);

    if (dollarValue <= 0) {
      setErrorText("Enter a valid amount");
      setIsErrorModal(true);
      setIsLoading(false);
      return;
    }
    console.log("USDT Transaction Processed...");

    // console.log("resp: ", resp.transaction.amount_adrox);
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const usdtContract = new web3.eth.Contract(USDTAbi, USDTContractAddress);

      try {
        // handleOpenModal();
        console.log("1 - Retrieving accounts from localStorage...");
        const accounts = localStorage.getItem("accounts");
        console.log("accounts: ", accounts);

        if (!accounts) {
          setErrorText(
            "No wallet found. Please connect to a Wallet and try again."
          );
          setIsErrorModal(true);
          console.error("No accounts found in localStorage");
          throw new Error("No accounts found in localStorage");
        }

        console.log("1");
        // console.log(walletAddress)
        // console.log({ from: accounts[0] })
        const amountInWei = new BigNumber(adxValue)
          .multipliedBy("1000000000000000000")
          .toFixed();
        console.log("2");

        const tx = await usdtContract.methods
          .transfer("0x924D486A046111347aA357D7de21389D1737e06B", amountInWei)
          .send({ from: accounts });

        console.log("3");
        setTransactionHash(tx.transactionHash);

        console.log("WalletAdress: ", accounts);
        console.log("AmountUSDT: ", adxValue);
        console.log("transactionHash: ", tx.transactionHash);

        const response = await axios.post(
          "https://adrox-presale-bsc-b25278e12a02.herokuapp.com/api/transactions/create_transaction/",
          {
            wallet_address: accounts,
            amount_usdt: adxValue, // Send dollar value since it represents the amount in USDT
            transaction_hash: tx.transactionHash,
          }
        );

        console.log("amount_adrox: ", response.data.transaction.amount_adrox);
        console.log("purchase_id: ", response.data.purchase.purchase_id);

        setAmountAdrox(response.data.transaction.amount_adrox);
        setPurchaseId(response.data.purchase.purchase_id);

        handleOpenModal();
      } catch (error) {
        console.error("Transaction failed", error);
        setErrorText("Some error occurred. Please try again later.");
        setIsErrorModal(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("MetaMask not detected");
      setIsLoading(false);
    }
  };

  // const sendBnbTransaction = async () => {
  //   if (isloading) return;
  //   setIsLoading(true);
  //   console.log("BNB Transaction Processed...");
  //   if (window.ethereum) {
  //     const web3 = new Web3(window.ethereum);

  //     try {
  //       console.log("1");
  //       const accounts = localStorage.getItem("accounts");

  //       const amountInWei = new BigNumber(bnbValue)
  //         .multipliedBy("1000000000000000000")
  //         .toFixed();
  //       console.log(accounts)
  //       const tx = await web3.eth.sendTransaction({
  //         from: accounts,
  //         to: "0x924D486A046111347aA357D7de21389D1737e06B",
  //         value: amountInWei,
  //       });
  //       console.log("2");

  //       setTransactionHash(tx.transactionHash);

  //       const response = await axios.post(
  //         "https://adrox-presale-bsc-b25278e12a02.herokuapp.com/api/transactions/create_transaction/",
  //         {
  //           wallet_address: accounts,
  //           amount_usdt: bnbValue,
  //           transaction_hash: tx.transactionHash,
  //         }
  //       );
  //       console.log("3");

  //       setAmountAdrox(response.data.transaction.amount_adrox);
  //       setPurchaseId(response.data.purchase.purchase_id);

  //       handleOpenModal();
  //     } catch (error) {
  //       console.error("Transaction failed", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     console.error("MetaMask not detected");
  //     setIsLoading(false);
  //   }
  // };
  const sendBnbTransaction = async () => {
    if (isloading) return;
    setIsLoading(true);

    if (dollarValue <= 0) {
      setErrorText("Enter a valid amount to buy.");
      setIsErrorModal(true);
      setIsLoading(false);
      return;
    }

    console.log("BNB Transaction Processed...");

    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      console.log("Heloo");
      try {
        console.log("1 - Retrieving accounts from localStorage...");
        const accounts = localStorage.getItem("accounts");

        if (!accounts) {
          setErrorText(
            "No wallet found. Please connect to a Wallet and try again."
          );
          setIsErrorModal(true);
          console.error("No accounts found in localStorage");
          throw new Error("No accounts found in localStorage");
        }

        let parsedAccounts;
        // try {
        //   parsedAccounts = JSON.parse(accounts);
        // } catch (jsonError) {
        //   console.error("Failed to parse accounts JSON from localStorage:", jsonError);
        //   throw new Error("Failed to parse accounts JSON from localStorage");
        // }

        // if (!Array.isArray(parsedAccounts) || parsedAccounts.length === 0) {
        //   console.error("Parsed accounts is not a valid array or is empty");
        //   throw new Error("Parsed accounts is not a valid array or is empty");
        // }

        console.log("bnbValue: ", bnbValue);
        console.log("adxValue: ", dollarValue);
        const amountInWei = new BigNumber(bnbValue)
          .multipliedBy("1000000000000000000")
          .toFixed();

        console.log("2 - Sending transaction...");
        const tx = await web3.eth.sendTransaction({
          from: accounts,
          to: "0x924D486A046111347aA357D7de21389D1737e06B",
          value: amountInWei,
        });
        console.log("Transaction sent successfully:", tx);

        setTransactionHash(tx.transactionHash);

        console.log("3 - Recording transaction in the backend...");
        const response = await axios.post(
          "https://adrox-presale-bsc-b25278e12a02.herokuapp.com/api/transactions/create_transaction/",
          {
            wallet_address: parsedAccounts[0],
            amount_usdt: bnbValue,
            transaction_hash: tx.transactionHash,
          }
        );

        console.log("Transaction recorded successfully:", response.data);

        setAmountAdrox(response.data.transaction.amount_adrox);
        setPurchaseId(response.data.purchase.purchase_id);

        handleOpenModal();
      } catch (error) {
        console.log("eroor");
        console.error("Transaction failed", error);

        if (error?.code) {
          setErrorText("There was some error. Please try again later.");
          setIsErrorModal(true);
          console.error("Error code:", error?.error);
        }
        if (error?.message) {
          setErrorText("There was some error. Please try again later.");

          setIsErrorModal(true);
          console.error("Error message:", error.message);
        }
        if (error?.data) {
          setErrorText("There was some error. Please try again later.");
          setIsErrorModal(true);
          console.error("Error data:", error.data);
        } else {
          setErrorText("Some error occured. Please try again.");
          setIsErrorModal(true);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorText(
        "Metamask Wallet not detected. Please connect to Metamask Wallet and try again."
      );
      setIsErrorModal(true);
      console.error("MetaMask not detected");
      setIsLoading(false);
    }
  };

  const sendCoinbaseUsdtTransaction = async () => {
    if (isloading) return;
    setIsLoading(true);

    console.log("USDT Transaction Processed...");

    if (window.ethereum && window.ethereum.isCoinbaseWallet) {
      const coinbaseWallet = new CoinbaseWalletSDK({
        appName: "AdroxMarket",
        appLogoUrl: window.location.origin + "/logo.png",
        darkMode: false,
      });
      const ethereum = coinbaseWallet.makeWeb3Provider(SOLANA_NETWORK, 1);
      const web3 = new Web3(ethereum);
      const usdtContract = new web3.eth.Contract(USDTAbi, USDTContractAddress);

      try {
        const accounts = localStorage.getItem("accounts");
        const amountInWei = new BigNumber(adxValue)
          .multipliedBy("1000000000000000000")
          .toFixed();

        const tx = await usdtContract.methods
          .transfer("0x924D486A046111347aA357D7de21389D1737e06B", amountInWei)
          .send({ from: accounts });

        setTransactionHash(tx.transactionHash);

        const response = await axios.post(
          "https://adrox-presale-bsc-b25278e12a02.herokuapp.com/api/transactions/create_transaction/",
          {
            wallet_address: accounts,
            amount_usdt: adxValue,
            transaction_hash: tx.transactionHash,
          }
        );

        setAmountAdrox(response.data.transaction.amount_adrox);
        setPurchaseId(response.data.purchase.purchase_id);

        handleOpenModal();
      } catch (error) {
        setErrorText("Some error occurred. Please try again later.");
        setIsErrorModal(true);

        console.error("Transaction failed", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorText(
        "Coinbase Wallet not detected. Please connect to Coinbase Wallet and try again."
      );
      setIsErrorModal(true);
      console.error("Coinbase Wallet not detected");
      setIsLoading(false);
    }
  };

  const handleDollarChange2 = (e) => {
    const value = e.target.value;
    setDollarValue(value);
    setAdxValue(value * 0.05);
  };

  const [bnbValue, setBnbValue] = useState("");
  const [bnbPrice, setBnbPrice] = useState("");

  const [solValue, setSolValue] = useState("");
  const [solPrice, setSolPrice] = useState("");

  const HandleBnbChange = async (e) => {
    const value = e.target.value;

    fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.price);
        setBnbPrice(data.price);

        setDollarValue(value);
        if (data.price) {
          setBnbValue(((0.05 / bnbPrice) * value).toFixed(12));
          console.log("bnbValue: ", bnbValue);
        } else {
          setBnbValue("");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const HandleSolChange = async (e) => {
    const value = e.target.value;

    fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.price);
        setBnbPrice(data.price);

        setDollarValue(value);
        if (data.price) {
          setSolValue(((0.05 / solPrice) * value).toFixed(12));
          console.log("solValue: ", solValue);
        } else {
          setSolValue("");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleButtonClick = (currency) => {
    setSelectedButton(currency);
    if (currency === "USDT") {
      setIcon1(USDTIcon);
      setDollarValue("");
      setAdxValue("");
    } else if (currency === "BNB") {
      setIcon1(BNBIcon);
      setDollarValue("");
      setBnbValue("");

      fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.price);
          setBnbPrice(data.price);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (currency === "SOL") {
      setIcon1(ProtoColIcon);
      setDollarValue("");

      setSolValue("");

      fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.price);
          setSolPrice(data.price);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const buttonStyles = (currency) => ({
    borderRadius: 25,
    border: "solid 0.1px",
    background:
      selectedButton === currency
        ? `linear-gradient(to right, #531085, #A102F1)`
        : "transparent",
  });

  return (
    <Box
      pt={{ xs: 15, sm: 18, md: 25 }}
      sx={{
        // background: `linear-gradient(90deg, rgba(96,30,249,1) 0%, rgba(255,255,255,1) 100%)`,
        background:
          "linear-gradient(180deg, rgba(49,21,96,1) 0%, rgba(21,7,32,1) 100%)",
      }}
    >
      <Suspense fallback="Loading...">
        <Container>
          <Grid
            container
            spacing={3}
            className="top-sectio"
            position={"relative"}
          >
            <Box
              position={"absolute"}
              top={0}
              bottom={0}
              right={0}
              left={0}
              zIndex={10}
              sx={{
                img: {
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "-webkit-fill-available",
                  },
                  opacity: 0.5,
                },
              }}
            >
              <img src={Spiral} alt="" />
            </Box>
            <Box
              position={"absolute"}
              // top={0}
              bottom={-100}
              right={0}
              left={0}
              zIndex={1}
              display={{ xs: "none", sm: "none", md: "block" }}
            >
              <img src={Planet} alt="" />
            </Box>
            <Grid item xs={12} md={6} className="heroContent">
              <Box
                display={"grid"}
                sx={{
                  img: {
                    height: { xs: 60, sm: "auto", md: "auto" },
                  },
                  placeItems: { xs: "center", sm: "center", md: "inherit" },
                }}
                // data-aos="fade-in"
                //               data-aos-duration="1000"
              >
                <img src={ImagePaths.Text.default} alt="ADROX" className="" />
              </Box>
              <Typography
                component={"h5"}
                fontSize={30}
                textAlign={{ xs: "center", sm: "center", md: "left" }}
                textTransform={"capitalize"}
                sx={{ wordSpacing: "4px", letterSpacing: "2px" }}
                pt={1}
                color={"#fff"}
                fontFamily={`Gilroy Light`}
                marginTop={"25px"}
                fontWeight={489}
                // data-aos="fade-in"
                // data-aos-duration="1000"
              >
                Automated Decentralized Resource Optimization Exchange Wallet
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                border={"1px solid #fff"}
                borderRadius={8}
                position={"relative"}
                zIndex={40}
                p={{ xs: "24px", sm: "32px", md: "48px" }}
                m={{ xs: "0 16px", sm: "0 16px", md: "0 30px 0 131px" }}
                sx={{
                  background:
                    "linear-gradient(180deg, #8d5bff80 8%, #ffffff 143%)",
                }}
                // data-aos="fade-in"
                // data-aos-duration="1000"
              >
                <Box textAlign={"center"}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color={"#fff"}
                    fontFamily={`Gilroy Bold`}
                    fontSize={30}
                  >
                    Presale is live now
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={"#fff"}
                    // paddingTop={"20px"}
                    fontFamily={`Gilroy Bold`}
                    fontSize={40}
                    paddingBottom={"0.7rem"}
                  >
                    1 ADX = 0.05$
                  </Typography>
                </Box>
                <Grid spacing={2} mt={3} marginTop={"1px"}>
                  <Grid spacing={2} item xs={12}>
                    <div className="flex gap-3">
                      {["USDT", "BNB", "SOL"].map((currency) => (
                        <Button
                          key={currency}
                          variant="contained"
                          onClick={() => handleButtonClick(currency)}
                          fullWidth
                          sx={buttonStyles(currency)}
                          fontFamily={`Gilroy Light`}
                          fontSize={19}
                        >
                          {currency}
                        </Button>
                      ))}
                      {/* <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: 25,
                        border: "solid 0.1px",
                        background: "transparent"
                        // background: `linear-gradient(to right, #531085, #A102F1)`,
                      }}
                      fontFamily={`Gilroy Light`}
                      fontSize={19}
                    >
                      USDT
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: 25,
                        border: "solid 0.1px",
                        background: "transparent"
                        // background: `linear-gradient(to right, #531085, #A102F1)`,
                      }}
                      fontFamily={`Gilroy Light`}
                      fontSize={19}
                    >
                     BNB
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleButtonClick}
                      sx={{
                        borderRadius: 25,
                        border: "solid 0.1px",
                        background: "transparent"
                        // background: `linear-gradient(to right, #531085, #A102F1)`,
                      }}
                      fontFamily={`Gilroy Light`}
                      fontSize={19}
                    >
                      SOL
                    </Button> */}
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={12} md={20} mt={2}>
                    <Box
                      sx={{
                        ".MuiInputBase-root": {
                          borderRadius: "34px",
                          border: "1px solid white",
                          padding: "7px 0 7px 7px",
                        },
                        input: {
                          padding: "10px 0 10px 6px",
                        },
                      }}
                    >
                      <TextField
                        // value={adroxTokens}
                        // onChange={handleAdroxChange}
                        placeholder="Number of Adrox to buy"
                        id="outlined-start-adornment"
                        fullWidth
                        sx={{ bgcolor: "transparent" }}
                        // onChange={handleDollarChange2}
                        onChange={
                          selectedButton == "USDT"
                            ? handleDollarChange2
                            : selectedButton == "BNB"
                            ? HandleBnbChange
                            : selectedButton == "SOL"
                            ? HandleSolChange
                            : ""
                        }
                        fontWeight={900}
                        fontSize={20}
                        fontFamily={"Gilroy"}
                        value={dollarValue}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <img src={GroupIcon} alt="Group Icon" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={20} mt={3}>
                    <Box
                      sx={{
                        ".MuiInputBase-root": {
                          borderRadius: "34px",
                          border: "1px solid white",
                          padding: "7px 0 7px 7px",
                        },
                        input: {
                          padding: "10px 0 10px 6px",
                        },
                      }}
                    >
                      <TextField
                        // disabled
                        // value={solAmount}
                        placeholder="0  "
                        id="outlined-start-adornment"
                        fullWidth
                        value={
                          selectedButton == "USDT"
                            ? adxValue
                            : selectedButton == "BNB"
                            ? bnbValue
                            : selectedButton == "SOL"
                            ? solValue
                            : "0"
                        }
                        onChange={handleDollarChange2}
                        // onChange={(setSelectedButton == "USDT")? handleDollarChange2 : (setSelectedButton == "BNB")? HandleBnbChange : ""}
                        // value={adxValue}

                        sx={{ bgcolor: "transparent" }}
                        fontWeight={900}
                        fontSize={20}
                        fontFamily={"Gilroy"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <img
                                src={icon1}
                                style={{
                                  height: "34px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  objectFit: "fill",
                                }}
                                alt="Protocol Icon"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  gap={3}
                  mt={4}
                >
                  <Button
                    // disabled={selectedButton == "SOL"}
                    onClick={
                      selectedButton == "USDT"
                        ? sendUsdtTransaction
                        : selectedButton == "BNB"
                        ? sendBnbTransaction
                        : ""
                    }
                    variant="contained"
                    fullWidth
                    sx={{
                      display: "flex",
                      gap: "10px",
                      borderRadius: 25,
                      background: `linear-gradient(to right, #531085, #A102F1)`,
                      fontWeight: "bold",
                    }}
                    fontFamily={`Gilroy Bold`}
                    fontSize={22}
                  >
                    {isloading
                      ? ""
                      : `${
                          selectedButton == "SOL" ? "Coming Soon..." : "Buy Now"
                        }`}
                    {isloading ? (
                      <TailSpin
                        visible={true}
                        height="30"
                        width="30"
                        color="white"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      <></>
                    )}
                  </Button>
                  {/* <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 25,
                    border: "1px solid #8f05d8",
                    color: "#8f05d8",
                    // border: "1px solid #8f05d8",
                    // color: "##8f05d8",
                    fontWeight: "bold",
                  }}
                  fontFamily={`Gilroy Bold`}
                  fontSize={22}
                >
                  Claim Now
                </Button> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Suspense>

      {/* <Suspense fallback="Loading..."> */}
        <Part1></Part1>
      {/* </Suspense> */}

      {/* <Suspense fallback="Loading..."> */}
        <Part2></Part2>
      {/* </Suspense> */}

      {/* <Suspense fallback="Loading..."> */}
        <Part3></Part3>
      {/* </Suspense> */}

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-btn">
              <div
                onClick={handleCloseModal}
                style={{
                  cursor: "pointer",
                }}
              >
                <CloseIcon />
              </div>
            </div>
            <header>
              <AdroxIcon />
              <AdroxText />
            </header>
            <div className="transaction-confirmation-txt">
              <p>Transaction Completed</p>
            </div>
            <div className="success-icon">
              <SuccessIcon />
            </div>
            <div className="adx-amt">
              <span style={{ fontSize: "25px" }}>
                {amountAdrox ? amountAdrox : "0.00"}
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1px",
                    background: "#AB00FF",
                    borderRadius: "50px",
                    margin: "0 4px",
                    height: "20px",
                  }}
                >
                  <MiniAdroxIcon />
                </span>
                <span>ADX</span>
              </span>
            </div>
            <div className="purchase-info">
              <div className="title">ADX Token Purchase ID</div>
              <div className="purchase-id-box">
                {purchaseId ? purchaseId : "purchase_Id"}
              </div>

              {!copied ? (
                <div
                  style={{
                    fontSize: "14px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: "3px",
                    textDecoration: "underline",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <CopyIcon/> */}
                    {/* <img 
                  src={CopyIcon} 
                  alt="copy"
                  style={{
                    height:"5px",
                    width:"5px"
                  }}
                  /> */}
                    <CopyIcon />
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleCopyToClipboard}
                  >
                    Copy to Clipboard
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "14px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: "3px",
                    // textDecoration: "underline",
                  }}
                >
                  Copied...
                </div>
              )}
            </div>
            <div className="imp-note">
              <b>Important note:</b>
              <p>
                Save your purchase ID to claim your tokens once the presale
                ends.
              </p>
            </div>
            {/* <button onClick={handleCloseModal}>Close Modal</button> */}
          </div>
        </div>
      )}

      {/* {isErrorModal && (
        <div className="modal-overlay" data-aos="fade-in">
          <div
            className="flex flex-col gap-3 p-10 bg-gradient-to-tr from-[#0F011A] to-[#521B84] rounded-2xl"
            data-aos="zoom-in"
          >
            <div className="flex justify-end">
              <div
                onClick={() => setIsErrorModal(false)}
                style={{
                  cursor: "pointer",
                }}
              >
                <CloseIcon className="max-w-5" />
              </div>
            </div>
            <span className="text-red-500">
              Some Error occurred. Please try again later
            </span>
          </div>
        </div>
      )} */}

      {isErrorModal && (
        <ErrorModal
          errorText={errorText}
          closeModal={() => setIsErrorModal(false)}
        />
      )}
    </Box>
  );
}

export default Content;
