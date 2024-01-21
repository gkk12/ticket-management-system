import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Tooltip } from "@mui/material";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const iconStyle = { margin: "4px 8px 4px 4px", fontSize: "1.5rem", border: "2px solid #282640", borderRadius: "3px", backgroundColor: "#282640" };
  const buttonStyle = { margin: "4px 8px 4px 4px", color: "white", backgroundColor: "#1c1c1f", width: "20%", height: "5rem", fontSize: "1rem", display: "flex", flexDirection: "column" as const,
  alignItems: "flex-start",
  justifyContent: "center",
  border: "2px solid #282640",
  borderRadius: "3px",
  textTransform: "none" as const };


  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Tooltip title="Explore the Knowledge Base">
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<LibraryBooksIcon style={iconStyle} />}
                  style={buttonStyle}
                >
                  Knowledge Base
                </Button>
              </Tooltip>
              <Tooltip title="View Tickets Dashboard">
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<SupportAgentIcon style={iconStyle} />}
                  onClick={()=>router.push("/tickets")}
                  style={buttonStyle}
                >
                  Tickets
                </Button>
              </Tooltip>
              <Tooltip title="Explore FAQ Insights">
                <Button
                  variant="outlined"
                  startIcon={<LightbulbOutlinedIcon style={iconStyle} />}
                  style={buttonStyle}
                >
                  FAQ Insights
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
