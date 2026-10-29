//import the required functions fopr routing
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
//import all the pages that we created
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import DepartmentList from "./pages/DepartmentList";
import EmployeeList from "./pages/EmployeeList";
import ProjectList from "./pages/ProjectList";
import UserDetailsList from "./pages/UserDetailsList";
// import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import EmployeeEdit from "./pages/EmployeeEdit";
import EmployeeAdd from "./pages/EmployeeAdd";
import ProjectEdit from "./pages/ProjectEdit";
import ProjectAdd from "./pages/ProjectAdd";


function App(){
  return(

      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>

          <Route path="/" element={<Login/>}/>
          {/* as per the react layput standards we can use nested routes so that the outlet that we have in the <layout>component
          can display the appripriate child routes */}
          <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
            <Route path="/departments" element={<ProtectedRoute><DepartmentList/></ProtectedRoute>}/>
            <Route path="/employees" element={<ProtectedRoute><EmployeeList/></ProtectedRoute>}/>
            <Route path="/projects" element={<ProtectedRoute><ProjectList/></ProtectedRoute>}/>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path="/userdetails" element={<ProtectedRoute><UserDetailsList/></ProtectedRoute>}/>
            <Route path="/employees/add"element={<ProtectedRoute><EmployeeAdd /></ProtectedRoute>}/>
            <Route path="/employees/edit/:id"element={<ProtectedRoute><EmployeeEdit /></ProtectedRoute>}/>
            <Route path="/projects/add"element={<ProtectedRoute><ProjectAdd /></ProtectedRoute>}/>
            <Route path="/projects/edit/:id"element={<ProtectedRoute><ProjectEdit /></ProtectedRoute>}/>
          </Route>
       </Routes>
      </BrowserRouter>

  );
}
export default App;