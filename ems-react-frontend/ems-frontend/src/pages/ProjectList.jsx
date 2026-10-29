
import { deleteProject } from "../services/projectService";
import {getProjects} from "../services/projectService";
import {useState,useEffect} from "react";
import {Link} from "react-router-dom"

function ProjectList(){
    // declare usestate variables to store dept list,loading status,error
    const[projects,setProjects]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState("");



    // declare a function to get the list of depts by assynchronously calling the getProjects() fn from projectService
    const loadProjects=async ()=>{
        try{
            const response=await getProjects();
            setProjects(response.data)
        }catch{
            setError("unable to load projectss!")
        }finally{
            setLoading(false);
        }

    };

    //create a function to handle delete
    const handleDelete=async(id)=>{
        const confirmed=window.confirm("Delete Project?");
        if(!confirmed){//if user cancels 
            return;
        }
        await deleteProject(id);
        loadProjects();//refresh the list after edit
    }

    
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProjects();
    },[]);

    return(
        <>
            <h2>Projects</h2>
            {loading && <div className="alert alert-info">Loading..</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <Link to="/projects/add" className="btn btn-primary mb-3">Add Project</Link>
            <table className="table table-bordered table-hover">
                
                <thead>
                    <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Employees</th>
                    <th>Actions</th>
                    </tr>

                </thead>
                
                <tbody>
                    {projects.map(project=>(
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.employee_details.map(employee=>
                                employee.EmployeeName).join(", ")}</td>

                            <td>
                                    <Link to={`/projects/edit/${project.id}`}className="btn btn-warning btn-sm">Edit</Link>
                                    <button className="btn btn-danger btn-sm ms-2" onClick={()=>handleDelete(project.id)}>Delete</button>
                                </td>

                        </tr>
                    ))}
                </tbody>

            </table>
            </>
        );

}
export default ProjectList;