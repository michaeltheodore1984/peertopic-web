'use client';

import { useState, useRef } from "react";
import { useUploadThing } from "@/util/uploadThing";
import { User } from "@/lib/models";

interface ProfileAvatarUploaderProps {
  user: User;
  onUploadComplete?: (url: string) => void;
}

export default function ProfileAvatarUploader({
  user,
  onUploadComplete,
}: ProfileAvatarUploaderProps) {
  const [avatarUrl, setAvatarUrl] = useState(user.profileImage ? user.profileImage.url : '');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { startUpload } = useUploadThing("profileImage");

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    setErr(null);

    try {
      const res = await startUpload(
        Array.from(files),
      );

      if (!res || res.length === 0) {
        setErr("Upload failed or was cancelled");
        setIsUploading(false);
        return;
      }

      setAvatarUrl(res[0].ufsUrl);
      onUploadComplete?.(res[0].ufsUrl);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr("An unexpected error occurred.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  function getInitials(firstName: string, lastName: string) {
    const firstInitial = firstName ? firstName[0].toUpperCase() : '';
    const lastInitial = lastName ? lastName[0].toUpperCase() : '';
    return firstInitial + lastInitial;
  }

  const placeholderSVG = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <circle cx="40" cy="40" r="40" fill="#48BB78" />
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, sans-serif" font-size="32" fill="white" font-weight="bold">
        ${getInitials(user.firstName, user.lastName)}
      </text>
    </svg>
    `);

  const placeholderDataUri = `data:image/svg+xml,${placeholderSVG}`;

  return (
    <div className="flex flex-col items-center space-y-4">
      <img
        src={avatarUrl || placeholderDataUri}
        alt="Avatar"
        className="w-28 h-28 object-cover rounded-full border"
      />

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className="relative px-4 py-2 mb-8 w-40 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isUploading && (
          <svg
            className="w-5 h-5 mr-2 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            />
          </svg>
        )}
        {isUploading ? "Uploading..." : "Choose Image"}
      </button>

      {/* Error message */}
      {err && <span className="text-red-600">{err}</span>}
    </div>
  );
}
