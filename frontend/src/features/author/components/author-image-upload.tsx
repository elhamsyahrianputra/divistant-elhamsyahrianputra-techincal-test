"use client";

import Image from "next/image";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/core/components/ui/button";
import { useUploadAuthorImage } from "../hooks/use-author";

interface AuthorImageUploadProps {
  authorId: string;
  imagePreview: string | null;
}

export function AuthorImageUpload({
  authorId,
  imagePreview: initialPreview,
}: AuthorImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialPreview,
  );
  const { mutate: uploadImage, isPending } = useUploadAuthorImage(authorId);

  useEffect(() => {
    setImagePreview(initialPreview);
  }, [initialPreview]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !authorId || isPending) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    toast.loading("Uploading author photo...", { id: "upload-author-image" });

    uploadImage(file, {
      onSuccess: () => {
        toast.success("Author photo uploaded successfully", {
          id: "upload-author-image",
        });
      },
      onError: () => {
        toast.error("Failed to upload author photo", {
          id: "upload-author-image",
        });
        setImagePreview(initialPreview);
      },
    });
  };

  return (
    <div>
      <span className="mb-2 block font-semibold text-gray-800 text-xs">
        Author Photo
      </span>
      <div className="group relative aspect-square overflow-hidden rounded-lg border-2 border-gray-300 border-dashed bg-gray-50 transition-colors hover:border-gray-400">
        {imagePreview ? (
          <>
            <Image
              alt="Author Photo"
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              src={imagePreview}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                className="cursor-pointer rounded-lg bg-white px-4 py-2 font-medium text-gray-800 text-sm shadow-lg hover:bg-gray-100"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                Change Photo
              </button>
            </div>
          </>
        ) : (
          <div className="relative flex aspect-square flex-col items-center justify-center gap-y-4 bg-linear-to-br from-10% from-primary-lighter to-30% to-gray-100">
            <span className="text-center font-semibold text-2xl text-gray-600 leading-6">
              Photo
              <br />
              Unavailable
            </span>
            <Button
              className="absolute translate-y-13 text-xs"
              onClick={() => fileInputRef.current?.click()}
              variant="light"
            >
              Upload Image
            </Button>
          </div>
        )}
        <input
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
          type="file"
        />
      </div>
      <p className="mt-2 text-gray-500 text-xs">Recommended: 400x400px</p>
    </div>
  );
}
