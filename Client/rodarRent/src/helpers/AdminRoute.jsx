import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "./storage";
import routesHelper from "../helpers/routes";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = getLocalStorage('loginData');
   
  useEffect(() => {
    if (!user || !(user.UserId === 1)) {
      navigate(routesHelper.cars)
    }
  }, [])

  return children;
  
};

export default AdminRoute;
