import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaUpload,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaImage,
  FaSpinner,
  FaUsers,
} from "react-icons/fa";

import {
  uploadFile,
  getFileView,
  deleteFile,
} from "@/lib/appwrite/uploadImage";

const DashboardTeam = () => {
  const { currentUser } = useSelector((state) => state.user);

  // ============================================================
  // STATE
  // ============================================================

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    position: "",
    category: "Team",
    image: "",
    imageFileId: "",
    shortBio: "",
    bio: "",
    instagram: "",
    whatsapp: "",
    email: "",
    order: 0,
    isActive: true,
  });

  // ============================================================
  // FETCH TEAM
  // ============================================================

  const fetchTeam = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/team");

      const contentType = res.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        throw new Error(
          `Server returned ${res.status}: ${text.slice(0, 200)}`
        );
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch team.");
      }

      /*
       * API bisa mengembalikan:
       *
       * [...]
       *
       * {
       *   teams: [...]
       * }
       *
       * {
       *   team: [...]
       * }
       */

      const teamData = Array.isArray(data)
        ? data
        : Array.isArray(data.teams)
          ? data.teams
          : Array.isArray(data.team)
            ? data.team
            : [];

      setTeam(teamData);
    } catch (error) {
      console.error("Failed to fetch team:", error);
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchTeam();
    }
  }, [currentUser]);

  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // IMAGE SELECT
  // ============================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    // Validate size
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    // Revoke old blob preview
    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);

    setPreviewImage(objectUrl);
  };

  // ============================================================
  // RESET FORM
  // ============================================================

  const resetForm = () => {
    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    setFormData({
      name: "",
      role: "",
      position: "",
      category: "Team",
      image: "",
      imageFileId: "",
      shortBio: "",
      bio: "",
      instagram: "",
      whatsapp: "",
      email: "",
      order: 0,
      isActive: true,
    });

    setSelectedFile(null);
    setPreviewImage("");
    setEditingId(null);
    setShowForm(false);
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert("Name is required.");
      return;
    }

    if (!formData.role.trim()) {
      alert("Role is required.");
      return;
    }

    try {
      setSubmitting(true);

      let imageUrl = formData.image || "";
      let imageFileId = formData.imageFileId || "";

      // ========================================================
      // UPLOAD IMAGE TO APPWRITE
      // ========================================================

      if (selectedFile) {
        console.log("Uploading team image to Appwrite...");

        const uploadedFile = await uploadFile(selectedFile);

        const newFileId =
          typeof uploadedFile === "string"
            ? uploadedFile
            : uploadedFile?.$id || uploadedFile?.id;

        if (!newFileId) {
          throw new Error(
            "Appwrite upload succeeded but no file ID was returned."
          );
        }

        imageFileId = newFileId;

        imageUrl = getFileView(newFileId);

        console.log("New Appwrite file ID:", newFileId);
        console.log("New Appwrite image URL:", imageUrl);

        // ======================================================
        // DELETE OLD IMAGE
        // ======================================================

        if (
          editingId &&
          formData.imageFileId &&
          formData.imageFileId !== newFileId
        ) {
          try {
            await deleteFile(formData.imageFileId);

            console.log("Old Appwrite image deleted.");
          } catch (deleteError) {
            console.warn(
              "Old Appwrite image could not be deleted:",
              deleteError
            );
          }
        }
      }

      // ========================================================
      // PAYLOAD
      // ========================================================

      const payload = {
        name: formData.name.trim(),

        // Required by MongoDB schema
        role: formData.role.trim(),

        position: formData.position.trim(),

        category: formData.category.trim() || "Team",

        image: imageUrl,

        imageFileId,

        shortBio: formData.shortBio.trim(),

        bio: formData.bio.trim(),

        instagram: formData.instagram.trim(),

        whatsapp: formData.whatsapp.trim(),

        email: formData.email.trim(),

        order: Number(formData.order) || 0,

        isActive: Boolean(formData.isActive),
      };

      console.log("Team payload:", payload);

      // ========================================================
      // API
      // ========================================================

      const url = editingId ? `/api/team/${editingId}` : "/api/team";

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      // ========================================================
      // SAFE RESPONSE
      // ========================================================

      const contentType = res.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        throw new Error(
          `Server returned ${res.status}: ${text.slice(0, 300)}`
        );
      }

      if (!res.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to save team member."
        );
      }

      // ========================================================
      // SUCCESS
      // ========================================================

      alert(
        editingId
          ? "Team member updated successfully."
          : "Team member added successfully."
      );

      resetForm();

      await fetchTeam();
    } catch (error) {
      console.error("Failed to save team member:", error);

      alert(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // EDIT
  // ============================================================

  const handleEdit = (member) => {
    if (!member) return;

    setFormData({
      name: member.name || "",

      role: member.role || "",

      position: member.position || "",

      category: member.category || "Team",

      image: member.image || "",

      imageFileId: member.imageFileId || "",

      shortBio: member.shortBio || "",

      bio: member.bio || "",

      instagram: member.instagram || "",

      whatsapp: member.whatsapp || "",

      email: member.email || "",

      order: member.order ?? 0,

      isActive: member.isActive ?? true,
    });

    setSelectedFile(null);

    setPreviewImage(member.image || "");

    setEditingId(member._id);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // DELETE
  // ============================================================

  const handleDelete = async (member) => {
    if (!member?._id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${member.name}?`
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/team/${member._id}`, {
        method: "DELETE",
      });

      const contentType = res.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        throw new Error(
          `Server returned ${res.status}: ${text.slice(0, 300)}`
        );
      }

      if (!res.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to delete team member."
        );
      }

      // ========================================================
      // DELETE APPWRITE IMAGE
      // ========================================================

      if (member.imageFileId) {
        try {
          await deleteFile(member.imageFileId);

          console.log("Appwrite team image deleted.");
        } catch (error) {
          console.warn(
            "Team member deleted but Appwrite image could not be deleted:",
            error
          );
        }
      }

      // ========================================================
      // UPDATE LOCAL STATE
      // ========================================================

      setTeam((prev) =>
        Array.isArray(prev)
          ? prev.filter((item) => item._id !== member._id)
          : []
      );

      alert("Team member deleted successfully.");
    } catch (error) {
      console.error("Failed to delete team member:", error);

      alert(error.message || "Failed to delete team member.");
    }
  };

  // ============================================================
  // TOGGLE ACTIVE
  // ============================================================

  const handleToggle = async (member) => {
    if (!member?._id) return;

    try {
      const newStatus = !Boolean(member.isActive);

      const payload = {
        name: member.name || "",

        role: member.role || "",

        position: member.position || "",

        category: member.category || "Team",

        image: member.image || "",

        imageFileId: member.imageFileId || "",

        shortBio: member.shortBio || "",

        bio: member.bio || "",

        instagram: member.instagram || "",

        whatsapp: member.whatsapp || "",

        email: member.email || "",

        order: Number(member.order) || 0,

        isActive: newStatus,
      };

      const res = await fetch(`/api/team/${member._id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        throw new Error(
          `Server returned ${res.status}: ${text.slice(0, 300)}`
        );
      }

      if (!res.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to update team member."
        );
      }

      // Update local state
      setTeam((prev) =>
        Array.isArray(prev)
          ? prev.map((item) =>
              item._id === member._id
                ? {
                    ...item,
                    isActive: newStatus,
                  }
                : item
            )
          : []
      );
    } catch (error) {
      console.error("Failed to toggle team member:", error);

      alert(error.message || "Failed to update team member.");
    }
  };

  // ============================================================
  // AUTH
  // ============================================================

  if (!currentUser?.isAdmin) {
    return (
      <div className="p-6 text-center">
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

  // ============================================================
  // SAFE SORT
  // ============================================================

  const sortedTeam = Array.isArray(team)
    ? [...team].sort(
        (a, b) =>
          (Number(a?.order) || 0) -
          (Number(b?.order) || 0)
      )
    : [];

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="w-full p-4 md:p-8">
      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Team
          </h1>

          <p className="mt-1 text-muted-foreground">
            Manage the people displayed on the About page.
          </p>
        </div>

        <Button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
          disabled={submitting}
        >
          {showForm ? (
            <>
              <FaTimes className="mr-2" />
              Cancel
            </>
          ) : (
            <>
              <FaPlus className="mr-2" />
              Add Team Member
            </>
          )}
        </Button>
      </div>

      {/* ======================================================
          FORM
      ======================================================= */}

      {showForm && (
        <div className="mb-8 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">
            {editingId
              ? "Edit Team Member"
              : "Add Team Member"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* =================================================
                NAME / ROLE
            ================================================== */}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name
                </label>

                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Role
                </label>

                <Input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Editor"
                  required
                />

                <p className="mt-1 text-xs text-muted-foreground">
                  Required.
                </p>
              </div>
            </div>

            {/* =================================================
                POSITION / CATEGORY
            ================================================== */}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Position
                </label>

                <Input
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Editor in Chief"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Team"
                />
              </div>
            </div>

            {/* =================================================
                IMAGE
            ================================================== */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Profile Photo
              </label>

              <div className="grid gap-5 md:grid-cols-[180px_1fr]">
                {/* Preview */}

                <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                      <FaImage className="mb-2 text-3xl" />

                      <span className="text-xs">
                        No photo
                      </span>
                    </div>
                  )}
                </div>

                {/* Upload */}

                <div className="flex flex-col justify-center">
                  <label
                    htmlFor="team-image"
                    className="inline-flex w-fit cursor-pointer items-center rounded-lg border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted"
                  >
                    <FaUpload className="mr-2" />

                    {selectedFile
                      ? "Change Photo"
                      : "Choose Photo"}
                  </label>

                  <input
                    id="team-image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <p className="mt-3 text-xs text-muted-foreground">
                    JPG, PNG, WEBP or GIF.
                    <br />
                    Maximum 5MB.
                    <br />
                    Uploaded directly to Appwrite.
                  </p>

                  {selectedFile && (
                    <div className="mt-3 rounded-lg bg-muted p-3 text-sm">
                      <p className="font-medium">
                        Selected file:
                      </p>

                      <p className="mt-1 break-all text-muted-foreground">
                        {selectedFile.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {(
                          selectedFile.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                SHORT BIO
            ================================================== */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Short Bio
              </label>

              <Input
                name="shortBio"
                value={formData.shortBio}
                onChange={handleChange}
                placeholder="Journalist, editor, photographer..."
              />
            </div>

            {/* =================================================
                BIO
            ================================================== */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Biography
              </label>

              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a short biography..."
                rows={6}
              />
            </div>

            {/* =================================================
                CONTACT
            ================================================== */}

            <div>
              <h3 className="mb-4 text-sm font-semibold">
                Contact & Social Media
              </h3>

              <div className="grid gap-5 md:grid-cols-3">
                {/* Instagram */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <FaInstagram />
                    Instagram
                  </label>

                  <Input
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/username"
                  />
                </div>

                {/* WhatsApp */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <FaWhatsapp />
                    WhatsApp
                  </label>

                  <Input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="628123456789"
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <FaEnvelope />
                    Email
                  </label>

                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                ORDER / ACTIVE
            ================================================== */}

            <div className="grid items-end gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Display Order
                </label>

                <Input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="0"
                />

                <p className="mt-1 text-xs text-muted-foreground">
                  Lower number appears first.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={Boolean(
                    formData.isActive
                  )}
                  onCheckedChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: value,
                    }))
                  }
                />

                <div>
                  <p className="text-sm font-medium">
                    Show on About page
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {formData.isActive
                      ? "Visible"
                      : "Hidden"}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <div className="flex justify-end gap-3 border-t pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={submitting}
              >
                <FaTimes className="mr-2" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />

                    {editingId
                      ? "Updating..."
                      : "Uploading..."}
                  </>
                ) : editingId ? (
                  <>
                    <FaEdit className="mr-2" />
                    Update Member
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" />
                    Add Member
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================
          TEAM LIST
      ======================================================= */}

      <div className="overflow-hidden rounded-xl border">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Team Members
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {sortedTeam.length} team member
            {sortedTeam.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">
            <FaSpinner className="mx-auto mb-3 animate-spin text-xl" />

            Loading team members...
          </div>
        ) : sortedTeam.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <FaUsers className="mx-auto mb-3 text-3xl" />

            <p>No team members yet.</p>

            <Button
              className="mt-4"
              onClick={() => setShowForm(true)}
            >
              <FaPlus className="mr-2" />
              Add First Member
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {sortedTeam.map((member) => (
              <div
                key={member._id}
                className="flex flex-col gap-5 p-5 md:flex-row md:items-center"
              >
                {/* =================================================
                    IMAGE
                ================================================== */}

                <div className="shrink-0">
                  <img
                    src={
                      member.image ||
                      "https://via.placeholder.com/100"
                    }
                    alt={member.name || "Team member"}
                    className="h-16 w-16 rounded-full bg-muted object-cover"
                  />
                </div>

                {/* =================================================
                    INFO
                ================================================== */}

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold">
                    {member.name}
                  </h3>

                  <p className="text-sm font-medium text-orange-500">
                    {member.position ||
                      member.role ||
                      "Team Member"}
                  </p>

                  {member.role &&
                    member.position && (
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    )}

                  {member.shortBio && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {member.shortBio}
                    </p>
                  )}

                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {member.bio ||
                      "No biography."}
                  </p>

                  {/* Contact indicators */}

                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {member.instagram && (
                      <span className="flex items-center gap-1">
                        <FaInstagram />
                        Instagram
                      </span>
                    )}

                    {member.whatsapp && (
                      <span className="flex items-center gap-1">
                        <FaWhatsapp />
                        WhatsApp
                      </span>
                    )}

                    {member.email && (
                      <span className="flex items-center gap-1">
                        <FaEnvelope />
                        Email
                      </span>
                    )}
                  </div>
                </div>

                {/* =================================================
                    STATUS
                ================================================== */}

                <div className="flex shrink-0 items-center gap-2">
                  <Switch
                    checked={Boolean(
                      member.isActive
                    )}
                    onCheckedChange={() =>
                      handleToggle(member)
                    }
                  />

                  <span className="text-sm">
                    {member.isActive
                      ? "Visible"
                      : "Hidden"}
                  </span>
                </div>

                {/* =================================================
                    ACTIONS
                ================================================== */}

                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleEdit(member)
                    }
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      handleDelete(member)
                    }
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTeam;