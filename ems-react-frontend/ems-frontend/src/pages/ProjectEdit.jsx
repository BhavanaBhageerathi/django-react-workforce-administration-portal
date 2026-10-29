import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { getProject } from "../services/projectService";
import { useState, useEffect } from "react";

function ProjectEdit() {
  //get id from the the url pattern
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await getProject(id);

        if (response.data) {
          setProject(response.data);
          console.log("data:::::::::::", response.data);
        }
      } catch {
        console.log("::::::::::::error:::::::::::::");
      }
    };

    loadProject();
  }, [id]);
  if (!project) {
    return <p>Loading111...</p>;
  }

  return (
    <div>
      <ProjectForm
        projectToEdit={project}
        onSaved={() => {
          navigate("/projects");
        }}
      />
    </div>
  );
}

export default ProjectEdit;
