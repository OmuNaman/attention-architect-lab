import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, ArrowLeft, User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <AuthForm />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/learning")}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Learning
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <img
            src="/image.png"
            alt="Vizuara AI Labs"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-white mb-2">Your Profile</h1>
          <p className="text-gray-300">
            Manage your account and track your learning progress
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Information */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-blue-500/20">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Profile Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  Email
                </label>
                <div className="flex items-center gap-2 text-white">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{user.email}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  User ID
                </label>
                <div className="text-white font-mono text-sm">{user.id}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  Account Created
                </label>
                <div className="text-white">
                  {new Date(user.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Card>

          {/* Learning Progress */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-purple-500/20">
                <User className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Learning Progress
              </h2>
            </div>

            <div className="space-y-4">
              <div className="text-center py-8">
                <div className="text-3xl font-bold text-white mb-2">🧠</div>
                <p className="text-gray-300">
                  Continue your AI learning journey
                </p>
                <Button
                  onClick={() => navigate("/learning")}
                  className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Continue Learning
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 mt-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/learning")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Self-Attention Workshop
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Back to Home
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
