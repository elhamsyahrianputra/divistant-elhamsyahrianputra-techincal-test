"use client";

import { AddCircle } from "@solar-icons/react";
import Link from "next/link";
import { buttonVariants } from "@/core/components/ui/button";
import { Search } from "@/core/components/ui/forms";
import { AuthorCard } from "@/features/author/components";
import { useAuthors } from "@/features/author/hooks/use-author";

export default function Page() {
	const { data: authors } = useAuthors();

	return (
		<div>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div className="w-8/12">
					<Search />
				</div>

				<Link
					className={buttonVariants({ variant: "dark", size: "md" })}
					href="/dashboard/authors/create"
				>
					<AddCircle size={24} weight="BoldDuotone" />
					<span>Add Author</span>
				</Link>
			</div>

			<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{authors?.data.map((author) => (
					<AuthorCard author={author} key={author.id} />
				))}
			</div>
		</div>
	);
}
