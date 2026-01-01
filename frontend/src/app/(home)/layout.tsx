"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/core/components/ui/button";
import { getUserRole } from "@/core/utils/jwt";
import { tokenStorage } from "@/core/utils/token-storage";

function UserNavbar() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = tokenStorage.get();
    const role = getUserRole(token);
    setUserRole(role);
    setIsLoading(false);
  }, []);

  // Re-check role when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const token = tokenStorage.get();
        const role = getUserRole(token);
        setUserRole(role);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handleLogout = () => {
    tokenStorage.remove();
    setUserRole(null);
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-gray-100 border-b bg-white/95 backdrop-blur-sm\">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            className="flex items-center gap-2 font-bold text-lg text-primary transition-opacity hover:opacity-80"
            href="/"
          >
            <Image
              alt="Spacio Logo"
              height={28}
              src="/img/logo/logo-blue.svg"
              width={28}
            />
            <span className="hidden sm:inline">Spacio</span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              className="text-gray-600 text-sm transition-colors hover:text-primary"
              href="/explore"
            >
              Explore
            </Link>
            <Link
              className="text-gray-600 text-sm transition-colors hover:text-primary"
              href="/genres"
            >
              Genres
            </Link>
          </div>

          {/* Right Actions */}
          {!isLoading && (
            <div className="flex items-center gap-2">
              {!userRole ? (
                // Guest user - show Sign In and Join buttons
                <>
                  <Link href="/login">
                    <Button
                      className="hidden sm:flex"
                      size="sm"
                      variant="light"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" variant="primary">
                      Join
                    </Button>
                  </Link>
                </>
              ) : userRole === "admin" ? (
                // Admin user - show Dashboard button
                <Link href="/dashboard">
                  <Button size="sm" variant="primary">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                // Member user - show Logout button
                <Button onClick={handleLogout} size="sm" variant="light">
                  Logout
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserNavbar />
      <div className="pt-16">{children}</div>
    </>
  );
}
