import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Teachers.css";

// Mock data for teachers
const mockTeachers = [
  {
    id: 1,
    name: "Dr. Sarah Smith",
    department: "Computer Science",
    email: "sarah.smith@university.edu",
    phone: "(555) 123-4567",
    office: "Building A, Room 201",
    officeHours: "Mon/Wed 2:00-4:00 PM",
    courses: ["CS101", "CS201", "CS301"],
    specialties: ["Algorithms", "Data Structures", "Machine Learning"],
    bio: "Dr. Smith has been teaching computer science for over 10 years. She specializes in algorithms and data structures.",
    rating: 4.8,
    avatar: "👩‍💻"
  },
  {
    id: 2,
    name: "Prof. Michael Johnson",
    department: "Mathematics",
    email: "michael.johnson@university.edu",
    phone: "(555) 234-5678",
    office: "Building B, Room 305",
    officeHours: "Tue/Thu 1:00-3:00 PM",
    courses: ["MATH201", "MATH301", "MATH401"],
    specialties: ["Calculus", "Linear Algebra", "Statistics"],
    bio: "Professor Johnson is a renowned mathematician with expertise in advanced calculus and linear algebra.",
    rating: 4.6,
    avatar: "👨‍🏫"
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    department: "English",
    email: "emily.williams@university.edu",
    phone: "(555) 345-6789",
    office: "Building C, Room 150",
    officeHours: "Mon/Wed/Fri 10:00 AM-12:00 PM",
    courses: ["ENG101", "ENG201", "ENG301"],
    specialties: ["Creative Writing", "Literature", "Composition"],
    bio: "Dr. Williams is passionate about helping students develop their writing and communication skills.",
    rating: 4.9,
    avatar: "👩‍🎓"
  },
  {
    id: 4,
    name: "Dr. Robert Brown",
    department: "Physics",
    email: "robert.brown@university.edu",
    phone: "(555) 456-7890",
    office: "Building D, Room 401",
    officeHours: "Tue/Thu 11:00 AM-1:00 PM",
    courses: ["PHYS101", "PHYS201", "PHYS301"],
    specialties: ["Mechanics", "Thermodynamics", "Quantum Physics"],
    bio: "Dr. Brown brings real-world physics applications to the classroom with his industry experience.",
    rating: 4.7,
    avatar: "👨‍🔬"
  },
  {
    id: 5,
    name: "Prof. Lisa Davis",
    department: "Chemistry",
    email: "lisa.davis@university.edu",
    phone: "(555) 567-8901",
    office: "Building E, Room 301",
    officeHours: "Mon/Wed 3:00-5:00 PM",
    courses: ["CHEM101", "CHEM201", "CHEM301"],
    specialties: ["Organic Chemistry", "Analytical Chemistry", "Biochemistry"],
    bio: "Professor Davis is an award-winning chemistry educator with a focus on hands-on laboratory experiences.",
    rating: 4.8,
    avatar: "👩‍🔬"
  }
];

export default function Teachers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredTeachers, setFilteredTeachers] = useState(mockTeachers);

  const q = searchParams.get("q") || "";
  const department = searchParams.get("department") || "";
  const sort = searchParams.get("sort") || "name";


  useEffect(() => {
    let filtered = [...mockTeachers];

   
    if (q) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(q.toLowerCase()) ||
        teacher.department.toLowerCase().includes(q.toLowerCase()) ||
        teacher.specialties.some(specialty => 
          specialty.toLowerCase().includes(q.toLowerCase())
        )
      );
    }

   
    if (department) {
      filtered = filtered.filter(teacher =>
        teacher.department === department
      );
    }

   
    filtered.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "department":
          return a.department.localeCompare(b.department);
        default:
          return 0;
      }
    });

    setFilteredTeachers(filtered);
  }, [q, department, sort]);

  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery, department, sort });
  };

  const updateDepartmentFilter = (newDepartment) => {
    setSearchParams({ q, department: newDepartment, sort });
  };

  const updateSort = (newSort) => {
    setSearchParams({ q, department, sort: newSort });
  };

  const departments = [...new Set(mockTeachers.map(teacher => teacher.department))];

  return (
    <div className="teachers">
      <div className="header-section">
        <h2>Faculty Directory</h2>
        <p>Meet our experienced teaching faculty</p>
      </div>

      <div className="controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search teachers, departments, or specialties..."
            value={q}
            onChange={(e) => updateSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="department-filter">
            <label>Department:</label>
            <select value={department} onChange={(e) => updateDepartmentFilter(e.target.value)}>
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="sort-filter">
            <label>Sort by:</label>
            <select value={sort} onChange={(e) => updateSort(e.target.value)}>
              <option value="name">Name</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="department">Department</option>
            </select>
          </div>
        </div>
      </div>

      <div className="teachers-grid">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <div className="teacher-header">
              <div className="teacher-avatar">{teacher.avatar}</div>
              <div className="teacher-info">
                <h3>{teacher.name}</h3>
                <p className="department">{teacher.department}</p>
                <div className="rating">
                  <span className="stars">⭐</span>
                  <span className="rating-value">{teacher.rating}</span>
                </div>
              </div>
            </div>

            <div className="teacher-details">
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Email:</strong> {teacher.email}
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong> {teacher.phone}
                </div>
                <div className="contact-item">
                  <strong>Office:</strong> {teacher.office}
                </div>
                <div className="contact-item">
                  <strong>Office Hours:</strong> {teacher.officeHours}
                </div>
              </div>

              <div className="specialties">
                <h4>Specialties</h4>
                <div className="specialty-tags">
                  {teacher.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-tag">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="courses">
                <h4>Courses</h4>
                <div className="course-codes">
                  {teacher.courses.map((course, index) => (
                    <span key={index} className="course-code">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bio">
                <p>{teacher.bio}</p>
              </div>
            </div>

            <div className="teacher-actions">
              <button className="action-btn primary">Contact Teacher</button>
              <button className="action-btn secondary">View Schedule</button>
            </div>
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="no-results">
          <p>No teachers found matching your criteria.</p>
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
