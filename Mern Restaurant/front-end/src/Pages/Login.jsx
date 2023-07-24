import React, { useEffect, useState } from "react";
import "../index.css";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Box,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getDataRegister, getUserIdToHomePage } from "../API/API";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SyncIcon from "@mui/icons-material/Sync";

const Login = () => {
  const [loginDtls, setLoginDtls] = useState({
    loginId: "",
    loginPass: "",
  });
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState([]);
  const [logId, setLogId] = useState(false);
  const [logPass, setLogPass] = useState(false);
  const [invalidId, setInvalidId] = useState(true);
  const [invalidPass, setInvalidPass] = useState(true);
  const [openModel, setOpenModel] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginNavigation, setLoginNavigation] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let response = await getDataRegister();
    if (response.data.length > 0) {
      setLoginData(response.data);
    } else {
      setLoginData([]);
    }
  };

  const onLoginChange = (event) => {
    const { value, name } = event.target;
    setLoginDtls({
      ...loginDtls,
      [name]: value,
    });
    if (loginDtls.loginId.length > 0) {
      setLogId(false);
      setInvalidId(true);
    }
    if (loginDtls.loginPass.length > 0) {
      setLogPass(false);
      setInvalidPass(true);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((preState) => !preState);
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const submitLogin = async () => {
    let matchId = loginData.some(checkMatchID);
    function checkMatchID(userName) {
      return (
        userName.userId === loginDtls.loginId ||
        userName.userPhone === loginDtls.loginId
      );
    }

    let matchPass = loginData.some(checkMatchPass);
    function checkMatchPass(userName) {
      return userName.userPass === loginDtls.loginPass;
    }

    if (loginDtls.loginId.length > 0 && loginDtls.loginPass.length > 0) {
      if (loginData.length === 0) {
        setOpenModel(false);

        setTimeout(() => {
          setOpenModel(true);
        }, 3000);
      } else {
        loginData.map(async (curItem) => {
          if (
            (curItem.userId === loginDtls.loginId &&
              curItem.userPass === loginDtls.loginPass) ||
            (curItem.userPhone === loginDtls.loginId &&
              curItem.userPass === loginDtls.loginPass)
          ) {
            setInvalidId(matchId);
            setInvalidPass(matchPass);
            setLoginNavigation(true);
            await getUserIdToHomePage(curItem._id);
            setTimeout(() => {
              navigate(`/home/${curItem._id}`);
              setInvalidId(true);
              setInvalidPass(true);
              setLogId(false);
              setLogPass(false);
              setLoginNavigation(false);
            }, 4000);
          } else if (
            (curItem.userId !== loginDtls.loginId &&
              curItem.userPass !== loginDtls.loginPass) ||
            (curItem.userPhone !== loginDtls.loginId &&
              curItem.userPass !== loginDtls.loginPass)
          ) {
            setInvalidId(matchId);
            setOpenModel(matchId);

            setInvalidPass(matchPass);
            setOpenModel(matchPass);

            setTimeout(() => {
              setOpenModel(true);
            }, 3000);
          }
        });
      }
    }

    if (loginDtls.loginId === "") {
      setLogId(true);
      setInvalidId(true);
    }

    if (loginDtls.loginPass === "") {
      setLogPass(true);
      setInvalidPass(true);
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
          zIndex: 100,
          position: "relative",
        }}
      >
        {openModel ? (
          <></>
        ) : (
          <Box
            sx={{
              zIndex: 1004,
              position: "absolute",
              top: 50,
              right: 0,
              left: 0,
              height: "20rem",
              background: "#fff",
              borderRadius: "0.4rem",
              border: "0.3rem solid rgba(174, 171, 173, 0.8)",
            }}
          >
            <h2
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textTransform: "capitalize",
                fontFamily: "cursive",
                top: 130,
              }}
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: "2rem", color: "green" }}
              />
              please register frist!
            </h2>
          </Box>
        )}
        <div className="card-body">
          <h3
            className="card-title text-center text-capitalize login_title"
            style={{
              color: "#062094",
              fontWeight: 700,
            }}
          >
            login page
          </h3>
          <form className="row g-3 needs-validation" noValidate>
            <div
              className="col-md-4 position-relative"
              style={{ width: "100%" }}
            >
              <label
                htmlFor="loginId"
                className="form-label"
                style={{
                  textTransform: "capitalize",
                  color: "#062094",
                  fontWeight: 700,
                }}
              >
                user id / phone number :
              </label>
              <OutlinedInput
                size="small"
                type="text"
                className="form-control"
                id="loginId"
                autoComplete="off"
                onChange={(e) => onLoginChange(e)}
                name="loginId"
                value={loginDtls.loginId}
                required
              />
              {logId ? (
                <p style={{ color: "red" }}>Please Fill This!</p>
              ) : (
                <></>
              )}
              {invalidId ? <></> : <p style={{ color: "red" }}>Invalid Id!</p>}
            </div>
            <div
              className="col-md-4 position-relative"
              style={{ width: "100%" }}
            >
              <label
                htmlFor="loginPass"
                className="form-label"
                style={{
                  textTransform: "capitalize",
                  color: "#062094",
                  fontWeight: 700,
                }}
              >
                password :
              </label>
              <OutlinedInput
                size="small"
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="loginPass"
                autoComplete="off"
                onChange={(e) => onLoginChange(e)}
                name="loginPass"
                value={loginDtls.loginPass}
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
              {logPass ? (
                <p style={{ color: "red" }}>Please Fill This!</p>
              ) : (
                <></>
              )}
              {invalidPass ? (
                <></>
              ) : (
                <p style={{ color: "red" }}>Invalid Password!</p>
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
                onClick={submitLogin}
              >
                {loginNavigation ? (
                  <Box className="login_logo_animation">
                    <SyncIcon />
                  </Box>
                ) : (
                  "login"
                )}
              </Button>
            </div>
          </form>
          <p className="mt-2">
            Please{" "}
            <span
              onClick={navigateToRegister}
              style={{
                textTransform: "capitalize",
                textDecoration: "underline",
                cursor: "pointer",
                color: "#062094",
                fontWeight: 700,
              }}
            >
              register frist!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
