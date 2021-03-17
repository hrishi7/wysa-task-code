import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, CircularProgress } from "@material-ui/core";
import { updateProperty, getStatus } from "../../services/propertyService";
import Notification from "../Notification";

function Screen() {
  const [status, setStatus] = useState("");
  const [singleVal, setSingleVal] = useState("");
  const [multiVal, setMultiVal] = useState({
    hour: "",
    minute: "",
  });
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    gettingProperty();
  }, []);
  const gettingProperty = async () => {
    const auth = JSON.parse(localStorage.getItem("state"));
    
    if (auth.nickname) {
      let result = await getStatus(auth.nickname);
      
      if (result.success) {
        setStatus(result.data);
      } else {
        setNotify({
          isOpen: true,
          message: result.message,
          type: "error",
        });
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("state");
    setTimeout(() => {
      window.location.href = "/signin";
    }, 3000);
  };

  const handlePropertyUpdate = async () => {
    const auth = JSON.parse(localStorage.getItem("state"));
    let data = {};
    if (status == "INITIAL") {
      data.strugglingWeeks = singleVal;
      data.status = "STRUGLLING_WEEK";
    }
    if (status == "STRUGLLING_WEEK") {
      data.bedTime = multiVal;
      data.status = "BED_TIME";
    }
    setLoading(true);
    let result = await updateProperty(auth.nickname, data);

    setLoading(false);
    if (result.success) {
        gettingProperty();
      setStatus(status);
      setNotify({
        isOpen: true,
        message: result.message,
        type: "success",
      });
    } else {
      setNotify({
        isOpen: true,
        message: result.message,
        type: "error",
      });
    }
  };

  const getAppropiateScreen = (status) => {
    if (status == "INITIAL") {
      return (
        <Grid container>
          <Grid item md={12}>
            Question: That's a great goal. How long have you been struggling
            with your sleep?
          </Grid>
          <Grid item md={12}>
            <TextField
              name="singleVal"
              label="Weeks*"
              value={singleVal}
              onChange={(e) => {
                setSingleVal(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {loading ? <CircularProgress size={20} /> : <></>}
          </Grid>
          <Grid item md={12}>
            <Button onClick={handlePropertyUpdate}>Submit</Button>
          </Grid>
        </Grid>
      );
    }
    if (status == "STRUGLLING_WEEK") {
      return (
        <Grid container>
          <Grid item md={12}>
            Question: What Time do you go to bed for sleep?
          </Grid>
          <Grid item md={12}>
            <TextField
              name="multiVal.hour"
              label="Hour*"
              value={multiVal.hour}
              onChange={(e) => {
                let x = { ...multiVal };
                x.hour = e.target.value;
                setMultiVal(x);
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              name="multiVal.hour"
              label="Minutes*"
              value={multiVal.minute}
              onChange={(e) => {
                let x = { ...multiVal };
                x.minute = e.target.value;
                setMultiVal(x);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {loading ? <CircularProgress size={20} /> : <></>}
          </Grid>
          <Grid item md={12}>
            <Button onClick={handlePropertyUpdate}>Submit</Button>
          </Grid>
        </Grid>
      );
    } else {
      return <h4>Thank You For Sharing Your Valuable Info.</h4>;
    }
  };

  return (
    <Grid Container>
      <Grid item md={2}>
        <Button onClick={handleLogout}>Logout</Button>
      </Grid>
      <Grid item md={10}>
        {getAppropiateScreen(status)}
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </Grid>
  );
}

export default Screen;
