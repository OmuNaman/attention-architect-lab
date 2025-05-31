import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/lib/supabase";
import { Edit2, Trash2, Plus } from "lucide-react";

type Course = Database["public"]["Tables"]["courses"]["Row"];

export function AdminDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCourses(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (courseId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("courses")
        .update({ status: newStatus })
        .eq("id", courseId);

      if (error) throw error;

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
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={course.status}
                  onChange={(e) =>
                    handleStatusChange(course.id, e.target.value)
                  }
                  className="rounded-md border p-1 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>

                <Button variant="outline" size="sm">
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
  );
}
