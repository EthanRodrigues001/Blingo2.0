"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/components/context/UserContext";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon, Camera, X } from "lucide-react";

export function UserProfileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user, profilePhoto, loading, refetchUser } = useUser();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [photo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData();
    formData.append("displayName", displayName);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await fetch("/api/v1/updateUserProfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await refetchUser();
        onClose();
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
    setPreviewUrl(null);
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <div className="p-6 text-white min-h-[80vh]">
          <DrawerHeader className="mb-6">
            <DrawerTitle className="text-2xl font-bold">
              User Profile
            </DrawerTitle>
            <DrawerDescription className="text-gray-400">
              Customize your profile settings
            </DrawerDescription>
          </DrawerHeader>

          {loading ? (
            <ProfileSkeleton />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative group">
                  <Avatar className="h-40 w-40 border-4 border-red-500 transition-all duration-300 group-hover:border-red-600">
                    <AvatarImage
                      src={previewUrl || profilePhoto || undefined}
                      alt={user?.displayName || ""}
                    />
                    <AvatarFallback className="bg-gray-700">
                      <UserIcon className="h-20 w-20 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 p-2 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
                  >
                    <Camera className="h-6 w-6" />
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                  />
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={handlePhotoRemove}
                      className="absolute top-0 right-0 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="w-full max-w-md space-y-4">
                  <div>
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Display Name"
                      className=" border-gray-600 text-white placeholder-gray-400"
                    />
                    <p className="mt-2 text-sm text-gray-400">{user?.email}</p>
                  </div>

                  <Badge
                    variant="outline"
                    className=" text-red-400 border-red-400"
                  >
                    Plan: {user?.plan}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <Badge
                  variant="outline"
                  className="bg-transparent border-gray-600"
                >
                  Joined:{" "}
                  {new Date(user?.$createdAt || "").toLocaleDateString()}
                </Badge>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-6">
        <Skeleton className="h-40 w-40 rounded-full" />
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </div>
    </div>
  );
}
