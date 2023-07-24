import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { getUsers, deleteUser, getUser } from "../Service/Api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let response = await getUsers();
    console.log("Get Data", response.data);
    setUserData(response.data);
  };

  const deleteUserDetails = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  const getUserDetails = async (id) => {
    await getUser(id);
    navigate(`/edit/${id}`);
  };

  return (
    <TableContainer style={{ marginTop: "80px" }}>
      <Table>
        <TableHead
          sx={{
            background: "#111111",
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                color: "#fff",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              ID No.
            </TableCell>
            <TableCell
              sx={{
                color: "#fff",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                color: "#fff",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              UserName
            </TableCell>
            <TableCell
              sx={{
                color: "#fff",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                color: "#fff",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              Phone
            </TableCell>
            <TableCell
              sx={{
                color: "#fff",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row) => {
            return (
              <TableRow key={row._id}>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {row._id.slice(0, 7)}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {row.username}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {row.email}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {row.phone}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <IconButton
                    sx={{
                      color: "green",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#fff",
                        background: "green",
                      },
                    }}
                    onClick={() => getUserDetails(row._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: "red",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#fff",
                        background: "red",
                      },
                    }}
                    onClick={() => deleteUserDetails(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsers;
