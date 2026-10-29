import axios from "axios";

//create an axios instance and make the request
// the common connection url will be the base url
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

//write an interceptor to automatically include the access token along
//with the request that is send to the server
//the request interceptor will run before the request is being sent
api.interceptors.request.use((config) => {
  //read token from local storage
  const token = localStorage.getItem("access");
  // if we got token, then attach it as the authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//write another interceptor to heck if the response is 401 unauthorised
//this interceptor will be running after the response of the req is received
//if 401 ,then delete the access and refresh token
api.interceptors.response.use(
  //onfullfilled fn
  (response) => response,
  //return the response itself if the response is valid
  // here 2 arrow fns , one for success and 2nd one for error
  //on rejected fn
  (error) => {
    if (error.response?.status === 401) {
      //optional chaining (?) , so that we will not get error if response is null
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      // redirect the user back to login page
      window.location.href = "/";
    }

    return Promise.reject(error); // return error
  },
);

export default api;
