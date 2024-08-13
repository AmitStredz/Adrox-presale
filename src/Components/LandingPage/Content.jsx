import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./LandingPage.css";
import "./modal.css";
import { ImagePaths } from "../ImagePath";
import {
  Container,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import RoadMap from "../../Assets/Roadmap_Final_File.webp";
import WhitePaper1 from "../../Assets/whitePaper1.webp";
import WhitePaper2 from "../../Assets/whitePaper2.webp";
import Spiral from "../../Assets/SpiralLogo.svg";
import Planet from "../../Assets/planets.svg";
import WhitePaper from "../../Assets/Whitepaper Ver One.pdf";
import ProfileSection from "./ProfileSection";
import ProfileSectionMobile from "./ProfileSectionMobile";
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
          return;
          // throw new Error("No accounts found in localStorage");
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
          return;
          // throw new Error("No accounts found in localStorage");
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

  const handleUSDTChange = (e) => {
    const value = e.target.value;
    setAdxValue(value);
    setDollarValue(value / 0.05);
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

  const handleBNBToADXChange = async (e) => {
    const value = e.target.value;

    fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.price);
        setBnbPrice(data.price);

        setBnbValue(value);
        if (data.price) {
          setDollarValue(((bnbPrice * value) / 0.05).toFixed(12));
          console.log("bnbValue: ", bnbValue);
        } else {
          setDollarValue("");
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
                width: { xs: "100%", sm: "100%", md: "-webkit-fill-available" },
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
                      disabled={selectedButton == "SOL"}
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
                      disabled={selectedButton == "SOL"}
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
                      onChange={
                        selectedButton == "USDT"
                          ? handleUSDTChange
                          : selectedButton == "BNB"
                          ? handleBNBToADXChange
                          : ""
                      }
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
      <Box position={"relative"}>
        <img
          src={ImagePaths.Top}
          alt="Top"
          width="100%"
          style={{
            filter: "hue-rotate(15deg)",
            mixBlendMode: "screen",
            filter: "brightness(0.7)",
          }}
        />
        <>
          {/* <Box p={5} position={"absolute"} bottom={110} left={0} right={0}> */}
          <Box p={5} className="about-section">
            <Container>
              <Box position={"relative"} top={{ md: -300, sm: -200, xs: -200 }}>
                <Typography
                  variant="h2"
                  color={"#FFF"}
                  textAlign={"center"}
                  fontFamily={`Brolimo`}
                  fontSize={{ md: 60, sm: 50, xs: 25 }}
                  fontWeight={600}
                  // data-aos="fade-in"
                  // data-aos-duration="1000"
                >
                  What is ADROX?
                </Typography>
                <Typography
                  variant="body1"
                  color={"#FFF"}
                  textAlign={"center"}
                  sx={{ wordBreak: "break-word" }}
                  fontFamily={"Gilroy Light"}
                  fontSize={{ md: 20, sm: 20, xs: 16 }}
                  fontWeight={600}
                  // data-aos="fade-in"
                  // data-aos-duration="1000"
                  mt={2}
                >
                  ADROX the Frontier of Future Finance, where the future of
                  cryptocurrency meets innovative technology ADROX isn't just
                  another digital currency; it's a comprehensive ecosystem
                  designed to revolutionize how we engage with blockchain
                  technology.
                </Typography>
                <Grid container spacing={2} mt={3}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    // data-aos="zoom-out-down"
                    // data-aos-duration="1000"
                  >
                    <Box
                      display={"grid"}
                      sx={{
                        placeItems: {
                          xs: "center",
                          sm: "center",
                          md: "inherit",
                        },
                      }}
                    >
                      <Box
                        border={"1px solid #fff"}
                        borderRadius={"50%"}
                        p={1}
                        display={"grid"}
                        color={"#fff"}
                        sx={{ placeItems: "center" }}
                        width={40}
                        height={40}
                      >
                        01
                      </Box>
                    </Box>
                    <Typography
                      variant="p"
                      color={"#FFF"}
                      display={"block"}
                      textAlign={{ md: "left", sm: "left", xs: "center" }}
                      fontFamily={"Gilroy Bold"}
                      fontSize={18}
                      fontWeight={700}
                      mt={2}
                    >
                      Automation and Optimization
                    </Typography>
                    <Typography
                      variant="p"
                      color={"#FFF"}
                      // textAlign={"left"}
                      // position={"relative"}
                      // top={12}
                      display={"block"}
                      textAlign={{ md: "left", sm: "left", xs: "center" }}
                      fontFamily={"Gilroy Light"}
                      fontSize={14}
                      fontWeight={400}
                      mt={1}
                    >
                      ADROX automates the management and exchange of digital
                      assets using smart contracts and advanced algorithms
                      optimizing resource allocation and reducing the need for
                      manual intervention.
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    // data-aos="zoom-out-down"
                    // data-aos-duration="1000"
                  >
                    <Box
                      display={"grid"}
                      sx={{
                        placeItems: {
                          xs: "center",
                          sm: "center",
                          md: "inherit",
                        },
                      }}
                    >
                      <Box
                        border={"1px solid #fff"}
                        borderRadius={"50%"}
                        p={1}
                        display={"grid"}
                        color={"#fff"}
                        sx={{ placeItems: "center" }}
                        width={40}
                        height={40}
                      >
                        02
                      </Box>
                    </Box>
                    <Typography
                      variant="p"
                      color={"#FFF"}
                      display={"block"}
                      textAlign={{ md: "left", sm: "left", xs: "center" }}
                      fontFamily={"Gilroy Bold"}
                      fontSize={18}
                      fontWeight={700}
                      mt={2}
                    >
                      Decentralization
                    </Typography>
                    <Typography
                      variant="p"
                      color={"#FFF"}
                      display={"block"}
                      textAlign={{ md: "left", sm: "left", xs: "center" }}
                      fontFamily={"Gilroy Light"}
                      fontSize={14}
                      fontWeight={400}
                      mt={1}
                    >
                      Operating on blockchain technology, ADROX ensures
                      security, transparency, and trust by enabling peer-to-peer
                      transactions without intermediaries, thereby minimizing
                      transaction costs and enhancing user control.
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    // data-aos="zoom-out-down"
                    // data-aos-duration="1000"
                  >
                    <Box
                      display={"grid"}
                      sx={{
                        placeItems: {
                          xs: "center",
                          sm: "center",
                          md: "inherit",
                        },
                      }}
                    >
                      <Box
                        border={"1px solid #fff"}
                        borderRadius={"50%"}
                        p={1}
                        display={"grid"}
                        color={"#fff"}
                        sx={{ placeItems: "center" }}
                        width={40}
                        height={40}
                      >
                        03
                      </Box>
                    </Box>
                    <Typography
                      variant="p"
                      color={"#FFF"}
                      display={"block"}
                      textAlign={{ md: "left", sm: "left", xs: "center" }}
                      fontFamily={"Gilroy Bold"}
                      fontSize={18}
                      fontWeight={700}
                      mt={2}
                    >
                      Comprehensive Asset Management
                    </Typography>
                    <Typography
                      variant="p"
                      color={"#FFF"}
                      display={"block"}
                      textAlign={{ md: "left", sm: "left", xs: "center" }}
                      fontFamily={"Gilroy Light"}
                      fontSize={14}
                      fontWeight={400}
                      mt={1}
                    >
                      ADROX provides a secure and user-friendly wallet for
                      storing, managing, and exchanging a wide range of digital
                      assets, supporting cross-chain compatibility and various
                      DeFi activities like lending, borrowing, anc yield
                      farming.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            {/* <Box display={{ xs: "block", sm: "block", md: "block" }}>
              <Typography
                variant="p"
                color={"#fff"}
                // sx={{
                //   background: `linear-gradient(90deg, rgba(134,106,192,1) 0%, rgba(210,122,255,1) 100%)`,
                //   "-webkit-text-fill-color": "transparent",
                //   "-webkit-background-clip": "text",
                // }}
                textAlign={"center"}
                display={"block"}
                // fontSize={60}
                // fontFamily={`Brolimo`}
                fontFamily={"Brolimo"}
                fontSize={{ md: 60, sm: 50, xs: 25 }}
                fontWeight={600}
              >
                TEAM of ADROX
              </Typography>
              <ProfileSection />
            </Box> */}
            {isMobile ? (
              <Box>
                {/* Mobile View Design */}
                <Typography
                  variant="p"
                  color={"#fff"}
                  textAlign={"center"}
                  display={"block"}
                  fontFamily={"Brolimo"}
                  fontSize={25} // Fixed font size for mobile
                  fontWeight={600}
                >
                  TEAM of ADROX
                </Typography>
                <ProfileSectionMobile />
                {/* <ProfileSection /> */}
              </Box>
            ) : (
              <Box display={{ xs: "none", sm: "none", md: "block" }}>
                {/* Desktop View Design */}
                <Typography
                  variant="p"
                  color={"#fff"}
                  textAlign={"center"}
                  display={"block"}
                  fontFamily={"Brolimo"}
                  fontSize={{ md: 60, sm: 50, xs: 25 }}
                  fontWeight={600}
                >
                  TEAM of ADROX
                </Typography>
                <ProfileSection />
              </Box>
            )}
          </Box>
        </>
      </Box>

      <Box>
        <>
          <Box
            bgcolor={"#fff"}
            p={2}
            borderRadius={"14px"}
            position={"relative"}
            // data-aos="fade-in"
            // data-aos-duration="600"
          >
            <img
              src={WhitePaper1}
              alt="Full Globe"
              width="100%"
              style={{
                marginTop: 12,
                position: "absolute",
                top: -13,
                left: 12,
                width: 100,
                height: 100,
                filter: "blur(3px)",
              }}
              // style={{ zIndex: 20, marginTop: "-1vw" }}
              height="100%"
            />
            <img
              src={WhitePaper2}
              alt="Full Globe"
              width="100%"
              style={{
                marginTop: 12,
                position: "absolute",
                bottom: -13,
                right: 12,
                width: 100,
                height: 100,
                filter: "blur(3px)",
              }}
              // style={{ zIndex: 20, marginTop: "-1vw" }}
              height="100%"
            />
            <Typography
              variant="p"
              // color={
              //   ""
              // }
              sx={{
                background: `linear-gradient(90deg, rgba(134,106,192,1) 0%, rgba(210,122,255,1) 100%)`,
                "-webkit-text-fill-color": "transparent",
                "-webkit-background-clip": "text",
              }}
              textAlign={"center"}
              display={"block"}
              // fontSize={60}
              // fontFamily={`Brolimo`}
              fontFamily={"Brolimo"}
              fontSize={{ md: 60, sm: 50, xs: 25 }}
              fontWeight={600}
            >
              White Paper
            </Typography>
            <Typography
              variant="body1"
              color={"#000"}
              fontWeight={500}
              fontSize={{ md: 19, sm: 20, xs: 15 }}
              fontFamily={"Gilroy Light"}
              textAlign={"center"}
              sx={{ wordBreak: "break-word" }}
              px={"10%"}
            >
              The ADROX whitepaper is a comprehensive document that outlines the
              technical foundation features, and vision of the Automated
              Decentralized Resource Optimization Exchange Wallet. It details
              how ADROX leverages blockchain technology smart contracts and
              advanced algorithms to automate and optimize digital asset
              management and exchanges.
            </Typography>
            <Box textAlign={"center"}>
              <a href={WhitePaper} download target="_blank">
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 25,
                    background: `linear-gradient(to right, #531085, #A102F1)`,
                    mt: 1,
                    fontFamily: "Gilroy Bold",
                    letterSpacing: 1,
                  }}
                  fontSize={22}
                >
                  Read White Paper
                </Button>
              </a>
            </Box>
          </Box>
        </>

        <Box
          mt={{ xs: 2, md: 4, sm: 2 }}
          textAlign={"center"}
          // data-aos="fade-in"
          // data-aos-duration="2000"
        >
          <Typography
            variant="p"
            color={"#FFF"}
            // fontSize={60}
            // fontFamily={`Brolimo`}
            fontFamily={"Brolimo"}
            fontSize={{ md: 60, sm: 50, xs: 25 }}
            fontWeight={600}
          >
            Road Map
          </Typography>
        </Box>
        <img
          src={RoadMap}
          alt="Full Globe"
          width="100%"
          style={{ marginTop: 12 }}
          // style={{ zIndex: 20, marginTop: "-1vw" }}
          height="100%"
          // data-aos="fade-in"
          // data-aos-duration="2000"
        />
      </Box>
      <Box className="notify-sec" my={6}>
        <Container>
          <Box mt={4} textAlign={"center"}>
            <Typography
              variant="p"
              color={"#FFF"}
              fontFamily={"Brolimo"}
              fontSize={{ md: 60, sm: 50, xs: 25 }}
              fontWeight={600}
            >
              How to Buy ADROX?
            </Typography>
          </Box>
          <Grid container spacing={2} mt={3}>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              // data-aos="zoom-out-down"
              // data-aos-duration="1000"
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(0deg, rgba(94,42,185,1) 0%, rgba(94,42,185,1) 67%, rgba(0,0,0,0.6) 100%)",
                }}
                p={4}
                borderRadius={"10px"}
                minHeight={{ xs: "auto", sm: "auto", md: 290 }}
              >
                <Box
                  display={"grid"}
                  sx={{
                    placeItems: { xs: "center", sm: "center", md: "inherit" },
                  }}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Bold"}
                  fontSize={18}
                  fontWeight={700}
                  color={"white"}
                >
                  Step 1
                </Box>
                <Typography
                  variant="p"
                  color={"#FFF"}
                  display={"block"}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Bold"}
                  fontSize={18}
                  fontWeight={700}
                  mt={2}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(161,2,241,1) 0%, rgba(209,131,248,1) 60%, rgba(255,255,255,1) 100%)",
                    "-webkit-text-fill-color": "transparent",
                    "-webkit-background-clip": "text",
                  }}
                >
                  *Connect Your Wallet*
                </Typography>
                <Typography
                  variant="p"
                  color={"#FFF"}
                  // textAlign={"left"}
                  // position={"relative"}
                  // top={12}
                  display={"block"}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Light"}
                  fontSize={14}
                  fontWeight={400}
                  mt={1}
                >
                  Connect your Metamask wallet to this website using the widget
                  at the top of the page. From there you can easily buy ADROX
                  tokens using BNB, USDT.
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              // data-aos="zoom-out-down"
              // data-aos-duration="1000"
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(0deg, rgba(94,42,185,1) 0%, rgba(94,42,185,1) 67%, rgba(0,0,0,0.6) 100%)",
                }}
                p={4}
                borderRadius={"10px"}
                minHeight={{ xs: "auto", sm: "auto", md: 290 }}
              >
                {" "}
                <Box
                  display={"grid"}
                  sx={{
                    placeItems: { xs: "center", sm: "center", md: "inherit" },
                  }}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Bold"}
                  fontSize={18}
                  fontWeight={700}
                  color={"white"}
                >
                  {" "}
                  Step 2
                </Box>
                <Typography
                  variant="p"
                  color={"#FFF"}
                  display={"block"}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Bold"}
                  fontSize={18}
                  fontWeight={700}
                  mt={2}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(161,2,241,1) 0%, rgba(209,131,248,1) 60%, rgba(255,255,255,1) 100%)",
                    "-webkit-text-fill-color": "transparent",
                    "-webkit-background-clip": "text",
                  }}
                >
                  ⁠*Buy Tokens*
                </Typography>
                <Typography
                  variant="p"
                  color={"#FFF"}
                  display={"block"}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Light"}
                  fontSize={14}
                  fontWeight={400}
                  mt={1}
                >
                  Go to the buy widget and enter the amount of tokens you wish
                  to purchase. Authorize the transactions in your wallet to
                  purchase the ADROX tokens.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              // data-aos="zoom-out-down"
              // data-aos-duration="1000"
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(0deg, rgba(94,42,185,1) 0%, rgba(94,42,185,1) 67%, rgba(0,0,0,0.6) 100%)",
                }}
                p={4}
                borderRadius={"10px"}
                minHeight={{ xs: "auto", sm: "auto", md: 290 }}
              >
                <Box
                  display={"grid"}
                  sx={{
                    placeItems: { xs: "center", sm: "center", md: "inherit" },
                  }}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Bold"}
                  fontSize={18}
                  fontWeight={700}
                  color={"white"}
                >
                  Step 3
                </Box>
                <Typography
                  variant="p"
                  color={"#FFF"}
                  display={"block"}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Bold"}
                  fontSize={18}
                  fontWeight={700}
                  mt={2}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(161,2,241,1) 0%, rgba(209,131,248,1) 60%, rgba(255,255,255,1) 100%)",
                    "-webkit-text-fill-color": "transparent",
                    "-webkit-background-clip": "text",
                  }}
                >
                  *Verify the Purchase*
                </Typography>
                <Typography
                  variant="p"
                  color={"#FFF"}
                  display={"block"}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Light"}
                  fontSize={14}
                  fontWeight={400}
                  mt={1}
                >
                  Upon completing your purchase, please copy and securely save
                  the purchase ID. This ID will be required to claim your ADROX
                  tokens at the conclusion of the presale. signature.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              // data-aos="zoom-out-down"
              // data-aos-duration="1000"
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(0deg, rgba(94,42,185,1) 0%, rgba(94,42,185,1) 67%, rgba(0,0,0,0.6) 100%)",
                }}
                p={4}
                borderRadius={"10px"}
                minHeight={{ xs: "auto", sm: "auto", md: 290 }}
              >
                <Box
                  display={"grid"}
                  sx={{
                    placeItems: { xs: "center", sm: "center", md: "inherit" },
                  }}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Bold"}
                  fontSize={18}
                  fontWeight={700}
                  color={"white"}
                >
                  Step 4
                </Box>
                <Typography
                  variant="p"
                  color={"#FFF"}
                  display={"block"}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Bold"}
                  fontSize={18}
                  fontWeight={700}
                  mt={2}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(161,2,241,1) 0%, rgba(209,131,248,1) 60%, rgba(255,255,255,1) 100%)",
                    "-webkit-text-fill-color": "transparent",
                    "-webkit-background-clip": "text",
                  }}
                >
                  *Claim Tokens*
                </Typography>
                <Typography
                  variant="p"
                  color={"#FFF"}
                  display={"block"}
                  textAlign={{ md: "left", sm: "left", xs: "center" }}
                  fontFamily={"Gilroy Light"}
                  fontSize={14}
                  fontWeight={400}
                  mt={1}
                >
                  After the presale concludes, please use your purchase ID to
                  claim your ADROX tokens. The tokens will then be transferred
                  to your designated wallet.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Box
            px={8}
            py={2}
            sx={{
              ".MuiFormControl-root": {
                borderRadius: "30px",
              },
              input: {
                padding: "24px 0 24px 16px",
              },
            }}
            // data-aos="fade-in"
            // data-aos-duration="2000"
          >
            <Box>
              <Typography
                variant="h2"
                color={"#FFF"}
                textAlign={"center"}
                fontWeight={600}
                fontSize={{ md: 60, sm: 50, xs: 25 }}
                fontFamily={"Brolimo"}
                p={{ xs: "", sm: "", md: "0 84px" }}
              >
                Get notified the moment the presale is live
              </Typography>
              <Typography
                variant="body1"
                color={"#FFF"}
                fontWeight={400}
                fontSize={{ md: 20, sm: 20, xs: 15 }}
                fontFamily={"Gilroy Light"}
                textAlign={"center"}
                sx={{ wordBreak: "break-word" }}
                p={{ xs: "", sm: "", md: "20px 158px" }}
              >
                You will receive a prompt notification the moment the ADROX
                presale becomes available ensuring you're among the first to
                know and take action.
              </Typography>
              <TextField
                placeholder="Enter the Email Address"
                id="outlined-start-adornment"
                sx={{ width: "100%", bgcolor: "#fff" }}
                fontWeight={400}
                fontSize={20}
                fontFamily={"Gilroy"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          borderRadius: 25,
                          background: `linear-gradient(180deg, #A102F1 50%, #ffffff 103%)`,
                          // padding: "8px 19px 15px 23px",
                          marginBottom: "4px",
                          fontWeight: 700,
                          fontSize: { xs: 12, sm: 12, md: 20 },
                          fontFamily: "Gilroy Bold",
                          position: "relative",
                          top: "2px",
                          left: "14px",
                        }}
                      >
                        Notify Me
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

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
