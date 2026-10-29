import {useEffect, useState} from "react";
import { addDepartment,updateDepartment} from "../services/departmentService";


function DepartmentForm({loadDepartments,departmentToEdit,setDepartmentToEdit}){
    const [departmentName,setDepartmentName]=useState("");


    //using the useEffect() hook with the dependent variable set as departmentToEdit,we will populate the textbook with that dept name
    // useEffect(()=>{
    //     if(departmentToEdit){
    //         //populate the textbox
    //         // eslint-disable-next-line react-hooks/set-state-in-effect
    //         setDepartmentName(departmentToEdit.DepartmentName);
    //     }
    //     else{
    //         setDepartmentToEdit("");
    //     }
    // },[departmentToEdit]);
    useEffect(() => {
        if (departmentToEdit) {
            console.log("departmentToEdit::::::::", departmentToEdit);
            //populate the textbox
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDepartmentName(departmentToEdit.DepartmentName);
        }
        else {
            setDepartmentName("");
        }
    }, [departmentToEdit])

    //fn to save department
   const saveDepartment = async () => {
        if (departmentName.trim() === "") {
            alert("Department name is required")
            return;
        }

        try {
            if (departmentToEdit) {
                const response = await updateDepartment(departmentToEdit.DepartmentId,
                    {
                        DepartmentName: departmentName
                    });

                console.log(response.data);
                setDepartmentToEdit(null);
                loadDepartments();
            }
            else {
                const response = await addDepartment({
                    DepartmentName: departmentName
                });

                console.log(response.data);
                setDepartmentName("");
                loadDepartments();
            }

        } catch (error) {
            console.error(error);
            alert("Unable to perform operation");
        }
    };


    return(
        <div>
            <h3>{departmentToEdit ? "Edit Department" : "Add Department"}</h3>
            <input
                className="form-control"
                placeholder="Enter the department name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={saveDepartment}>{departmentToEdit ? "Update" : "Add"}</button>
        </div>
    );
}

export default DepartmentForm;