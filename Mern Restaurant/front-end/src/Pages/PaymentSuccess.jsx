import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';
import "../index.css";

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];

  const searchPaymentId = searchQuery.get("reference");

  const { id } = useParams();

  const navigate = useNavigate();

  const [navigationSync, setNavigationSync] = useState(false);

  const navigateToHome = () => {
    setNavigationSync(true);
    setTimeout(() => {
      navigate(`/home/${id}`);
      setNavigationSync(false);
    }, 4000);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <CheckCircleIcon
          sx={{
            color: "green",
          }}
        />
        Order Successfull
      </h2>
      <p>
        Payment id: <span>{searchPaymentId}</span>
      </p>
      <Button
        sx={{
          textTransform: "capitalize",
          color: "#fff",
          background: "#000",
          width: "3.5rem",
          transition: "all 0.3s linear",
          "&:hover": {
            color: "#fff",
            background: "#000",
            letterSpacing: "3px",
          },
        }}
        onClick={navigateToHome}
      >
        {navigationSync ? <SyncIcon className="login_logo_animation"/> : "done"}
      </Button>
    </div>
  );
};

export default PaymentSuccess;
