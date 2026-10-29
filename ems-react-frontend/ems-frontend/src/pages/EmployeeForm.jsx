import { useState, useEffect } from "react";
import { getDepartments } from "../services/departmentService";
import { addEmployee,updateEmployee } from "../services/employeeService";
//import { useNavigate } from "react-router-dom";

function EmployeeForm({employeeToEdit, onSaved}) {
    const [EmployeeName, setEmployeeName] = useState("");
    const [DepartmentId, setDepartmentId] = useState("");
    const [Designation, setDesignation] = useState("");
    const [DateOfJoining, setDateOfJoining] = useState("");
    const [Contact, setContact] = useState("");
    const [IsActive, setIsActive] = useState(true);
    const [departments, setDepartments] = useState([]); // for dropdown
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState("");
    // const navigate = useNavigate();

    //declare a funct to get the list of depts
    const loadDepartments = async () => {
        try {
            const response = await getDepartments();
            if (response) {
                setDepartments(response.data);
                console.log("dep:::::::::;", response.data);
            }
        } catch (error) {
            setError("Unable to load departments");
            console.log(error);
        }
    };

    const saveEmployee = async () => {
        try {
            const employee = {
                EmployeeName: EmployeeName,
                Designation: Designation,
                DateOfJoining: DateOfJoining,
                Contact: Contact,
                DepartmentId: Number(DepartmentId),
                IsActive: IsActive
            };
            if (employeeToEdit){//edit case
                await updateEmployee(employeeToEdit.EmployeeId,employee)
            }else{
                await addEmployee(employee);
            }
            if(onSaved){
                onSaved();//call the fn to inform parent that saving is done
            }


            // const response = await addEmployee(employee);
            // if (response.data) {
            //     navigate("/employees");
            // }
        } catch (error) {
            console.error(error);
            alert("Unable to perform operation");
        }
    };

    useEffect(() => {
        loadDepartments();
    }, []);

useEffect(() => {
        if(employeeToEdit){
            setEmployeeName(employeeToEdit.EmployeeName);
            setDepartmentId(employeeToEdit.DepartmentId);
            setDateOfJoining(employeeToEdit.DateOfJoining);
            setDesignation(employeeToEdit.Designation);
            setContact(employeeToEdit.Contact);
            setIsActive(employeeToEdit.IsActive);
        }


    }, [employeeToEdit]);

    return (
        <div className="card mb-4 p-3">
            <h4>{employeeToEdit ? "Edit":"Add"}Employee</h4>
            <div className="mb-3">
                <label className="form-label">Employee Name</label>
                <input
                    className="form-control"
                    type="text"
                    value={EmployeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Designation</label>
                <input
                    className="form-control"
                    type="text"
                    value={Designation}
                    onChange={(e) => setDesignation(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Date Of Joining</label>
                <input
                    className="form-control"
                    type="date"
                    value={DateOfJoining}
                    onChange={(e) => setDateOfJoining(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Contact Details</label>
                <input
                    className="form-control"
                    type="text"
                    value={Contact}
                    onChange={(e) => setContact(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Department</label>
                <select
                    className="form-select"
                    value={DepartmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}>
                    <option value="">Select Departments</option>
                    {departments.map((department) => (
                        <option
                            key={department.DepartmentId}
                            value={department.DepartmentId}
                        >
                            {department.DepartmentName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={IsActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />
                <label className="form-label">Is Active</label>
            </div>
            <button className="btn btn-primary" onClick={saveEmployee}> {employeeToEdit ? "Update":"save"}
                 Employee
            </button>
        </div>
    );
}

export default EmployeeForm;
