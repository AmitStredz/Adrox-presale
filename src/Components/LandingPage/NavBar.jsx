import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import RoadMap from "../../Assets/Roadmap_Final_File.webp";
// import AboutCompany from "../../Assets/About the Company.pdf";
import { ImagePaths } from "../ImagePath";
import WhitePaper from "../../Assets/Whitepaper Ver One.pdf";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
// import { Cookie } from "@mui/icons-material";
// import { IoClose } from "react-icons/io5";
import { VscDebugDisconnect } from "react-icons/vsc";

import metaLogo from "../../Assets/metaImg.webp";
import coinbaseLogo from "../../Assets/coinbaseImg.png";
import trustLogo from "../../Assets/trustImg.webp";

// import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import ErrorModal from "./errorModal";

// Polyfill Buffer for the browser
window.Buffer = window.Buffer || Buffer;

const drawerWidth = 240;

// Use Alchemy RPC endpoint
const SOLANA_NETWORK =
  "https://solana-mainnet.g.alchemy.com/v2/tTYFLcPvnWiJ0bhFXWPUtKiA8P3TTs-v";
const API_URL = "https://adrox-presale-5ab85417dddf.herokuapp.com/api/";

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnectWalletModal, setIsConnectWalletModal] = useState(false);
  const [isDisconnectModal, setIsDisconnectModal] = useState(false);
  const [errorText, setErrorText] = useState(
    "Some error occurred. Please try again later."
  );
  const [isErrorModal, setIsErrorModal] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      // Check if MetaMask or another Ethereum provider is available
      if (window.ethereum) {
        try {
          console.log("trying...");
          // Check if there's a wallet address in localStorage
          const storedAddress = localStorage.getItem("accounts");
          if (storedAddress) {
            console.log("address got...");

            // Request accounts to verify if the stored address is still connected
            const accounts = await window.ethereum.request({
              method: "eth_accounts",
            });
            if (accounts.includes(storedAddress)) {
              console.log("account includes...");

              setIsConnected(true);
              setWalletAddress(storedAddress);
            } else {
              console.log("no account includes...");

              setIsConnected(false);
              localStorage.removeItem("walletAddress");
            }
          }
          // Listen for account changes
          window.ethereum.on("accountsChanged", handleAccountsChanged);
        } catch (error) {
          console.error("Error checking wallet connection", error);
        }
      } else {
        setIsConnected(false);
        setWalletAddress("");
      }
    };

    checkWalletConnection();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );

        setWalletAddress(localStorage.getItem("walletAddress"));
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    console.log("3");
    if (accounts.length > 0) {
      setIsConnected(true);
      setWalletAddress(accounts.toString());

      console.log("acccounts: ", accounts);

      localStorage.setItem("walletAddress", accounts);
      localStorage.setItem("accounts", accounts);
    } else {
      setIsConnected(false);
    }
  };

  const connectMetaMask = async () => {
    setIsConnectWalletModal(false);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isMetaMaskApp = window.ethereum?.isMetaMask;
    console.log("MetaMask detected:", isMetaMaskApp);

    if (isMobile && !isMetaMaskApp) {
      const deepLink = "https://metamask.app.link/dapp/adroxmarket.com";
      window.open(deepLink, "_blank");
    } else if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        handleAccountsChanged(
          await window.ethereum.request({ method: "eth_accounts" })
        );
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      setErrorText("Metamask Wallet not found.");
      setIsErrorModal(true);
      console.error("MetaMask not detected");
    }
  };

  const connectTrustWallet = async () => {
    setIsConnectWalletModal(false);
    const isTrustWallet = window.ethereum?.isTrust;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isTrustWallet) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        handleAccountsChanged(
          await window.ethereum.request({ method: "eth_accounts" })
        );
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else if (isMobile) {
      const deepLink =
        "https://link.trustwallet.com/open_url?coin_id=60&url=https://adroxmarket.com";
      window.open(deepLink, "_blank");
    } else {
      setErrorText("Trust Wallet not found.");
      setIsErrorModal(true);
      console.log("Trust Wallet not detected");
    }
  };

  const connectCoinbaseWallet = async () => {
    setIsConnectWalletModal(false);
    try {
      const coinbaseWallet = new CoinbaseWalletSDK({
        appName: "AdroxMarket",
        appLogoUrl: window.location.origin + "/logo.png",
        darkMode: false,
      });
      const ethereum = coinbaseWallet.makeWeb3Provider(SOLANA_NETWORK, 1);
      await ethereum.request({ method: "eth_requestAccounts" });
      handleAccountsChanged(await ethereum.request({ method: "eth_accounts" }));
    } catch (error) {
      setErrorText("Coinbase Wallet not found");
      setIsErrorModal(true);
      console.error("User denied account access", error);
    }
  };

  const switchWallet = (walletType) => {
    switch (walletType) {
      case "metamask":
        connectMetaMask();
        break;
      case "trustwallet":
        connectTrustWallet();
        break;
      case "coinbasewallet":
        connectCoinbaseWallet();
        break;
      default:
        console.error("Unsupported wallet type");
    }
  };

  const handleDisconnectButton = () => {
    localStorage.removeItem("accounts");
    localStorage.removeItem("walletAddress");
    setIsConnected(false);
    setIsDisconnectModal(false);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box>
        <img src={ImagePaths.Logo.default} alt="ADROX" className="logo" />
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <a href={WhitePaper} download target="_blank">
              <Button
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontFamily: `Gilroy Light, "sans-serif"`,
                }}
              >
                White Paper
              </Button>
            </a>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <a href={RoadMap} download target="_blank">
              <Button
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontFamily: `Gilroy Light, "sans-serif"`,
                }}
              >
                Road Map
              </Button>
            </a>
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <a href={AboutCompany} download target="_blank">
              <Button
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontFamily: `Gilroy Light, "sans-serif"`,
                }}
              >
                About
              </Button>
            </a>
          </ListItemButton>
        </ListItem> */}
      </List>

      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        flexDirection={"column"}
      >
        <Box>
          <a href="https://www.instagram.com/adroxmarket/" target="_blank">
            <IconButton color="inherit" sx={{ p: 0 }}>
              <img src={ImagePaths.Instagram.default} alt="instagram" />
            </IconButton>
          </a>
          <a href="" target="">
            <IconButton color="inherit" sx={{ p: 0 }}>
              <img src={ImagePaths.FaceBook.default} alt="facebook" />
            </IconButton>
          </a>
          <a href="https://x.com/adroxorg?s=21" target="_blank">
            <IconButton color="inherit" sx={{ p: 0 }}>
              <img src={ImagePaths.Twitter.default} alt="twitter" />
            </IconButton>
          </a>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        className="appBar"
        id="master"
        sx={{
          background: "#8d5bff80",
          py: 1,
          px: 0,
        }}
      >
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: { xs: "5px", sm: "50px", md: "inherit" },
              alignItems: "center",
            }}
          >
            <Box>
              <img src={ImagePaths.Logo.default} alt="ADROX" className="logo" />
            </Box>

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // width: "100%",
                gap: "5px",
              }}
            >
              {/* <Button
                onClick={() => setIsConnectWalletModal(!isConnectWalletModal)}
                className="connectWalletButton"
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontFamily: `Gilroy Light, "sans-serif"`,
                  display: { md: "none" },
                  fontSize: { xs: "12px", sm: "14px" },
                }}
              >
                {walletAddress
                  ? walletAddress.slice(0, 5) +
                    "....." +
                    walletAddress.slice(-5)
                  : "Connect Wallet"}
              </Button> */}


              {/* this is the actual button */}
              {/* {!isConnected ? (
                <Button
                  onClick={() => setIsConnectWalletModal(!isConnectWalletModal)}
                  className="connectWalletButton"
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontFamily: `Gilroy Light, "sans-serif"`,

                    display: { md: "none" },
                    fontSize: { xs: "12px", sm: "14px" },
                  }}
                >
                  {" "}
                  Connect Wallet
                  
                </Button>
              ) : (
                <Button
                  onClick={() => setIsDisconnectModal(!isDisconnectModal)}
                  className="connectWalletButton"
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontFamily: `Gilroy Light, "sans-serif"`,

                    display: { md: "none" },
                    fontSize: { xs: "12px", sm: "14px" },
                  }}
                >
                  {walletAddress
                    ? walletAddress.slice(0, 5) +
                      "....." +
                      walletAddress.slice(-5)
                    : "Connect Wallet"}
                </Button>
              )} */}

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none", xs: "flex" } }}
              >
                <MenuIcon />
              </IconButton>

              {isDisconnectModal && (
                <div
                  className="connect-wallet-popup absolute items-center gap-1 p-2 px-3 flex md:hidden top-10 text-center font-risque text-white bg-gradient-to-tr from-[#130221] to-[#4F1A7F] rounded-xl cursor-pointer"
                  data-aos="fade-in"
                  onClick={handleDisconnectButton}
                >
                  <VscDebugDisconnect />
                  Disconnect
                </div>
              )}
            </div>

            <Box
              display={{ xs: "none", sm: "none", md: "flex" }}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <a href={WhitePaper} download target="_blank">
                <Button
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontFamily: `Gilroy Light, "sans-serif"`,
                  }}
                >
                  White Paper
                </Button>
              </a>
              <a href={RoadMap} download target="_blank">
                <Button
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontFamily: `Gilroy Light, "sans-serif"`,
                  }}
                >
                  Road Map
                </Button>
              </a>
              {/* <a href={AboutCompany} download target="_blank">
                <Button
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontFamily: `Gilroy Light, "sans-serif"`,
                  }}
                >
                  About
                </Button>
              </a> */}
            </Box>

            <div className="relative">
              <Box
                display={{ xs: "none", sm: "none", md: "flex" }}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                {/* <Button
                    onClick={() => setIsConnectWalletModal(!isConnectWalletModal)}
                    className="connectWalletButton"
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      fontFamily: `Gilroy Light, "sans-serif"`,
                      display: { xs: "none", md: "flex" },
                    }}
                  >
                    {walletAddress
                      ? walletAddress.slice(0, 5) +
                        "....." +
                        walletAddress.slice(-5)
                      : "Connect Wallet"}
                  </Button> */}

                {/* this is the actual button */}
                {/* {!isConnected ? (
                  <Button
                    onClick={() =>
                      setIsConnectWalletModal(!isConnectWalletModal)
                    }
                    className="connectWalletButton"
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      fontFamily: `Gilroy Light, "sans-serif"`,
                      display: { xs: "none", md: "flex" },
                    }}
                  >
                    Connect Wallet
                    
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsDisconnectModal(!isDisconnectModal)}
                    className="connectWalletButton"
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      fontFamily: `Gilroy Light, "sans-serif"`,
                      display: { xs: "none", md: "flex" },
                    }}
                  >
                    {walletAddress
                      ? walletAddress.slice(0, 5) +
                        "....." +
                        walletAddress.slice(-5)
                      : "Connect Wallet"}
                  </Button>
                )} */}
                <a
                  href="https://www.instagram.com/adroxmarket/"
                  target="_blank"
                >
                  <IconButton color="inherit" sx={{ p: 0 }}>
                    <img src={ImagePaths.Instagram.default} alt="instagram" />
                  </IconButton>
                </a>
                <a href="" target="">
                  <IconButton color="inherit" sx={{ p: 0 }}>
                    <img src={ImagePaths.FaceBook.default} alt="facebook" />
                  </IconButton>
                </a>
                <a href="https://x.com/adroxorg?s=21" target="_blank">
                  <IconButton color="inherit" sx={{ p: 0 }}>
                    <img src={ImagePaths.Twitter.default} alt="twitter" />
                  </IconButton>
                </a>
              </Box>
              {isConnectWalletModal && (
                <div
                  className="connect-wallet-popup absolute flex flex-col gap-3 top-10 md:-left-20 max-md:-right-5  w-80 p-10 text-center font-risque text-white bg-gradient-to-tr from-[#130221] to-[#4F1A7F] rounded-xl"
                  data-aos="fade-in"
                >
                  <div className="heading flex justify-evenly items-center">
                    <span className="text-[24px]">Connect Wallet</span>
                  </div>
                  <div className="options flex flex-col gap-3">
                    <div
                      className="flex justify-between p-2 bg-[#B772D9] rounded-lg cursor-pointer"
                      onClick={connectMetaMask}
                    >
                      <span className="text-black font-semibold">
                        Metamask Wallet
                      </span>
                      <img src={metaLogo} alt="metamask" className="w-6" />
                    </div>
                    <div
                      className="flex justify-between p-2 bg-[#B772D9] rounded-lg cursor-pointer"
                      onClick={connectCoinbaseWallet}
                    >
                      <span className="text-black font-semibold">
                        Coinbase Wallet
                      </span>
                      <img
                        src={coinbaseLogo}
                        alt="coinbase"
                        className="w-6 rounded-full"
                      />
                    </div>
                    <div
                      className="flex justify-between p-2 bg-[#B772D9] rounded-lg cursor-pointer"
                      onClick={connectTrustWallet}
                    >
                      <span className="text-black font-semibold">
                        Trust Wallet
                      </span>
                      <img src={trustLogo} alt="trustWallet" className="w-6" />
                    </div>
                  </div>
                </div>
              )}

              {isDisconnectModal && (
                <div
                  className="connect-wallet-popup absolute items-center gap-1 p-2 px-5 hidden md:flex text-center font-risque text-white bg-gradient-to-tr from-[#130221] to-[#4F1A7F] rounded-xl cursor-pointer"
                  data-aos="fade-in"
                  onClick={handleDisconnectButton}
                >
                  <VscDebugDisconnect />
                  Disconnect
                </div>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          className="drawer-bg"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {isErrorModal && (
        <ErrorModal
          errorText={errorText}
          closeModal={() => setIsErrorModal(false)}
        />
      )}
    </Box>
  );
}

export default NavBar;
