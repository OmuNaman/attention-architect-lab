import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LogOut,
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Key,
  Activity,
  Brain,
} from "lucide-react";
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
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <User className="w-4 h-4" />
              <span>Welcome back, {user.email?.split("@")[0]}</span>
            </div>
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  Email Address
                </label>
                <div className="flex items-center gap-2 text-white bg-slate-800/50 p-3 rounded-lg">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">{user.email}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  User ID
                </label>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-white">
                    <Key className="w-4 h-4 text-purple-400" />
                    <span className="font-mono text-xs break-all">
                      {user.id}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  Account Created
                </label>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <div>
                      <div className="text-sm">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(user.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Status */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-green-500/20">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Account Status
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  Email Verified
                </label>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user.email_confirmed_at ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></div>
                    <span className="text-white text-sm">
                      {user.email_confirmed_at
                        ? "Verified"
                        : "Pending Verification"}
                    </span>
                  </div>
                  {user.email_confirmed_at && (
                    <div className="text-xs text-gray-400 mt-1">
                      Verified on{" "}
                      {new Date(user.email_confirmed_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  Last Sign In
                </label>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <div className="text-white text-sm">
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleDateString()
                      : "First time"}
                  </div>
                  {user.last_sign_in_at && (
                    <div className="text-xs text-gray-400">
                      {new Date(user.last_sign_in_at).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  Account Type
                </label>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-white text-sm">Free Learner</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Learning Progress */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-purple-500/20">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Learning Progress
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  Available Courses
                </label>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="text-white text-sm">
                        Self-Attention Mechanism
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Interactive</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  Current Progress
                </label>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">
                      Workshop Completion
                    </span>
                    <span className="text-purple-400 text-sm">0%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="text-center py-4">
                <Button
                  onClick={() => navigate("/learning")}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Start Learning Workshop
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/learning")}
              className="border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              Workshop
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-red-400/20 text-red-400 hover:bg-red-400/10 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
            <Button
              variant="outline"
              disabled
              className="border-white/10 text-white/50 cursor-not-allowed flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Coming Soon
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
