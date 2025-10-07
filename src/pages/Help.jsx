import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Help.css";

const faqData = [
  {
    id: 1,
    question: "How do I search for courses?",
    answer: "Use the search bar on the courses page to search by course name, code, or teacher. You can also filter by day of the week and sort by name, units, or course code."
  },
  {
    id: 2,
    question: "How do I view course tasks?",
    answer: "Navigate to a specific course page and click on 'View Tasks' to see all assignments, exams, and other tasks for that course. You can filter tasks by status (all, pending, completed, overdue)."
  },
  {
    id: 3,
    question: "What are query parameters?",
    answer: "Query parameters allow you to save your search and filter preferences in the URL. This means you can bookmark specific searches, share links with others, and your preferences will persist when you refresh the page."
  },
  {
    id: 4,
    question: "How do I use deep linking for tasks?",
    answer: "Add ?taskId=123 to the URL of a course tasks page to highlight a specific task. For example: /courses/CS101/tasks?taskId=1 will highlight task with ID 1."
  },
  {
    id: 5,
    question: "How do I contact a teacher?",
    answer: "Visit the Teachers page to see contact information for all faculty members, including email addresses, phone numbers, office locations, and office hours."
  },
  {
    id: 6,
    question: "What is the difference between route params and query params?",
    answer: "Route parameters (like /courses/:code) identify specific resources and are part of the URL path. Query parameters (like ?q=search&sort=name) control how content is displayed or filtered."
  }
];

const helpTopics = [
  {
    title: "Getting Started",
    description: "Learn the basics of using the Course Planner",
    icon: "🚀",
    articles: [
      "How to navigate the application",
      "Understanding the layout",
      "Basic search functionality"
    ]
  },
  {
    title: "Course Management",
    description: "Everything about viewing and managing courses",
    icon: "📚",
    articles: [
      "Searching and filtering courses",
      "Viewing course details",
      "Understanding course schedules"
    ]
  },
  {
    title: "Task Management",
    description: "Managing assignments, exams, and deadlines",
    icon: "📋",
    articles: [
      "Viewing course tasks",
      "Filtering tasks by status",
      "Using deep linking for tasks"
    ]
  },
  {
    title: "Faculty Directory",
    description: "Finding and contacting teachers",
    icon: "👨‍🏫",
    articles: [
      "Browsing the teacher directory",
      "Contacting faculty members",
      "Understanding teacher profiles"
    ]
  }
];

export default function Help() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("faq");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const q = searchParams.get("q") || "";

 
  const filteredFaq = q 
    ? faqData.filter(faq => 
        faq.question.toLowerCase().includes(q.toLowerCase()) ||
        faq.answer.toLowerCase().includes(q.toLowerCase())
      )
    : faqData;

  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery });
  };

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="help">
      <div className="help-header">
        <h2>Help Center</h2>
        <p>Find answers to common questions and learn how to use the Course Planner</p>
      </div>

      <div className="help-tabs">
        <button
          className={`tab ${activeTab === "faq" ? "active" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </button>
        <button
          className={`tab ${activeTab === "topics" ? "active" : ""}`}
          onClick={() => setActiveTab("topics")}
        >
          Help Topics
        </button>
        <button
          className={`tab ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          Contact Support
        </button>
      </div>

      {activeTab === "faq" && (
        <div className="faq-section">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search FAQ..."
              value={q}
              onChange={(e) => updateSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="faq-list">
            {filteredFaq.length > 0 ? (
              filteredFaq.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span className="toggle-icon">
                      {expandedFaq === faq.id ? "−" : "+"}
                    </span>
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No FAQ items found matching your search.</p>
                <button 
                  onClick={() => updateSearch("")}
                  className="clear-search-btn"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "topics" && (
        <div className="topics-section">
          <div className="topics-grid">
            {helpTopics.map((topic, index) => (
              <div key={index} className="topic-card">
                <div className="topic-icon">{topic.icon}</div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <ul className="topic-articles">
                  {topic.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>{article}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="contact-section">
          <div className="contact-info">
            <h3>Get Help</h3>
            <p>Need additional assistance? Contact our support team.</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📧</div>
                <div className="method-info">
                  <h4>Email Support</h4>
                  <p>support@courseplanner.edu</p>
                  <small>Response within 24 hours</small>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">📞</div>
                <div className="method-info">
                  <h4>Phone Support</h4>
                  <p>(555) 123-HELP</p>
                  <small>Mon-Fri 9:00 AM - 5:00 PM</small>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">💬</div>
                <div className="method-info">
                  <h4>Live Chat</h4>
                  <p>Available during business hours</p>
                  <small>Click the chat icon in the bottom right</small>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-links">
            <h4>Quick Links</h4>
            <div className="links-grid">
              <a href="#" className="quick-link">User Guide</a>
              <a href="#" className="quick-link">Video Tutorials</a>
              <a href="#" className="quick-link">System Requirements</a>
              <a href="#" className="quick-link">Troubleshooting</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
