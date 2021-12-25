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

export default function FlightCabin({
  economy,
  business,
  first,
  airplane,
  totalNumber,
  onSelect,
  chosenCabin,
}) {
  const [value, setValue] =
    airplane.economyRows * airplane.economyColumns -
      economy.takenSeats.length >=
    totalNumber
      ? useState("1")
      : airplane.businessRows * airplane.businessColumns -
          business.takenSeats.length >=
        totalNumber
      ? useState("2")
      : useState("3");
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const onClick = (number) => {
    if (number == 1) {
      if (
        airplane.economyRows * airplane.economyColumns -
          economy.takenSeats.length >=
        totalNumber
      ) {
        onSelect(economy, "economy");
        setOpen(true);
      }
    } else if (number == 2) {
      if (
        airplane.businessRows * airplane.businessColumns -
          business.takenSeats.length >=
        totalNumber
      ) {
        //business
        onSelect(business, "business");
        setOpen(true);
      }
    } else {
      if (
        airplane.firstClassRows * airplane.firstClassColumns -
          first.takenSeats.length >=
        totalNumber
      ) {
        //first
        onSelect(first, "first");
        setOpen(true);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getContentOf = (cabin, cabinName, number) => {
    console.log(
      cabinName,
      chosenCabin,
      chosenCabin && chosenCabin === cabinName
    );
    const fontSize = "17px";
    return (
      <div className="flex-Container-Col">
        <span className="flex-Container-Row" style={{ marginBottom: "7px" }}>
          <span className="item " style={{ paddingRight: "30px" }}>
            <label className="text-muted" style={{ fontSize }}>
              Adult Price:
            </label>
            <label style={{ fontSize }}>{cabin.adultPrice}</label>
            <br />
            <label className="text-muted" style={{ fontSize }}>
              Adult Baggage:{"  "}
            </label>
            <label style={{ fontSize }}>{cabin.adultBaggage}</label>
          </span>
          <span className="item  left-border" style={{ paddingLeft: "30px" }}>
            <label className="text-muted" style={{ fontSize }}>
              Child Price:
            </label>
            <label style={{ fontSize }}>{cabin.childPrice}</label>
            <br />
            <label className="text-muted" style={{ fontSize }}>
              Child Baggage:{"  "}
            </label>
            <label style={{ fontSize }}>{cabin.childBaggage}</label>
          </span>
        </span>

        {chosenCabin && chosenCabin === cabinName ? (
          <MyButton
            index="0"
            width="60%"
            height="10%"
            label="Cabin is Selected"
          />
        ) : (
          <MyButton
            index="1"
            width="60%"
            height="10%"
            onClick={() => onClick(number)}
            label="Select Cabin"
          />
        )}
      </div>
    );
  };

  return (
    <span style={{ minWidth: "100%", marginLeft: "20%" }}>
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
                disabled={
                  airplane.economyRows * airplane.economyColumns -
                    economy.takenSeats.length <
                  totalNumber
                }
                sx={{
                  color: "#222222",
                  // background:
                  //   value == 1
                  //     ? "linear-gradient(to bottom, #ffffff, rgba(200,150,0,0.2))"
                  //     : "white",
                }}
              />
              <Tab
                label="Business"
                value="2"
                disabled={
                  airplane.businessRows * airplane.businessColumns -
                    business.takenSeats.length <
                  totalNumber
                }
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
                disabled={
                  airplane.firstClassRows * airplane.firstClassColumns -
                    first.takenSeats.length <
                  totalNumber
                }
                sx={{
                  //background:"linear-gradient(to bottom, #ffffff,rgba(2500,100,50,0.2))",
                  color: "#222222",
                }}
              />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              padding: "10px",
              //background: "linear-gradient(rgba(30,240,32,0.2),white)",
            }}
          >
            {getContentOf(economy, "economy", 1)}
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              padding: "10px",
              //background: "linear-gradient(rgba(200,200,50,0.2),#ffffff)",
            }}
          >
            {getContentOf(business, "business", 2)}
          </TabPanel>
          <TabPanel
            value="3"
            sx={{
              padding: "10px",
              // background: "linear-gradient(rgba(250,100,50,0.2),#ffffff)",
            }}
          >
            {getContentOf(first, "first", 3)}
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
    </span>
  );
}
