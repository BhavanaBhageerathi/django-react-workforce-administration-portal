import { getEmployees } from "../services/employeeService";
import { getDepartments } from "../services/departmentService";
import { getProjects } from "../services/projectService";

import { useEffect,useState } from "react";


function Dashboard() {
  //store the total no of employees
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  //load the list of employees,projects,departments
  useEffect(()=>{
    const loadDashboard = async()=>{
      const employeeresponse = await getEmployees();
      setEmployeeCount(employeeresponse.data.length);//no of employees

      const departmentresponse = await getDepartments();
      setDepartmentCount(departmentresponse.data.length);//no of departments

      const projectresponse = await getProjects();
      setProjectCount(projectresponse.data.length);//no of projects
    };

    loadDashboard();
  },[]);//run once the pg loads
  return (
    <div>
      <h2>Dashboard</h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card bg-primary text-white p-3">
            <h5>Total Employees</h5>
            <h3>{employeeCount}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white p-3">
            <h5>Total Projects</h5>
            <h3>{projectCount}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark text-white p-3">
            <h5>Total Departments</h5>
            <h3>{departmentCount}</h3>
          </div>
        </div>


        

      </div>

    </div>
  );
}

export default Dashboard;