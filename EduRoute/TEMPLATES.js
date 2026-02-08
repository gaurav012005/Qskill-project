// Template files for remaining pages
// These are placeholder implementations that demonstrate the routing structure

// Student Dashboard
export const DashboardTemplate = `
import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <motion.div {...pageTransition} className="min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-gradient mb-8">
            Student Dashboard
          </h1>
          {/* Add dashboard content here */}
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;
`;

// My Courses
export const MyCoursesTemplate = `
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import api from '../../utils/api';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const response = await api.get('/enrollments/my-courses');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div {...pageTransition} className="min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-gradient mb-8">
            My Courses
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <Link key={course.id} to={\`/courses/\${course.id}/learn\`}>
                <div className="glass-card p-6 rounded-xl hover:scale-105 transition">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <div className="progress-bar mt-4">
                    <div 
                      className="progress-fill" 
                      style={{ width: \`\${(course.completed_lessons / course.total_lessons) * 100}%\` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {course.completed_lessons}/{course.total_lessons} lessons
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MyCourses;
`;

// Course Player (Main routing feature)
export const CoursePlayerTemplate = `
import { useState, useEffect } from 'react';
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const [courseRes, lessonsRes, progressRes] = await Promise.all([
        api.get(\`/courses/\${courseId}\`),
        api.get(\`/lessons/course/\${courseId}\`),
        api.get(\`/progress/course/\${courseId}\`)
      ]);
      
      setCourse(courseRes.data.course);
      setLessons(lessonsRes.data.lessons);
      setProgress(progressRes.data.progress);
      
      // Navigate to first lesson if no lesson selected
      if (lessonsRes.data.lessons.length > 0) {
        navigate(\`/courses/\${courseId}/learn/\${lessonsRes.data.lessons[0].id}\`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-80 glass-card border-r border-white/10 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-heading font-bold mb-4">{course?.title}</h2>
          <div className="progress-bar mb-6">
            <div 
              className="progress-fill" 
              style={{ width: \`\${progress?.stats?.percentage || 0}%\` }}
            />
          </div>
          <div className="space-y-2">
            {lessons.map((lesson, index) => {
              const lessonProgress = progress?.progress?.find(p => p.lesson_id === lesson.id);
              return (
                <Link
                  key={lesson.id}
                  to={\`/courses/\${courseId}/learn/\${lesson.id}\`}
                  className={\`block p-3 rounded-lg glass-card hover:bg-white/10 transition \${
                    lessonProgress?.completed ? 'border-l-4 border-success' : ''
                  }\`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{index + 1}. {lesson.title}</span>
                    {lessonProgress?.completed && <span>✅</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <Outlet context={{ course, lessons, progress, refetch: fetchCourseData }} />
      </div>
    </div>
  );
};

export default CoursePlayer;
`;

// Lesson View
export const LessonViewTemplate = `
import { useState, useEffect } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const LessonView = () => {
  const { lessonId, courseId } = useParams();
  const { lessons, refetch } = useOutletContext();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const response = await api.get(\`/lessons/\${lessonId}\`);
      setLesson(response.data.lesson);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async () => {
    try {
      await api.post(\`/progress/lesson/\${lessonId}/complete\`);
      refetch();
      
      // Navigate to next lesson
      const currentIndex = lessons.findIndex(l => l.id === parseInt(lessonId));
      if (currentIndex < lessons.length - 1) {
        navigate(\`/courses/\${courseId}/learn/\${lessons[currentIndex + 1].id}\`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-heading font-bold mb-6">{lesson.title}</h1>
      
      {lesson.video_url && (
        <div className="aspect-video bg-bg-tertiary rounded-xl mb-6 flex items-center justify-center">
          <span className="text-gray-500">Video Player: {lesson.video_url}</span>
        </div>
      )}
      
      <div className="prose prose-invert max-w-none mb-8">
        <p className="text-gray-300">{lesson.content}</p>
      </div>

      <button onClick={markComplete} className="btn-primary">
        Mark as Complete & Continue
      </button>
    </motion.div>
  );
};

export default LessonView;
`;

// Error Pages
export const NotFoundTemplate = `
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
        <p className="text-2xl text-gray-400 mb-8">Page not found</p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
`;

export const UnauthorizedTemplate = `
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-gradient mb-4">403</h1>
        <p className="text-2xl text-gray-400 mb-8">Access Denied</p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
`;
