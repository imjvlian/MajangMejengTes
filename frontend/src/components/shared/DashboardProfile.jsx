import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSucces,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/redux/user/userSlice";
import { getFileView, uploadFile } from "@/lib/appwrite/uploadImage";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Mail,
  Lock,
  User,
  Trash2,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const DashboardProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const profilePicRef = useRef();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const uploadImage = async () => {
    if (!imageFile) return currentUser.profilePicture;

    try {
      const uploadedFile = await uploadFile(imageFile);
      const profilePictureUrl = getFileView(uploadedFile.$id);

      return profilePictureUrl;
    } catch (error) {
      toast({
        title: "Update user failed. Please try again!",
      });

      console.log("Image upload failed: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());

      const profilePicture = await uploadImage();

      const updateProfile = {
        ...formData,
        profilePicture,
      };

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProfile),
      });

      const data = await res.json();

      if (data.success === false) {
        toast({
          title: "Update user failed. Please try again!",
        });

        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));

        toast({
          title: "User updated successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Update user failed. Please try again!",
      });

      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSucces());
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());

        toast({
          title: "Logged out!",
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            Account Settings
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Update Your Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage your account information and profile picture.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Profile Header */}
          <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-8 dark:border-slate-800 dark:bg-slate-950/40 sm:px-8">
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                hidden
                ref={profilePicRef}
                onChange={handleImageChange}
              />

              {/* Avatar */}
              <div
                className="group relative cursor-pointer"
                onClick={() => profilePicRef.current.click()}
              >
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-lg ring-1 ring-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:ring-slate-700 sm:h-32 sm:w-32">
                  <img
                    src={imageFileUrl || currentUser.profilePicture}
                    alt="Profile"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Camera Button */}
                <div className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-orange-500 text-white shadow-md transition-colors group-hover:bg-orange-600 dark:border-slate-900">
                  <Camera className="h-4 w-4" />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                {currentUser.username}
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Click your photo to change it
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            className="space-y-5 p-5 sm:p-8"
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                <User className="h-4 w-4 text-orange-500" />
                Username
              </label>

              <div className="relative">
                <Input
                  type="text"
                  id="username"
                  placeholder="username"
                  defaultValue={currentUser.username}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-sm transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                <Mail className="h-4 w-4 text-orange-500" />
                Email Address
              </label>

              <Input
                type="email"
                id="email"
                placeholder="email"
                defaultValue={currentUser.email}
                className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-sm transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                <Lock className="h-4 w-4 text-orange-500" />
                Password
              </label>

              <Input
                type="password"
                id="password"
                placeholder="Enter new password"
                className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-sm transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                onChange={handleChange}
              />

              <p className="text-xs text-slate-400 dark:text-slate-500">
                Leave empty if you don't want to change your password.
              </p>
            </div>

            {/* Update Button */}
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-orange-500 font-semibold text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating Profile..." : "Update Profile"}
            </Button>
          </form>

          {/* Account Actions */}
          <div className="border-t border-slate-200 bg-slate-50/50 px-5 py-5 dark:border-slate-800 dark:bg-slate-950/30 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Delete */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-start rounded-lg px-3 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="m-auto rounded-2xl bg-white dark:bg-slate-900">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center font-bold text-slate-900 dark:text-white">
                      Are you sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center text-slate-500 dark:text-slate-400">
                      This action cannot be undone. This will permanently
                      delete your account and remove your data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      <Button
                        variant="ghost"
                        className="rounded-lg"
                      >
                        Cancel
                      </Button>
                    </AlertDialogCancel>

                    <AlertDialogAction onClick={handleDeleteUser}>
                      <Button className="rounded-lg bg-red-600 text-white hover:bg-red-700">
                        Continue
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Sign Out */}
              <Button
                variant="ghost"
                className="justify-start rounded-lg px-3 text-sm font-medium text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white sm:justify-end"
                onClick={handleSignout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardProfile;