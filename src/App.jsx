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
       
        <Route path="/" element={<CoursesList semester="1st Semester SY 2025-2026" />} />
        
       
        <Route path="/courses" element={<CoursesList semester="1st Semester SY 2025-2026" />} />
        <Route path="/courses/:code" element={<CourseDetails />} />
        <Route 
          path="/courses/:code/tasks" 
          element={<CourseTasks themeColor="#667eea" />} 
        />
        
      
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/help" element={<Help />} />
        <Route path="/schedule" element={<MySchedule />} />
        
      
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
