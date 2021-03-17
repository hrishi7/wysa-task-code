import React, { useState } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  CircularProgress,
  Button,
  TextField,
} from "@material-ui/core";
import Notification from "../Notification";

import { registerUser } from "../../services/authService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  pageContent: {
    margin:"0 50%",
    width: "50%",
    height: "500px",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  textField:{
    padding: theme.spacing(2),
  }
}));

export default function Login(props) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "nickname") {
      setNickname(value);
    }
    if (name == "password") {
      setPassword(value);
    }
  };

  const validate = () => {
    let temp = { ...errors };

    temp.nickname = nickname ? "" : "This field is required.";

    temp.password = password ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x == "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let data = {
        nickname: nickname.trim(),
        password: password.trim(),
      };
      setLoading(true);
      let result = await registerUser(data);
      setLoading(false);
      if (result.success) {
        setNotify({
          isOpen: true,
          message: result.message,
          type: "success",
        });
        setTimeout(() => {
          window.location.href = "/signin";
        }, 1000);
      } else {
        setNotify({
          isOpen: true,
          message: result.message,
          type: "error",
        });
      }
    }
  };

  const resetForm = () => {
    setNickname("");
    setPassword("");
    setErrors({});
  };

  return (
    <Paper className={classes.pageContent}>
      <Typography variant="h5">Sign Up</Typography>
      <Grid
        container
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} className={classes.textField}>
          <TextField
            name="nickname"
            label="Nickname*"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            error={errors.nickname}
          />
        </Grid>
        <Grid item xs={12}  className={classes.textField}>
          <TextField
         
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          {loading ? <CircularProgress size={20} /> : <></>}
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Button type="submit" disabled={loading} onClick={handleSubmit}>SUBMIT</Button>
            </Grid>
            <Grid item>
              <Button
                text="Reset"
                disabled={loading}
                color="default"
                onClick={resetForm}
              >RESET</Button>
            </Grid>
          </Grid>
        </Grid>
        <p>Already Have Account?</p> <a href="/signin">Login</a>
      </Grid>

      <Notification notify={notify} setNotify={setNotify} />
    </Paper>
  );
}
