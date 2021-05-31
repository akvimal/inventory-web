import React, { useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { fetchLogout } from "../redux/auth/authAction";
import API from "../config/apconfig";
export default function Nav(props) {
  const getTokenFromStorage = () => localStorage.getItem("token");
  const [account, setAccount] = useState("");
  const getUserDetails = async () => {
    return await API.post(`/auth/profiledetails`, null, {
      headers: {
        Accept: "application/json",
        "auth-token": getTokenFromStorage(),
      },
    })
      .then((response) => response.data[0].category)
      .catch((error) => error.message);
  };
  useEffect(() => {
    getUserDetails()
      .then((a) => setAccount(a))
      .catch((e) => console.log(e));
    // eslint-disable-next-line
  }, []);
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(fetchLogout());
    history.push("/");
  };
  const end = (
    <>
      <label className="account"> {account} </label>
      <Button
        icon="pi pi-sign-out"
        className="p-button-rounded p-button-warning p-button-outlined mr-1"
        onClick={logout}
      />
    </>
  );

  return (
    <>
      <Menubar start={"Inventory Management"} end={end} />
    </>
  );
}
