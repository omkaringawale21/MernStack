import React from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import NavbarMobile from "./NavbarMobile";
import NavBarDesktop from "./NavBarDesktop";

const NavBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return <>{matches ? <NavbarMobile /> : <NavBarDesktop />}</>;
};

export default NavBar;
