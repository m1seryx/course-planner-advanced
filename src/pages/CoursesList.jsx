import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./CoursesList.css";
import search from "../components/logo/search.png"; 


const mockCourses = [
  {
    code: "CS101",
    name: "Introduction to Computer Science",
    units: 3,
    days: ["Mon", "Wed", "Fri"],
    time: "10:00 AM",
    teacher: "Dr. Smith",
    description: "Fundamental concepts in computer science"
  },
  {
    code: "MATH201",
    name: "Calculus II",
    units: 4,
    days: ["Tue", "Thu"],
    time: "2:00 PM",
    teacher: "Prof. Johnson",
    description: "Advanced calculus concepts and applications"
  },
  {
    code: "ENG101",
    name: "English Composition",
    units: 3,
    days: ["Mon", "Wed"],
    time: "11:00 AM",
    teacher: "Dr. Williams",
    description: "Writing and communication skills"
  },
  {
    code: "PHYS101",
    name: "Physics I",
    units: 4,
    days: ["Tue", "Thu", "Fri"],
    time: "9:00 AM",
    teacher: "Dr. Brown",
    description: "Mechanics and thermodynamics"
  },
  {
    code: "CHEM101",
    name: "General Chemistry",
    units: 4,
    days: ["Mon", "Wed", "Fri"],
    time: "1:00 PM",
    teacher: "Prof. Davis",
    description: "Chemical principles and laboratory techniques"
  }
];

export default function CoursesList({ semester = "1st Semester SY 2025-2026" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);

  const q = searchParams.get("q") || "";
  const day = searchParams.get("day") || "";
  const sort = searchParams.get("sort") || "name";

 
  useEffect(() => {
    let filtered = [...mockCourses];

  
    if (q) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(q.toLowerCase()) ||
        course.code.toLowerCase().includes(q.toLowerCase()) ||
        course.teacher.toLowerCase().includes(q.toLowerCase())
      );
    }

   
    if (day) {
      filtered = filtered.filter(course =>
        course.days.includes(day)
      );
    }

 
    filtered.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "units":
          return b.units - a.units;
        case "code":
          return a.code.localeCompare(b.code);
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  }, [q, day, sort]);

  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery, day, sort });
  };

  const updateDayFilter = (newDay) => {
    setSearchParams({ q, day: newDay, sort });
  };

  const updateSort = (newSort) => {
    setSearchParams({ q, day, sort: newSort });
  };

  return (
    <div className="courses-list">
      <div className="header-section">
        <h2>{semester}</h2>
        <p>Browse and manage your course schedule</p>
      </div>

      <div className="controls">
        <div className="search-section">
        
        <img src={search} alt=""  className="search-logo"/>
          <input
            type="text"
            placeholder="Search courses, codes, or teachers..."
            value={q}
            onChange={(e) => updateSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="day-filter">
            <label className="label-text">Day:</label>
            <select value={day} onChange={(e) => updateDayFilter(e.target.value)}>
              <option value="">All Days</option>
              <option value="Mon">Monday</option>
              <option value="Tue">Tuesday</option>
              <option value="Wed">Wednesday</option>
              <option value="Thu">Thursday</option>
              <option value="Fri">Friday</option>
            </select>
          </div>

          <div className="sort-filter">
            <label>Sort by:</label>
            <select value={sort} onChange={(e) => updateSort(e.target.value)}>
              <option value="name">Name</option>
              <option value="units">Units (High to Low)</option>
              <option value="code">Course Code</option>
            </select>
          </div>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course) => (
          <Link key={course.code} to={`/courses/${course.code}`} className="course-card">
            <div className="course-header">
              <h3>{course.code}</h3>
              <span className="units">{course.units} units</span>
            </div>
            <h4>{course.name}</h4>
            <p className="description">{course.description}</p>
            <div className="course-details">
              <div className="schedule">
                <strong>Schedule:</strong> {course.days.join(", ")} at {course.time}
              </div>
              <div className="teacher">
                <strong>Teacher:</strong> {course.teacher}
              </div>
            </div>
            <div className="course-actions">
              <span className="view-details">View Details →</span>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="no-results">
          <p>No courses found matching your criteria.</p>
          <button 
            onClick={() => setSearchParams({})}
            className="clear-filters-btn"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
