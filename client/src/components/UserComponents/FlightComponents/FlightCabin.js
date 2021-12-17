import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MyButton from "../../Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function FlightCabin({ economy, business, first, onSelect }) {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const onClick = (number) => {
    if (number == 1) {
      onSelect(economy, "economy");
      setOpen(true);
    } else if (number == 2) {
      //business
      onSelect(business, "business");
      setOpen(true);
    } else {
      //first
      onSelect(first, "first");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getContentOf = (cabin, number) => {
    return (
      <div className="flex-Container-Row">
        <span className="item ">
          <label className="text-muted">Adult Price: </label>
          {cabin.adultPrice} <br />
          <label className="text-muted">Adult Baggage: </label>
          {cabin.adultBaggage}
          <br />
        </span>
        <span className="item  left-border">
          <label className="text-muted">Child Price: </label> {cabin.childPrice}
          <br />
          <label className="text-muted">Child Baggage: </label>
          {cabin.adultBaggage}
          <br />
        </span>
        <MyButton
          index="1"
          width="30%"
          height="10%"
          onClick={() => onClick(number)}
          label="Select Flight"
        />
      </div>
    );
  };

  return (
    <>
      <Box sx={{ width: "90%", typography: "body1" }}>
        <TabContext value={value} sx={{ width: "10px" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "rgba(0,0,0,0.2)",
              width: "100%",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Economy"
                value="1"
                sx={{
                  color: "#222222",
                  background:
                    value == 1
                      ? "linear-gradient(to bottom, #ffffff, rgba(200,150,0,0.2))"
                      : "white",
                }}
              />
              <Tab
                label="Business"
                value="2"
                sx={{
                  //background:  "linear-gradient(to bottom, #ffffff, rgba(200,200,50,0.2))",
                  color: "#222222",
                  borderLeft: "1px solid rgba(0,0,0,0.2)",
                  borderRight: "1px solid rgba(0,0,0,0.2)",
                }}
              />
              <Tab
                label="First"
                value="3"
                sx={{
                  //background:"linear-gradient(to bottom, #ffffff,rgba(2500,100,50,0.2))",
                  color: "#222222",
                }}
              />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={
              {
                //background: "linear-gradient(rgba(30,240,32,0.2),white)",
              }
            }
          >
            {getContentOf(economy, 1)}
          </TabPanel>
          <TabPanel
            value="2"
            sx={
              {
                //background: "linear-gradient(rgba(200,200,50,0.2),#ffffff)",
              }
            }
          >
            {getContentOf(business, 2)}
          </TabPanel>
          <TabPanel
            value="3"
            sx={
              {
                // background: "linear-gradient(rgba(250,100,50,0.2),#ffffff)",
              }
            }
          >
            {getContentOf(first, 3)}
          </TabPanel>
        </TabContext>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", marginBottom: "115px" }}
        >
          Selected!
        </Alert>
      </Snackbar>
    </>
  );
}
