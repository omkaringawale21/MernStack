import React, { useEffect, useState } from "react";
import "../index.css";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { registerApiPost, getDataForValidatRegister } from "../API/API";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userDtls, setUserDtls] = useState({
    userName: "",
    userId: "",
    userPhone: "",
    userPass: "",
    userAddCart: [],
    userOrders: [],
  });
  const [resName, setResName] = useState(false);
  const [resId, setResId] = useState(false);
  const [resPhone, setResPhone] = useState(false);
  const [resPass, setResPass] = useState(false);
  const [varifyDtls, setVarifyDtls] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  const gotVarifying = async (data) => {
    navigate("/login");
    await registerApiPost(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let data = await getDataForValidatRegister();
    if (data.data.length > 0) {
      setVarifyDtls(data.data);
    } else {
      setVarifyDtls([]);
    }
  };

  const onRegisterChange = (event) => {
    const { value, name } = event.target;
    setUserDtls({
      ...userDtls,
      [name]: value,
    });
    if (userDtls.userName.length > 0) {
      setResName(false);
    }
    if (userDtls.userId.length > 0) {
      setResId(false);
    }
    if (userDtls.userPhone.length > 0) {
      setResPhone(false);
    }
    if (userDtls.userPass.length > 0) {
      setResPass(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((preState) => !preState);
  };

  const addRegisterDtls = async (data) => {
    const resgisterId = varifyDtls.some(checkSameId);
    function checkSameId(userId) {
      return (
        userId.userId === userDtls.userId ||
        userId.userPhone === userDtls.userPhone
      );
    }
    console.log("resId", resgisterId);

    if (
      userDtls.userName.length > 0 &&
      userDtls.userId.length > 0 &&
      userDtls.userPhone.length > 0 &&
      userDtls.userPhone.length === 10 &&
      userDtls.userPass.length > 0
    ) {
      setUserDtls({
        userName: "",
        userId: "",
        userPhone: "",
        userPass: "",
      });
      setResName(false);
      setResId(false);
      setResPhone(false);
      setResPass(false);

      resgisterId
        ? alert(
            "User ID & Phone Number has been same so You can Must Enter Different User ID!!!"
          )
        : await gotVarifying(data);
      navigate("/login");
      await registerApiPost(data);
    } else {
      if (userDtls.userName === "") {
        setResName(true);
      }
      if (userDtls.userId === "") {
        setResId(true);
      }
      if (userDtls.userPhone === "") {
        setResPhone(true);
      }
      if (userDtls.userPass === "") {
        setResPass(true);
      }
      if (userDtls.userPhone.length < 10) {
        alert("Phone Number is less than 10 Numbers...");
      }
      if (userDtls.userPhone.length > 10) {
        alert("Phone Number is greater than 10 Numbers...");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        background: "#c5e6ed",
      }}
    >
      <div
        className="card card_box_login"
        style={{
          height: "100%",
          backgroundImage: "linear-gradient(45deg, #49a8f5, #fc1ec1)",
          border: "0.6rem solid #fff",
          borderRadius: "10px",
          boxShadow: "0rem 0rem 0.5rem 0.3rem #b6b8b8",
        }}
      >
        <div className="card-body">
          <h3
            className="card-title text-center text-capitalize login_title"
            style={{
              color: "#062094",
              fontWeight: 700,
            }}
          >
            register page
          </h3>

          <form className="row g-3 needs-validation" noValidate>
            <div
              className="col-md-4 position-relative"
              style={{ width: "100%" }}
            >
              <label
                htmlFor="registerName"
                className="form-label"
                style={{
                  textTransform: "capitalize",
                  color: "#062094",
                  fontWeight: 700,
                }}
              >
                user name
              </label>
              <OutlinedInput
                size="small"
                type="text"
                className="form-control"
                id="registerName"
                autoComplete="off"
                onChange={(e) => onRegisterChange(e)}
                name="userName"
                value={userDtls.userName}
                required
              />
              {resName ? (
                <p style={{ color: "red" }}>Please Fill This!</p>
              ) : (
                <></>
              )}
            </div>
            <div
              className="col-md-4 position-relative"
              style={{ width: "100%" }}
            >
              <label
                htmlFor="registerId"
                className="form-label"
                style={{
                  textTransform: "capitalize",
                  color: "#062094",
                  fontWeight: 700,
                }}
              >
                user id
              </label>
              <OutlinedInput
                size="small"
                type="text"
                className="form-control"
                id="registerId"
                autoComplete="off"
                onChange={(e) => onRegisterChange(e)}
                name="userId"
                value={userDtls.userId}
                required
              />
              {resId ? (
                <p style={{ color: "red" }}>Please Fill This!</p>
              ) : (
                <></>
              )}
            </div>
            <div
              className="col-md-4 position-relative"
              style={{ width: "100%" }}
            >
              <label
                htmlFor="registerPhone"
                className="form-label"
                style={{
                  textTransform: "capitalize",
                  color: "#062094",
                  fontWeight: 700,
                }}
              >
                user phone
              </label>
              <OutlinedInput
                size="small"
                type="text"
                className="form-control"
                id="registerPhone"
                autoComplete="off"
                onChange={(e) => onRegisterChange(e)}
                name="userPhone"
                value={userDtls.userPhone}
                required
              />
              {resPhone ? (
                <p style={{ color: "red" }}>Please Fill This!</p>
              ) : (
                <></>
              )}
            </div>
            <div
              className="col-md-4 position-relative"
              style={{ width: "100%" }}
            >
              <label
                htmlFor="registerPass"
                className="form-label"
                style={{
                  textTransform: "capitalize",
                  color: "#062094",
                  fontWeight: 700,
                }}
              >
                password
              </label>
              <OutlinedInput
                size="small"
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="registerPass"
                autoComplete="off"
                onChange={(e) => onRegisterChange(e)}
                name="userPass"
                value={userDtls.userPass}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                required
              />
              {resPass ? (
                <p style={{ color: "red" }}>Please Fill This!</p>
              ) : (
                <></>
              )}
            </div>
            <div className="col-12 d-flex justify-content-center">
              <Button
                className="btn p-3"
                type="button"
                sx={{
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  backgroundImage: "linear-gradient(45deg, #49a8f5, #fc1ec1)",
                  border: "0.2rem solid #fff",
                  "&:hover": {
                    letterSpacing: "1.8px",
                    color: "#fff",
                    transition: "all 0.3s ease",
                    border: "0.2rem solid #fff",
                  },
                }}
                onClick={() => addRegisterDtls(userDtls)}
              >
                submit form
              </Button>
            </div>
          </form>
          <p style={{ marginTop: "10px", textTransform: "capitalize" }}>
            you have already have account?{" "}
            <span
              onClick={() =>
                setTimeout(() => {
                  navigate("/login");
                }, 500)
              }
              style={{
                color: "#062094",
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
