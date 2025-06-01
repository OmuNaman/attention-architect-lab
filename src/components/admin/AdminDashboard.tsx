import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/contexts/ThemeContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Trash2, Plus } from "lucide-react";

// Define a simple Course type for now
type Course = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
};

export function AdminDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      // Mock data for now since we don't have the actual database schema
      const mockCourses: Course[] = [
        {
          id: "1",
          title: "Self-Attention Mechanism",
          description: "Interactive visualization of attention mechanisms",
          status: "published",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Transformer Architecture",
          description: "Deep dive into transformer models",
          status: "draft",
          created_at: new Date().toISOString(),
        },
      ];

      setCourses(mockCourses);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  const handleStatusChange = async (courseId: string, newStatus: string) => {
    try {
      setCourses(
        courses.map((course) =>
          course.id === courseId ? { ...course, status: newStatus } : course
        )
      );

      toast({
        title: "Success",
        description: "Course status updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update course status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
        }`}
      >
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Header */}
      <header
        className={`backdrop-blur-md border-b transition-colors duration-300 ${
          isDark
            ? "bg-slate-800/50 border-slate-700"
            : "bg-white/50 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1
              className={`text-2xl font-bold transition-colors duration-300 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Admin Dashboard
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2
              className={`text-2xl font-bold transition-colors duration-300 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Course Management
            </h2>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </div>

          <div className="grid gap-4">
            {courses.map((course) => (
              <Card
                key={course.id}
                className={`p-4 transition-colors duration-300 ${
                  isDark
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`font-semibold transition-colors duration-300 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {course.title}
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={course.status}
                      onChange={(e) =>
                        handleStatusChange(course.id, e.target.value)
                      }
                      className={`rounded-md border p-1 text-sm transition-colors duration-300 ${
                        isDark
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-white border-slate-300 text-slate-900"
                      }`}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>

                    <Button
                      variant="outline"
                      size="sm"
                      className={`transition-colors duration-300 ${
                        isDark
                          ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                          : "border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>

                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
