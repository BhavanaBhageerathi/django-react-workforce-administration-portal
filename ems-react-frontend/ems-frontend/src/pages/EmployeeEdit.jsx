import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployee } from "../services/employeeService";
import EmployeeForm from "./EmployeeForm";
import { useNavigate } from "react-router-dom";



//to receive the emp id that we are sending as a url parameter
function EmployeeEdit(){
    //receive the emp id
    const{id}=useParams();
    //declare a usestate variable to store the details of employee retrieved using the id
    const[employee,setEmployee]=useState(null);
    //create a navigatre instance
    const navigate = useNavigate();


    //Load the employee details on page loads whenever id var changes
    useEffect(()=>{
        const loadEmployee=async()=>{//declairng the async funct
        const response=await getEmployee(id);
        setEmployee(response.data)
        };
        loadEmployee();//calling the function
    },[]);//whenever the id changes,refetcg the data

    if(!employee){
        return <p>Loading employee details..</p>;
    }
    return(
        <div>
            <EmployeeForm employeeToEdit={employee}  onSaved={
                ()=>navigate("/employees")}/>
        </div>
    )



}
export default EmployeeEdit;