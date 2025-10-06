import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CoursesList from "./pages/CoursesList";
import CourseDetails from "./pages/CourseDetails";
import CourseTasks from "./pages/CourseTasks";
import Teachers from "./pages/Teachers";
import Help from "./pages/Help";
import MySchedule from "./pages/MySchedule";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Redirect root to courses */}
        <Route path="/" element={<CoursesList semester="Fall 2025" />} />
        
        {/* Course routes */}
        <Route path="/courses" element={<CoursesList semester="Fall 2025" />} />
        <Route path="/courses/:code" element={<CourseDetails />} />
        <Route 
          path="/courses/:code/tasks" 
          element={<CourseTasks themeColor="#667eea" />} 
        />
        
        {/* Other routes */}
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/help" element={<Help />} />
        <Route path="/schedule" element={<MySchedule />} />
        
        {/* 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
