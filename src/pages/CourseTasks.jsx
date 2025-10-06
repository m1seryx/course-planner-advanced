import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import "./CourseTasks.css";

// Mock data for tasks
const mockTasks = {
  "CS101": [
    {
      id: 1,
      title: "Programming Assignment 1",
      description: "Implement a basic calculator using Python",
      dueDate: "2025-01-15",
      type: "Assignment",
      points: 100,
      status: "pending"
    },
    {
      id: 2,
      title: "Midterm Exam",
      description: "Covering chapters 1-5",
      dueDate: "2025-02-20",
      type: "Exam",
      points: 200,
      status: "pending"
    },
    {
      id: 3,
      title: "Lab Exercise 3",
      description: "Data structures implementation",
      dueDate: "2025-01-10",
      type: "Lab",
      points: 50,
      status: "completed"
    }
  ],
  "MATH201": [
    {
      id: 4,
      title: "Calculus Problem Set 1",
      description: "Integration techniques practice",
      dueDate: "2025-01-12",
      type: "Homework",
      points: 150,
      status: "pending"
    },
    {
      id: 5,
      title: "Quiz 1",
      description: "Derivatives and limits",
      dueDate: "2025-01-08",
      type: "Quiz",
      points: 50,
      status: "completed"
    }
  ],
  "ENG101": [
    {
      id: 6,
      title: "Essay 1: Personal Narrative",
      description: "Write a 3-page personal narrative essay",
      dueDate: "2025-01-20",
      type: "Essay",
      points: 100,
      status: "pending"
    }
  ]
};

export default function CourseTasks({ themeColor = "#667eea" }) {
  const { code } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);

  const taskId = searchParams.get("taskId");
  const filter = searchParams.get("filter") || "all";

  // Get tasks for the current course
  useEffect(() => {
    const courseTasks = mockTasks[code] || [];
    setTasks(courseTasks);
  }, [code]);

  // Filter tasks based on query params
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "pending") return task.status === "pending";
    if (filter === "completed") return task.status === "completed";
    if (filter === "overdue") {
      const today = new Date().toISOString().split('T')[0];
      return task.dueDate < today && task.status === "pending";
    }
    return true;
  });

  // Highlight specific task if taskId is provided
  const highlightedTaskId = taskId ? parseInt(taskId) : null;

  const updateFilter = (newFilter) => {
    setSearchParams({ filter: newFilter, taskId });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "overdue":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Exam":
        return "#ef4444";
      case "Assignment":
        return "#3b82f6";
      case "Homework":
        return "#8b5cf6";
      case "Quiz":
        return "#f59e0b";
      case "Lab":
        return "#10b981";
      case "Essay":
        return "#f97316";
      default:
        return "#6b7280";
    }
  };

  const isOverdue = (dueDate) => {
    const today = new Date().toISOString().split('T')[0];
    return dueDate < today;
  };

  return (
    <div className="course-tasks" style={{ "--theme-color": themeColor }}>
      <div className="tasks-header">
        <Link to={`/courses/${code}`} className="back-link">
          ← Back to {code}
        </Link>
        <h2>{code} Tasks</h2>
        <p>Manage your course tasks and assignments</p>
      </div>

      <div className="tasks-controls">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => updateFilter("all")}
          >
            All Tasks
          </button>
          <button
            className={`filter-tab ${filter === "pending" ? "active" : ""}`}
            onClick={() => updateFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`filter-tab ${filter === "completed" ? "active" : ""}`}
            onClick={() => updateFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`filter-tab ${filter === "overdue" ? "active" : ""}`}
            onClick={() => updateFilter("overdue")}
          >
            Overdue
          </button>
        </div>

        <div className="deep-link-section">
          <p>
            <strong>Deep Link Feature:</strong> Add <code>?taskId=123</code> to the URL to highlight a specific task
          </p>
          {taskId && (
            <p className="highlight-info">
              Currently highlighting Task ID: {taskId}
            </p>
          )}
        </div>
      </div>

      <div className="tasks-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const overdue = isOverdue(task.dueDate) && task.status === "pending";
            const isHighlighted = highlightedTaskId === task.id;
            
            return (
              <div
                key={task.id}
                className={`task-card ${isHighlighted ? "highlighted" : ""}`}
                style={{
                  borderColor: isHighlighted ? themeColor : "transparent",
                  boxShadow: isHighlighted ? `0 0 0 3px ${themeColor}20` : "none"
                }}
              >
                <div className="task-header">
                  <div className="task-title-section">
                    <h3>{task.title}</h3>
                    <span 
                      className="task-type"
                      style={{ backgroundColor: getTypeColor(task.type) }}
                    >
                      {task.type}
                    </span>
                  </div>
                  <div className="task-points">{task.points} pts</div>
                </div>

                <p className="task-description">{task.description}</p>

                <div className="task-footer">
                  <div className="task-meta">
                    <div className="due-date">
                      <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
                      {overdue && <span className="overdue-indicator"> (OVERDUE)</span>}
                    </div>
                    <div className="task-status">
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(overdue ? "overdue" : task.status) }}
                      >
                        {overdue ? "OVERDUE" : task.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="task-actions">
                    <button className="action-btn">Edit</button>
                    <button className="action-btn primary">
                      {task.status === "completed" ? "Reopen" : "Complete"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-tasks">
            <p>No tasks found for the selected filter.</p>
            <button 
              className="clear-filter-btn"
              onClick={() => updateFilter("all")}
            >
              Show All Tasks
            </button>
          </div>
        )}
      </div>

      <div className="tasks-summary">
        <h3>Task Summary</h3>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-number">{tasks.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {tasks.filter(t => t.status === "completed").length}
            </span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {tasks.filter(t => t.status === "pending").length}
            </span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {tasks.filter(t => isOverdue(t.dueDate) && t.status === "pending").length}
            </span>
            <span className="stat-label">Overdue</span>
          </div>
        </div>
      </div>
    </div>
  );
}
