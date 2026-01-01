"use client";

import { Book2, User, Widget3, Widget5 } from "@solar-icons/react";
import { Navbar } from "@/core/components/layouts/navbar";
import { Sidebar } from "@/core/components/layouts/sidebar";
import { Breadcrumb } from "@/core/components/ui/breadcrumb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar.Wrapper>
        <Sidebar.Section title="Overview">
          <Sidebar.Item
            exact
            href="/dashboard"
            icon={Widget5}
            title="Dashboard"
          />
        </Sidebar.Section>
        <Sidebar.Section title="Management">
          <Sidebar.Item href="/dashboard/books" icon={Book2} title="Books" />
          <Sidebar.Item href="/dashboard/authors" icon={User} title="Authors" />
          <Sidebar.Item
            href="/dashboard/genres"
            icon={Widget3}
            title="Genres"
          />
        </Sidebar.Section>
      </Sidebar.Wrapper>

      <div className="xl:pl-75">
        <Navbar />
        <main className="px-4 py-2 pb-6 sm:px-6 md:px-10">
          <Breadcrumb />
          {children}
        </main>
      </div>
    </>
  );
}
