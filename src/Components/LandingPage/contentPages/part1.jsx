import React from "react";
import { Box, Container, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import { ImagePaths } from "../../ImagePath";

import ProfileSection from "./../ProfileSection";
import ProfileSectionMobile from "./../ProfileSectionMobile";

export default function Part1() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
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
                <Box
                  position={"relative"}
                  top={{ md: -300, sm: -200, xs: -200 }}
                >
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
                        security, transparency, and trust by enabling
                        peer-to-peer transactions without intermediaries,
                        thereby minimizing transaction costs and enhancing user
                        control.
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
                        storing, managing, and exchanging a wide range of
                        digital assets, supporting cross-chain compatibility and
                        various DeFi activities like lending, borrowing, anc
                        yield farming.
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
    </div>
  );
}
