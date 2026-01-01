"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { IMAGE_PLACEHOLDERS } from "@/core/constants/images";
import { useUploadCover } from "../hooks/use-book";

interface BookCoverUploadProps {
  bookId: string;
  coverPreview: string | null;
  onDelete?: () => void;
  rating?: number;
  reviewCount?: number;
}

export function CoverUpload({
  bookId,
  coverPreview: initialCoverPreview,
}: BookCoverUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialCoverPreview,
  );
  const { mutate: uploadCover, isPending } = useUploadCover(bookId);

  useEffect(() => {
    setCoverPreview(initialCoverPreview);
  }, [initialCoverPreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !bookId || isPending) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    toast.loading("Uploading cover image...", { id: "upload-cover" });

    uploadCover(file, {
      onSuccess: () => {
        toast.success("Cover image uploaded successfully!", {
          id: "upload-cover",
        });
      },
      onError: (error) => {
        console.error("Error uploading cover:", error);
        toast.error("Failed to upload cover image", { id: "upload-cover" });
        setCoverPreview(initialCoverPreview);
      },
    });
  };

  return (
    <div>
      <span className="mb-2 block font-semibold text-gray-800 text-xs">
        Cover Image
      </span>
      <div className="group relative aspect-2/3 overflow-hidden rounded-lg border-2 border-gray-300 border-dashed bg-gray-50 transition-colors hover:border-gray-400">
        {coverPreview ? (
          <>
            <Image
              alt="Book Cover"
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              src={coverPreview}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                className="cursor-pointer rounded-lg bg-white px-4 py-2 font-medium text-gray-800 text-sm shadow-lg hover:bg-gray-100"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                Change Cover
              </button>
            </div>
          </>
        ) : (
          <>
            <Image
              alt="Book Cover Placeholder"
              className="h-full w-full object-cover"
              fill
              src={IMAGE_PLACEHOLDERS.BOOK_COVER}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                className="cursor-pointer rounded-lg bg-white px-4 py-2 font-medium text-gray-800 text-sm shadow-lg hover:bg-gray-100"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                Upload Cover
              </button>
            </div>
          </>
        )}
        <input
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
          type="file"
        />
      </div>
      <p className="mt-2 text-gray-500 text-xs">
        Recommended: 400x600px (2:3 ratio)
      </p>
    </div>
  );
}
