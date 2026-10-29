import {getDepartments,deleteDepartment} from "../services/departmentService";
import {useState,useEffect} from "react";
import DepartmentForm from "./DepartmentForm"

function DepartmentList(){
    // declare usestate variables to store dept list,loading status,error
    const[departments,setDepartments]=useState([]);
    
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState("");
    // declare a usestate var to store the dept that is currently being edited
    const[departmentToEdit,setDepartmentToEdit]=useState(null);




    // declare a function to get the list of depts by assynchronously calling the getDepartments() fn from departmentService
    const loadDepartments=async ()=>{
        try{
            const response=await getDepartments();
            setDepartments(response.data)
        }catch{
            setError("unable to load departments!")
        }finally{
            setLoading(false);
        }

    };

    //create a function to handle delete
    const handleDelete=async(id)=>{
        const confirmed=window.confirm("Delete Department?");
        if(!confirmed){//if user cancels 
            return;
        }
        await deleteDepartment(id);
        loadDepartments();//refresh the list after edit
    }





    //use the useEffect() hook with blank dependent array[]
    //to run the loadDepartments() fn only once the page loads

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadDepartments();
    },[]);


    return(
        <>
            <h2>Departments</h2>
            {loading && <div className="alert alert-info">Loading..</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* <pre>{JSON.stringify(departments)}</pre> */}
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                    <th>Dept ID</th>
                    <th>Dept Name</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(department=>(
                            <tr key ={department.DepartmentId}>
                                <td>{department.DepartmentId}</td>
                                <td>{department.DepartmentName}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" onClick={()=>setDepartmentToEdit(department)}>Edit</button>
                                    <button className="btn btn-danger btn-sm ms-2" onClick={()=>handleDelete(department.DepartmentId)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <DepartmentForm 
            loadDepartments={loadDepartments} 
            // {/* sending property */}
            departmentToEdit={departmentToEdit}
            setDepartmentToEdit={setDepartmentToEdit}
            />
        </>
    );
}
export default DepartmentList;