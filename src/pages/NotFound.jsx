import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <p>
          The URL might be incorrect, or the page might have been removed.
        </p>
        
        <div className="actions">
          <button 
            onClick={() => navigate(-1)}
            className="action-btn secondary"
          >
            ← Go Back
          </button>
          <Link to="/courses" className="action-btn primary">
            Go to Courses
          </Link>
        </div>

        <div className="suggestions">
          <h3>Maybe you're looking for:</h3>
          <div className="suggestion-links">
            <Link to="/courses" className="suggestion-link">
              📚 Browse Courses
            </Link>
            <Link to="/teachers" className="suggestion-link">
              👨‍🏫 Faculty Directory
            </Link>
            <Link to="/help" className="suggestion-link">
              ❓ Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
