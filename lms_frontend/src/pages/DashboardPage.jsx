import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import ProfilePage from "./ProfilePage";
import UsersPage from "./UsersPage";
import RegisterPage from "./RegisterPage";
import CategoriesPage from "./CategoriesPage";
import CoursesPage from "./CoursesPage";
import InstructorsPage from "./InstructorsPage";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";

function DashboardPage() {
  const { logout, token } = useAuth();
  const [user, setUser] = useState({
    username: "User",
    role: "student",
    email: "user@email.com",
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch user data to determine if admin
    if (token) {
      axios
        .get("http://localhost:8000/api/user/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data = res.data;
          console.log("DashboardPage - User profile data:", data);
          setUser(data);
          setIsAdmin(data.role === "admin");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [token]);

  // Redirect non-admin users away from admin-only pages when role changes
  useEffect(() => {
    if (!isAdmin && (currentPage === "users" || currentPage === "register")) {
      setCurrentPage("dashboard");
    }
  }, [isAdmin, currentPage]);

  const navItems = [
    {
      label: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
          />
        </svg>
      ),
      onClick: () => {
        setCurrentPage("dashboard");
        setShowProfile(false);
      },
      active: currentPage === "dashboard" && !showProfile,
    },
    // Only show Users and Register pages for admins
    ...(isAdmin
      ? [
          {
            label: "Users",
            icon: (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            ),
            onClick: () => {
              setCurrentPage("users");
              setShowProfile(false);
            },
            active: currentPage === "users",
          },
          {
            label: "Register User",
            icon: (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            ),
            onClick: () => {
              setCurrentPage("register");
              setShowProfile(false);
            },
            active: currentPage === "register",
          },
          {
            label: "Categories",
            icon: (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
                />
              </svg>
            ),
            onClick: () => {
              setCurrentPage("categories");
              setShowProfile(false);
            },
            active: currentPage === "categories",
          },
          {
            label: "Courses",
            icon: (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            ),
            onClick: () => {
              setCurrentPage("courses");
              setShowProfile(false);
            },
            active: currentPage === "courses",
          },
          {
            label: "Instructors",
            icon: (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            ),
            onClick: () => {
              setCurrentPage("instructors");
              setShowProfile(false);
            },
            active: currentPage === "instructors",
          },
        ]
      : []),
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "profile":
        return <ProfilePage />;
      case "users":
        return <UsersPage />;
      case "register":
        return <RegisterPage />;
      case "categories":
        return <CategoriesPage />;
      case "courses":
        return <CoursesPage />;
      case "instructors":
        return <InstructorsPage />;
      case "dashboard":
      default:
        return (
          <div className="w-full text-center">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Welcome to your Dashboard!
            </h2>
            <p className="text-gray-500 text-lg mb-6">
              Use the sidebar to navigate your LMS features.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Quick Stats
                </h3>
                <p className="text-gray-600 text-sm">
                  View your learning progress and achievements.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Recent Courses
                </h3>
                <p className="text-gray-600 text-sm">
                  Continue where you left off in your courses.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Notifications
                </h3>
                <p className="text-gray-600 text-sm">
                  Stay updated with important announcements.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navItems={navItems}
      />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar
          user={user}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          logout={logout}
          setCurrentPage={setCurrentPage}
        />
        <main className="flex-1 p-6 sm:p-8 bg-transparent overflow-auto w-full flex justify-center">
          <div className="w-full max-w-6xl">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
