//import our resuable api axios instance from api.js
import api from "./api";

//using this file,we are creating a service layer for our employee entity

//func to get all the employees
export const getEmployees = () => {
  return api.get("employees/");
};

// function to get the details of a single employee
export const getEmployee = (id) => {
  return api.get(`employees/${id}/`);
};

//fn to add an employee
export const addEmployee = (employee) => {
  return api.post("employees/", employee);
};

//fn to edit an employee
export const updateEmployee = (id, employee) => {
  return api.put(`employees/${id}/`, employee);
};
 //fn to delete an employee
export const deleteEmployee = (id) => {
  return api.delete(`employees/${id}/`);
};
