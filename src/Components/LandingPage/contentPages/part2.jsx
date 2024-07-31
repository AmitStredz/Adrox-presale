import React from 'react'
import { Box, Button, Container, Grid, TextField, Typography, useMediaQuery } from "@mui/material";

import RoadMap from "../../../Assets/Roadmap_Final_File.webp";
import WhitePaper from "../../../Assets/Whitepaper Ver One.pdf";
import WhitePaper1 from "../../../Assets/whitePaper1.webp";
import WhitePaper2 from "../../../Assets/whitePaper2.webp";

export default function Part2() {
  return (
    <div>
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
                The ADROX whitepaper is a comprehensive document that outlines
                the technical foundation features, and vision of the Automated
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
    </div>
  )
}
