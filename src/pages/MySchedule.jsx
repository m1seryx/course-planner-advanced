import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MySchedule.css";


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

export default function MySchedule() {
  const [scheduledCourses, setScheduledCourses] = useState([]);


  useEffect(() => {
    const saved = localStorage.getItem('scheduledCourses');
    if (saved) {
      setScheduledCourses(JSON.parse(saved));
    }
  }, []);

  
  const removeFromSchedule = (courseCode) => {
    const updated = scheduledCourses.filter(code => code !== courseCode);
    setScheduledCourses(updated);
    localStorage.setItem('scheduledCourses', JSON.stringify(updated));
  };

 
  const clearSchedule = () => {
    setScheduledCourses([]);
    localStorage.removeItem('scheduledCourses');
  };


  const scheduledCourseDetails = scheduledCourses
    .map(code => mockCourses.find(course => course.code === code))
    .filter(course => course);

  
  const totalUnits = scheduledCourseDetails.reduce((sum, course) => sum + course.units, 0);

 
  const scheduleByDay = {
    'Mon': [],
    'Tue': [],
    'Wed': [],
    'Thu': [],
    'Fri': []
  };

  scheduledCourseDetails.forEach(course => {
    course.days.forEach(day => {
      if (scheduleByDay[day]) {
        scheduleByDay[day].push(course);
      }
    });
  });

  return (
    <div className="my-schedule">
      <div className="schedule-header">
        <h2>My Schedule</h2>
        <p>Manage your course schedule and view your weekly timetable</p>
      </div>

      {scheduledCourses.length === 0 ? (
        <div className="empty-schedule">
          <div className="empty-icon">📅</div>
          <h3>No Courses Scheduled</h3>
          <p>You haven't added any courses to your schedule yet.</p>
          <Link to="/courses" className="browse-courses-btn">
            Browse Available Courses
          </Link>
        </div>
      ) : (
        <>
       
          <div className="schedule-summary">
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-number">{scheduledCourses.length}</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat">
                <span className="stat-number">{totalUnits}</span>
                <span className="stat-label">Total Units</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {Object.values(scheduleByDay).filter(day => day.length > 0).length}
                </span>
                <span className="stat-label">Days per Week</span>
              </div>
            </div>
            <button onClick={clearSchedule} className="clear-schedule-btn">
              Clear All Courses
            </button>
          </div>

        
          <div className="weekly-schedule">
            <h3>Weekly Schedule</h3>
            <div className="schedule-grid">
              {Object.entries(scheduleByDay).map(([day, courses]) => (
                <div key={day} className="day-column">
                  <div className="day-header">{day}</div>
                  <div className="day-courses">
                    {courses.length > 0 ? (
                      courses.map((course, index) => (
                        <div key={`${course.code}-${index}`} className="schedule-course">
                          <div className="course-time">{course.time}</div>
                          <div className="course-info">
                            <div className="course-code">{course.code}</div>
                            <div className="course-name">{course.name}</div>
                            <div className="course-location">{course.location}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-class">No classes</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="scheduled-courses-list">
            <h3>Scheduled Courses</h3>
            <div className="courses-grid">
              {scheduledCourseDetails.map((course) => (
                <div key={course.code} className="course-card">
                  <div className="course-header">
                    <h4>{course.code} - {course.name}</h4>
                    <button
                      onClick={() => removeFromSchedule(course.code)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="course-details">
                    <div className="detail-item">
                      <strong>Units:</strong> {course.units}
                    </div>
                    <div className="detail-item">
                      <strong>Schedule:</strong> {course.days.join(", ")} at {course.time}
                    </div>
                    <div className="detail-item">
                      <strong>Teacher:</strong> {course.teacher}
                    </div>
                    <div className="detail-item">
                      <strong>Location:</strong> {course.location}
                    </div>
                  </div>

                  <div className="course-actions">
                    <Link 
                      to={`/courses/${course.code}`}
                      className="action-btn primary"
                    >
                      View Details
                    </Link>
                    <Link 
                      to={`/courses/${course.code}/tasks`}
                      className="action-btn secondary"
                    >
                      View Tasks
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
