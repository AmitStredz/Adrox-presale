import React from "react";
import { ImagePaths } from "../ImagePath";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import "./LandingPage.css";
import { Grid } from "@mui/material";
import AdraxLogo from "../../Assets/ADROX.png";
import { useNavigate } from "react-router-dom";

// display: flex;
//     gap: 41px;
//     justify-content: center;
//     padding: 19px;

function Footer() {
  const navigate = useNavigate();

  return (
    <Box
      position={"relative"}
      className="footer"
      p={{ xs: 1, sm: 1, md: "14px 14px 0 14px" }}
      style={{ borderRadius: "50px 50px 0px 0px", background: "#523486" }}
    >
      <Box
        bgcolor={"#0e0321"}
        width={"100%"}
        height={200}
        position={"absolute"}
        left={0}
        right={0}
        top={-50}
        zIndex={-1}
      ></Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box display={"grid"} sx={{ placeItems: "center" }}>
            <img
              src={ImagePaths.Logo.default}
              alt="ADROX"
              className="footerLogo"
            />
          </Box>
          <Box
            display={"flex"}
            gap={{ xs: "12px", sm: "12px", md: "41px" }}
            justifyContent="center"
            padding={{ xs: "12px", sm: "12px", md: "19px" }}
            ml={2}
          >
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
        </Grid>
        <Grid item xs={6} md={3}>
          <Box>
            <ul>
              <li>
                <Typography variant="h5" textAlign={"left"}>
                  Services
                </Typography>
              </li>
              <li>
                <Typography variant="body1" textAlign={"left"}>
                  Help Center
                </Typography>
              </li>
              <li>
                <Typography variant="body1" textAlign={"left"}>
                  Submit a Ticket
                </Typography>
              </li>
              <li>
                <Typography variant="body1" textAlign={"left"}>
                  Fees & VIP
                </Typography>
              </li>
              <li>
                <Typography variant="body1" textAlign={"left"}>
                  Ticket Verification
                </Typography>
              </li>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box>
            <Box>
              <ul>
                <li>
                  <Typography variant="h5" textAlign={"left"}>
                    Legal
                  </Typography>
                </li>
                <li onClick={() => window.open('/termsofuse', '_blank')}>
                  <Typography variant="body1" textAlign={"left"}>
                    <span className="hover:underline cursor-pointer">
                      Terms of Use
                    </span>
                  </Typography>
                </li>
                <li onClick={() => window.open('/privacypolicy', '_blank')}>
                  <Typography variant="body1" textAlign={"left"}>
                    <span className="hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                  </Typography>
                </li>
                <li onClick={() => window.open('/cookiespolicy', '_blank')}>
                  <Typography variant="body1" textAlign={"left"}>
                    <span className="hover:underline cursor-pointer">
                      Cookies Policy
                    </span>
                  </Typography>
                </li>
                {/* <li>
                  <Typography variant="body1" textAlign={"left"}>
                    Special Treatment
                  </Typography>
                </li> */}
              </ul>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box>
            <Typography variant="body1">© 2024 All rights reserved</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        height={{ md: 200, sm: 70, xs: 70 }}
        display={"grid"}
        sx={{
          placeItems: "center",
        }}
        overflow={"hidden"}
      >
        <Box width={"80%"} height={140} position={"relative"}>
          <img src={AdraxLogo} alt="ADROX" width={"100%"} height={"100%"}></img>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
