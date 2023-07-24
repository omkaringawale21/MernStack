import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { addUser } from "../Service/Api";
import { useNavigate } from "react-router-dom";


const AddUser = () => {
  const [userDtls, setUserDtls] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const onValueChange = (event) => {
    const { value, name } = event.target;
    setUserDtls({
      ...userDtls,
      [name]: value,
    });
  };

  const addUserDtls = async () => {
    await addUser(userDtls);
    alert("User Added...");
    navigate("/all");
    setUserDtls({
      name: "",
      username: "",
      email: "",
      phone: "",
    });
  };

  return (
    <FormGroup sx={{ margin: "80px auto 0px auto", width: "50%" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        add user
      </Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={userDtls.name}
        />
      </FormControl>
      <FormControl
        sx={{
          marginTop: "20px",
        }}
      >
        <InputLabel>UserName</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={userDtls.username}
        />
      </FormControl>
      <FormControl
        sx={{
          marginTop: "20px",
        }}
      >
        <InputLabel>Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={userDtls.email}
        />
      </FormControl>
      <FormControl
        sx={{
          marginTop: "20px",
        }}
      >
        <InputLabel>Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={userDtls.phone}
        />
      </FormControl>
      <FormControl
        sx={{
          marginTop: "20px",
        }}
      >
        <Button variant="contained" onClick={addUserDtls}>
          add user
        </Button>
      </FormControl>
    </FormGroup>
  );
};

export default AddUser;
