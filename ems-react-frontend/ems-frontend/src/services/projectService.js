//import our resuable api axios instance from api.js
import api from "./api";

//using this file,we are creating a service layer for our project entity

//func to get all the projects
export const getProjects = () => {
  return api.get("projects/");
};

// function to get the details of a single project
export const getProject = (id) => {
  return api.get(`projects/${id}/`);
};

//fn to add a project
export const addProjects = (project) => {
  return api.post("projects/",project);
};

//fn to edit a project
export const updateProjects = (id, project) => {
  return api.put(`projects/${id}/`, project);
};
 //fn to delete a project
export const deleteProject = (id) => {
  return api.delete(`projects/${id}/`);
};
