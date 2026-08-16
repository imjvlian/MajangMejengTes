import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const EMPTY_FORM = {
  name: "",
  role: "",
  position: "",
  bio: "",
  image: "",
  instagram: "",
  whatsapp: "",
  order: 0,
  isActive: true,
};

const DashboardTeam = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState(EMPTY_FORM);

  // =====================================================
  // FETCH TEAM
  // =====================================================

  const fetchTeam = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/team");

      const contentType = res.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        throw new Error(
          `Server returned non-JSON response (${res.status}): ${text.slice(
            0,
            200
          )}`
        );
      }

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch team");
      }

      // Backend bisa mengembalikan:
      // { teams: [...] }
      // { team: [...] }
      // atau langsung [...]
      const teamData = Array.isArray(data)
        ? data
        : Array.isArray(data?.teams)
        ? data.teams
        : Array.isArray(data?.team)
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

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchTeam();
    } else {
      setLoading(false);
    }
  }, [currentUser?.isAdmin]);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const url = editingId
        ? `/api/team/${editingId}`
        : "/api/team";

      const method = editingId ? "PUT" : "POST";

      const payload = {
        name: formData.name.trim(),

        // Backend membutuhkan role
        role: formData.role.trim(),

        // Tetap kirim position jika schema lama masih menggunakannya
        position: formData.position.trim(),

        bio: formData.bio.trim(),
        image: formData.image.trim(),
        instagram: formData.instagram.trim(),
        whatsapp: formData.whatsapp.trim(),
        order: Number(formData.order) || 0,
        isActive: Boolean(formData.isActive),
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        throw new Error(
          `Server returned non-JSON response (${res.status}): ${text.slice(
            0,
            300
          )}`
        );
      }

      if (!res.ok) {
        throw new Error(
          data?.message || "Failed to save team member"
        );
      }

      alert(
        editingId
          ? "Team member updated successfully."
          : "Team member added successfully."
      );

      resetForm();

      await fetchTeam();
    } catch (error) {
      console.error("Team submit error:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (member) => {
    setFormData({
      name: member.name || "",
      role: member.role || member.position || "",
      position: member.position || "",
      bio: member.bio || "",
      image: member.image || "",
      instagram: member.instagram || "",
      whatsapp: member.whatsapp || "",
      order: member.order ?? 0,
      isActive: member.isActive ?? true,
    });

    setEditingId(member._id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const contentType = res.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        throw new Error(
          `Server returned non-JSON response (${res.status}): ${text.slice(
            0,
            200
          )}`
        );
      }

      if (!res.ok) {
        throw new Error(
          data?.message || "Failed to delete team member"
        );
      }

      setTeam((prev) =>
        prev.filter((member) => member._id !== id)
      );
    } catch (error) {
      console.error("Delete team error:", error);
      alert(error.message || "Failed to delete team member.");
    }
  };

  // =====================================================
  // TOGGLE ACTIVE
  // =====================================================

  const handleToggle = async (member) => {
    try {
      const newStatus = !member.isActive;

      const payload = {
        name: member.name,
        role: member.role || member.position || "",
        position: member.position || "",
        bio: member.bio || "",
        image: member.image || "",
        instagram: member.instagram || "",
        whatsapp: member.whatsapp || "",
        order: Number(member.order) || 0,
        isActive: newStatus,
      };

      const res = await fetch(`/api/team/${member._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        throw new Error(
          `Server returned non-JSON response (${res.status}): ${text.slice(
            0,
            200
          )}`
        );
      }

      if (!res.ok) {
        throw new Error(
          data?.message || "Failed to update team member"
        );
      }

      setTeam((prev) =>
        prev.map((item) =>
          item._id === member._id
            ? {
                ...item,
                isActive: newStatus,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Toggle team error:", error);
      alert(error.message || "Failed to update team member.");
    }
  };

  // =====================================================
  // AUTH
  // =====================================================

  if (!currentUser?.isAdmin) {
    return (
      <div className="p-6 text-center">
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

  // =====================================================
  // SORT WITHOUT MUTATING STATE
  // =====================================================

  const sortedTeam = Array.isArray(team)
    ? [...team].sort(
        (a, b) =>
          (Number(a.order) || 0) -
          (Number(b.order) || 0)
      )
    : [];

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="w-full p-4 md:p-8">
      {/* =================================================
          HEADER
      ================================================== */}

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

      {/* =================================================
          FORM
      ================================================== */}

      {showForm && (
        <div className="mb-8 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">
            {editingId
              ? "Edit Team Member"
              : "Add Team Member"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* NAME + ROLE */}

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
                  placeholder="Editor in Chief"
                  required
                />

                <p className="mt-1 text-xs text-muted-foreground">
                  Required by the team database.
                </p>
              </div>
            </div>

            {/* POSITION */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Position
              </label>

              <Input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Managing Editor"
              />

              <p className="mt-1 text-xs text-muted-foreground">
                Optional. Role is the primary field used by the
                backend.
              </p>
            </div>

            {/* IMAGE */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Profile Image URL
              </label>

              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
              />

              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-24 w-24 rounded-xl object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* BIO */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Bio
              </label>

              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Short biography..."
                rows={5}
              />
            </div>

            {/* SOCIAL */}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Instagram
                </label>

                <Input
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  WhatsApp
                </label>

                <Input
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="628xxxxxxxxxx"
                />
              </div>
            </div>

            {/* ORDER + ACTIVE */}

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
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: value,
                    }))
                  }
                />

                <span className="text-sm font-medium">
                  Show on About page
                </span>
              </div>
            </div>

            {/* BUTTONS */}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={submitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Saving..."
                  : editingId
                  ? "Update Member"
                  : "Add Member"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* =================================================
          TEAM LIST
      ================================================== */}

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

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading team members...
          </div>
        ) : sortedTeam.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No team members yet.
          </div>
        ) : (
          <div className="divide-y">
            {sortedTeam.map((member) => (
              <div
                key={member._id}
                className="flex flex-col gap-5 p-5 md:flex-row md:items-center"
              >
                {/* IMAGE */}

                <img
                  src={
                    member.image ||
                    "https://via.placeholder.com/100"
                  }
                  alt={member.name}
                  className="h-16 w-16 rounded-full bg-muted object-cover"
                />

                {/* INFO */}

                <div className="flex-1">
                  <h3 className="font-bold">
                    {member.name}
                  </h3>

                  <p className="text-sm text-orange-500">
                    {member.role ||
                      member.position ||
                      "Team Member"}
                  </p>

                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {member.bio ||
                      "No biography available."}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>
                      Order: {member.order ?? 0}
                    </span>

                    {member.instagram && (
                      <span>Instagram</span>
                    )}

                    {member.whatsapp && (
                      <span>WhatsApp</span>
                    )}
                  </div>
                </div>

                {/* STATUS */}

                <div className="flex items-center gap-2">
                  <Switch
                    checked={Boolean(member.isActive)}
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

                {/* ACTIONS */}

                <div className="flex gap-2">
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
                      handleDelete(member._id)
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