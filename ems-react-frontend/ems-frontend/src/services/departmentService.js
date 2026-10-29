//import our reusable api axios instance from api.js
import api from "./api";

//using this file,we are creating a service layer for our department entity

/*fn to get all departments*/
export const getDepartments = ()=>{
    return api.get("departments/");
};

// function to add a department
export const addDepartment=(department)=>{
    return api.post("departments/",department);
};

//fn to edit a department
export const updateDepartment=(id,department)=>{
    return api.put(`departments/${id}/`,department);
}

//fn to delete a department
export const deleteDepartment=(id)=>{
    return api.delete(`departments/${id}/`);
};

