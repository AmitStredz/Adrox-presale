import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Profile1 from "../../Assets/profile1.webp";
import Profile2 from "../../Assets/profile2.webp";
import Profile3 from "../../Assets/profile3.webp";
import Profile4 from "../../Assets/profile4.webp";
import Profile5 from "../../Assets/profile5.webp";
import Profile6 from "../../Assets/profile6.webp";
import Profile7 from "../../Assets/profile7.webp";

function ProfileSectionMobile() {
  const List = [
    {
      img: Profile2,
      id: 2,
      name: "Aaron",
      role: "Director",
    },
    {
      img: Profile1,
      id: 1,
      name: "Nathan",
      role: "Director",
    },
    {
      img: Profile3,
      id: 3,
      name: "Victor",
      role: "Director",
    },
    {
      img: Profile4,
      id: 4,
      name: "Joanne",
      role: "Director",
    },
    {
      img: Profile5,
      id: 5,
      name: "Miller",
      role: "Director",
    },
    {
      img: Profile6,
      id: 6,
      name: "Amine",
      role: "Director",
    },
    {
      img: Profile7,
      id: 7,
      name: "Shedrah",
      role: "Director",
    },
  ];

  const leftColumn = List.slice(0, 4);
  const rightColumn = List.slice(4);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={3}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {leftColumn.map((list) => (
              <Card
                key={list.id}
                sx={{
                  border: "1px solid #fff",
                  transition: "transform 0.5s ease-in-out",
                  position: "relative",
                  bgcolor: "#311760",
                  mb: 2,
                  "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.1)",
                    zIndex: list.id + 3,
                  },
                }}
                className="bg-card"
              >
                <Box
                  width={150}
                  height={200}
                  // border={"2px solid red"}
                  overflow="hidden"
                  mx="auto"
                  // mt={2}
                  mb={-1}
                >
                  <img
                    src={list.img}
                    alt={list.name}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover"}}
                  />
                </Box>
                <Box textAlign="center" py={2}>
                  <Typography
                    variant="h6"
                    color="#fff"
                    fontFamily="Gilroy Bold"
                    fontSize={16}
                    margin={0}
                  >
                    {list.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="#fff"
                    fontFamily="Gilroy Light"
                    fontSize={12}
                    margin={0}
                  >
                    {list.role}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Grid>
          <Grid item xs={6}>
            {rightColumn.map((list) => (
              <Card
                key={list.id}
                sx={{
                  border: "1px solid #fff",
                  transition: "transform 0.5s ease-in-out",
                  position: "relative",
                  bgcolor: "#311760",
                  mb: 2,
                  "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.1)",
                    zIndex: list.id + 3,
                  },
                }}
                className="bg-card"
              >
                <Box
                  width={150}
                  height={200}
                  overflow="hidden"
                  mx="auto"
                  // mt={2}
                  mb={-1}
                >
                  <img
                    src={list.img}
                    alt={list.name}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Box textAlign="center" py={2}>
                  <Typography
                    variant="h6"
                    color="#fff"
                    fontFamily="Gilroy Bold"
                    fontSize={16}
                    margin={0}
                  >
                    {list.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="#fff"
                    fontFamily="Gilroy Light"
                    fontSize={12}
                    margin={0}
                  >
                    {list.role}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ProfileSectionMobile;
