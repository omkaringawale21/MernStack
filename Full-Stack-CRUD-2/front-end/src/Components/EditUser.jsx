import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../Service/Api";

const EditUser = () => {
  const [userDtls, setUserDtls] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    let response = await getUser(id);
    console.log("Edit Page Details", response.data);
    setUserDtls({
      _id: response.data._id,
      name: response.data.name,
      username: response.data.username,
      email: response.data.email,
      phone: response.data.phone,
    });
  };

  const onValueChange = (event) => {
    const { value, name } = event.target;
    setUserDtls({
      ...userDtls,
      [name]: value,
    });
  };

  const updateUserDetails = async (id) => {
    await updateUser(userDtls, id);
    navigate("/all");
  }

  return (
    <FormGroup sx={{ margin: "80px auto 0px auto", width: "50%" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        update user
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
        <Button variant="contained" onClick={() => updateUserDetails(userDtls._id)}>update user</Button>
      </FormControl>
    </FormGroup>
  );
};

export default EditUser;
