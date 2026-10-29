import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    try {
      const response = await getEmployees();
      if (response.data) {
        setEmployees(response.data);
      }
    } catch {
      setError("Unable to load Employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do u want to delete employee?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEmployees();
  }, []);

  return (
    <>
      <h2>Employees</h2>
      {loading && <div className="alert alert-info">Loading....</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to={"/employees/add"} className="btn btn-primary mb-3">
        Add Employee
      </Link>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DEPT</th>
            <th>DESIG</th>
            <th>CONTACT SETAILS</th>
            <th>DOJ</th>
            <th>ACTIVE STATUS</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.EmployeeId}>
              <td>{employee.EmployeeId}</td>
              <td>{employee.EmployeeName}</td>
              <td>{employee.Department.DepartmentName}</td>
              <td>{employee.Designation}</td>
              <td>{employee.Contact}</td>
              <td>{employee.DateOfJoining}</td>
              <td>{employee.IsActive ? "Yes" : "No"}</td>
              <td>
                <Link to={`/employees/edit/${employee.EmployeeId}`} className="btn btn-warning btn-sm">Edit</Link>
                <button className="btn btn-danger btn-sm ms-2"onClick={() => handleDelete(employee.EmployeeId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default EmployeeList;
