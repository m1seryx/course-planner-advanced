import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./CourseDetails.css";

// Mock data for courses (same as in CoursesList)
const mockCourses = [
  {
    code: "CS101",
    name: "Introduction to Computer Science",
    units: 3,
    days: ["Mon", "Wed", "Fri"],
    time: "10:00 AM",
    teacher: "Dr. Smith",
    description: "Fundamental concepts in computer science",
    prerequisites: ["MATH100"],
    credits: 3,
    location: "Building A, Room 101",
    syllabus: "This course covers basic programming concepts, algorithms, and data structures."
  },
  {
    code: "MATH201",
    name: "Calculus II",
    units: 4,
    days: ["Tue", "Thu"],
    time: "2:00 PM",
    teacher: "Prof. Johnson",
    description: "Advanced calculus concepts and applications",
    prerequisites: ["MATH101"],
    credits: 4,
    location: "Building B, Room 205",
    syllabus: "Continuation of calculus with focus on integration techniques and applications."
  },
  {
    code: "ENG101",
    name: "English Composition",
    units: 3,
    days: ["Mon", "Wed"],
    time: "11:00 AM",
    teacher: "Dr. Williams",
    description: "Writing and communication skills",
    prerequisites: [],
    credits: 3,
    location: "Building C, Room 150",
    syllabus: "Development of writing skills through various essay types and research methods."
  },
  {
    code: "PHYS101",
    name: "Physics I",
    units: 4,
    days: ["Tue", "Thu", "Fri"],
    time: "9:00 AM",
    teacher: "Dr. Brown",
    description: "Mechanics and thermodynamics",
    prerequisites: ["MATH101"],
    credits: 4,
    location: "Building D, Room 301",
    syllabus: "Introduction to classical mechanics, thermodynamics, and wave phenomena."
  },
  {
    code: "CHEM101",
    name: "General Chemistry",
    units: 4,
    days: ["Mon", "Wed", "Fri"],
    time: "1:00 PM",
    teacher: "Prof. Davis",
    description: "Chemical principles and laboratory techniques",
    prerequisites: ["MATH100"],
    credits: 4,
    location: "Building E, Room 201",
    syllabus: "Fundamental principles of chemistry including atomic theory, bonding, and reactions."
  }
];

export default function CourseDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  
  const course = mockCourses.find(c => c.code === code);
  
 
  const [isInSchedule, setIsInSchedule] = useState(false);
  const [scheduleMessage, setScheduleMessage] = useState("");

 
  useEffect(() => {
    const saved = localStorage.getItem('scheduledCourses');
    if (saved) {
      const scheduledCourses = JSON.parse(saved);
      setIsInSchedule(scheduledCourses.includes(course.code));
    }
  }, [course.code]);

  
  const addToSchedule = () => {
    const saved = localStorage.getItem('scheduledCourses');
    const scheduledCourses = saved ? JSON.parse(saved) : [];

    if (isInSchedule) {
      
      const updated = scheduledCourses.filter(code => code !== course.code);
      localStorage.setItem('scheduledCourses', JSON.stringify(updated));
      setIsInSchedule(false);
      setScheduleMessage(`${course.code} removed from your schedule`);
      
   
      setTimeout(() => setScheduleMessage(""), 3000);
    } else {
    
      const updated = [...scheduledCourses, course.code];
      localStorage.setItem('scheduledCourses', JSON.stringify(updated));
      setIsInSchedule(true);
      setScheduleMessage(`${course.code} added to your schedule successfully!`);
      
     
      setTimeout(() => setScheduleMessage(""), 3000);
      
     
      setTimeout(() => {
        if (course.code === "CS101" || course.code === "MATH201") {
          setScheduleMessage(`⚠️ Warning: ${course.code} may conflict with existing courses`);
        }
      }, 1500);
    }
  };

  if (!course) {
    return (
      <div className="course-details">
        <div className="error-state">
          <h2>Course Not Found</h2>
          <p>The course with code "{code}" does not exist.</p>
          <button 
            onClick={() => navigate("/courses")}
            className="back-btn"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-details">
      <div className="course-header">
        <button 
          onClick={() => navigate("/courses")}
          className="back-btn"
        >
          ← Back to Courses
        </button>
        
        <div className="course-info">
          <h1>{course.code} - {course.name}</h1>
          {isInSchedule && (
            <div className="schedule-badge">
              📅 In Your Schedule
            </div>
          )}
          <div className="course-meta">
            <span className="units">{course.units} units</span>
            <span className="credits">{course.credits} credits</span>
            <span className="teacher">Taught by {course.teacher}</span>
          </div>
        </div>
      </div>

      <div className="course-content">
        <div className="main-content">
          <div className="info-section">
            <h3>Description</h3>
            <p>{course.description}</p>
          </div>

          <div className="info-section">
            <h3>Syllabus</h3>
            <p>{course.syllabus}</p>
          </div>

          <div className="info-section">
            <h3>Prerequisites</h3>
            {course.prerequisites.length > 0 ? (
              <ul>
                {course.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            ) : (
              <p>No prerequisites required.</p>
            )}
          </div>
        </div>

        <div className="sidebar">
          <div className="schedule-card">
            <h4>Schedule</h4>
            <div className="schedule-info">
              <div className="schedule-item">
                <strong>Days:</strong> {course.days.join(", ")}
              </div>
              <div className="schedule-item">
                <strong>Time:</strong> {course.time}
              </div>
              <div className="schedule-item">
                <strong>Location:</strong> {course.location}
              </div>
            </div>
          </div>

          <div className="actions-card">
            <h4>Actions</h4>
            
            {/* Schedule Message */}
            {scheduleMessage && (
              <div className={`schedule-message ${scheduleMessage.includes('Warning') ? 'warning' : 'success'}`}>
                {scheduleMessage}
              </div>
            )}
            
            <Link 
              to={`/courses/${course.code}/tasks`}
              className="action-btn primary"
            >
              View Tasks
            </Link>
            <button 
              className={`action-btn ${isInSchedule ? "remove" : "secondary"}`}
              onClick={addToSchedule}
            >
              {isInSchedule ? "Remove from Schedule" : "Add to Schedule"}
            </button>
            <Link to="/schedule" className="action-btn secondary">
              View My Schedule
            </Link>
            <button className="action-btn secondary">
              Download Syllabus
            </button>
          </div>

          <div className="teacher-card">
            <h4>Teacher Info</h4>
            <div className="teacher-info">
              <strong>{course.teacher}</strong>
              <Link to="/teachers" className="teacher-link">
                View Teacher Profile →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
