"use client";

import { TrashBinTrash } from "@solar-icons/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/core/components/ui/button";
import {
	AuthorFormFields,
	AuthorImageUpload,
} from "@/features/author/components";
import {
	useAuthor,
	useDeleteAuthor,
	useUpdateAuthor,
} from "@/features/author/hooks/use-author";
import type { AuthorRequest } from "@/features/author/schemas/author.schema";

export default function Page() {
	const params = useParams();
	const authorId = params.id as string;

	const { data: author } = useAuthor(authorId);
	const { mutate: updateAuthor } = useUpdateAuthor(authorId);
	const { mutate: deleteAuthor } = useDeleteAuthor(authorId);

	const handleUpdate = (request: AuthorRequest) => {
		toast.loading("Updating author...", { id: "update-author" });
		updateAuthor(request);
	};

	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this author?")) {
			deleteAuthor();
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-6 lg:flex-row">
				<div className="w-full lg:w-3/12">
					<div className="sticky top-18">
						<AuthorImageUpload
							authorId={authorId}
							imagePreview={author?.data.imageUrl || null}
						/>

						<div className="mt-6">
							<Button
								className="w-full bg-error-dark"
								onClick={handleDelete}
								type="button"
							>
								<TrashBinTrash size={18} weight="BoldDuotone" />
								Delete Author
							</Button>
						</div>
					</div>
				</div>

				<div className="w-full lg:w-9/12">
					<AuthorFormFields
						author={author?.data}
						onSubmit={handleUpdate}
					/>
				</div>
			</div>
		</div>
	);
}
