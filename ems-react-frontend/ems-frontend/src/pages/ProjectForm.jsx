import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";
import { addProjects, updateProjects } from "../services/projectService";

function ProjectForm({ projectToEdit, onSaved }) {
  const [name, setName] = useState(" ");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const saveProject = async () => {
    try {
      if (name.trim() === "") {
        alert("Project name is required");
        return;
      }

      if (selectedEmployees.length === 0) {
        alert("Atleast one employee should be selected!");
        return;
      }

      const projects = { name, employees: selectedEmployees };
      console.log(projects);

      if (projectToEdit) {
        await updateProjects(projectToEdit.id, projects);
      } else {
        await addProjects(projects);
      }

      if (onSaved) {
        onSaved(); //call the fun to inform parent that saving is done
      }
    } catch {
      console.error("Unable to add project");
    }
  };

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await getEmployees();
        if (response.data) {
          setEmployees(response.data);
        }
      } catch {
        console.log("Unable to load Employees");
      }
    };

    loadEmployees();
  }, []);

  useEffect(() => {
    if (projectToEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(projectToEdit.name);
      setSelectedEmployees(projectToEdit.employees);
    }
  }, [projectToEdit]);

  return (
    <div className="card p-3 mb-4">
      <h4>{projectToEdit ? "Edit" : "Add"} Project</h4>
      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Employees</label>
        {employees.map((employee) => (
          <div className="form-check" key={employee.EmployeeId}>
            <input
              type="checkbox"
              className="form-check-input"
              id={employee.EmployeeId}
              checked={selectedEmployees.includes(employee.EmployeeId)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedEmployees([
                    ...selectedEmployees,
                    employee.EmployeeId,
                  ]);
                } else {
                  setSelectedEmployees(
                    selectedEmployees.filter(
                      (id) => id !== employee.EmployeeId,
                    ),
                  );
                }
                console.log(selectedEmployees);
              }}
            />
            <label className="form-check-label">{employee.EmployeeName}</label>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={saveProject}>
        {projectToEdit ? "Update" : "Save"} Project
      </button>
    </div>
  );
}

export default ProjectForm;
