import { Outlet, NavLink } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <h1>Course Planner Advanced</h1>
        <nav className="nav">
          <NavLink to="/courses" end className="nav-link">
            Courses
          </NavLink>
          <NavLink to="/schedule" className="nav-link">
            My Schedule
          </NavLink>
          <NavLink to="/teachers" className="nav-link">
            Teachers
          </NavLink>
          <NavLink to="/help" className="nav-link">
            Help
          </NavLink>
        </nav>
      </header>
      
      <main className="main">
        <Outlet />
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 Course Planner Advanced</p>
      </footer>
    </div>
  );
}
