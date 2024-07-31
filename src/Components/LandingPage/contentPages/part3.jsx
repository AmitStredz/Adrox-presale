import React from 'react'
import { Box, Button, Container, Grid, InputAdornment, TextField, Typography, useMediaQuery } from "@mui/material";


export default function Part3() {
  return (
    <div>
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
                    Connect your Metamask wallet to this website using the
                    widget at the top of the page. From there you can easily buy
                    ADROX tokens using BNB, USDT.
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
                    the purchase ID. This ID will be required to claim your
                    ADROX tokens at the conclusion of the presale. signature.
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
    </div>
  )
}
