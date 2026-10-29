import { Link,useNavigate } from "react-router-dom";


function Navbar(){
    //create a navigate variable
    const navigate=useNavigate();
    const logout=()=>{
        //remove both the stored tokens from browsers local storage
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        //go back to the login page
        navigate("/");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">EMS</Link>
            </div>
                <div className="navbar-nav">
                    {/* <Link className="nav-link" to="/employees">EMPLOYEES</Link>
                    <Link className="nav-link" to="/departments">DEPARTMENTS</Link>
                    <Link className="nav-link" to="/userdetails">USERDETAILS</Link> */}
                    <Link className="btn btn-secondary me-2" to="/dashboard">DASHBOARD</Link>
                    <Link className="btn btn-secondary me-2" to="/departments">DEPARTMENTS</Link>
                    <Link className="btn btn-secondary me-2" to="/employees">Employees</Link>
                    <Link className="btn btn-secondary me-2" to="/projects">PROJECTS</Link>
                    <button className="btn btn-danger"onClick={logout}>Logout</button>
                </div>
           
        </nav>
    );
}
export default Navbar;

