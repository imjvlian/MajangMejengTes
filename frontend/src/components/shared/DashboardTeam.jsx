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
  FaInstagram,
  FaWhatsapp,
  FaUsers,
} from "react-icons/fa";

const DashboardTeam = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
    instagram: "",
    whatsapp: "",
    order: 0,
    isActive: true,
  });

  // =========================================================
  // FETCH TEAM
  // =========================================================

  const fetchTeam = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/team");

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message || "Failed to fetch team");
        setTeam([]);
        return;
      }

      /*
        API bisa mengembalikan:

        {
          teams: [...]
        }

        atau:

        {
          team: [...]
        }

        atau langsung:

        [...]
      */

      let teamData = [];

      if (Array.isArray(data)) {
        teamData = data;
      } else if (Array.isArray(data.teams)) {
        teamData = data.teams;
      } else if (Array.isArray(data.team)) {
        teamData = data.team;
      }

      setTeam(teamData);
    } catch (error) {
      console.log("Failed to fetch team:", error);
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD TEAM
  // =========================================================

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchTeam();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  // =========================================================
  // FORM
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      bio: "",
      image: "",
      instagram: "",
      whatsapp: "",
      order: 0,
      isActive: true,
    });

    setEditingId(null);
    setShowForm(false);
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = editingId
      ? `/api/team/${editingId}`
      : "/api/team";

    const res = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        role: formData.position,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      resetForm();
      fetchTeam();
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

      /*
        Jangan langsung memaksa response JSON.
        Kalau backend/Vercel mengembalikan HTML,
        kita tidak akan mendapat error:

        Unexpected token '<'
      */

      const contentType = res.headers.get("content-type");

      let data;

      if (contentType?.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        console.log("Server response:", text);

        data = {
          message: text || "Server returned an invalid response",
        };
      }

      if (!res.ok) {
        console.log(data.message || "Failed to save team member");
        return;
      }

      resetForm();

      await fetchTeam();
    } catch (error) {
      console.log("Failed to save team member:", error);
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (member) => {
    setFormData({
      name: member.name || "",
      position: member.position || "",
      bio: member.bio || "",
      image: member.image || "",
      instagram: member.instagram || "",
      whatsapp: member.whatsapp || "",
      order: Number(member.order) || 0,
      isActive: member.isActive ?? true,
    });

    setEditingId(member._id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      const contentType = res.headers.get("content-type");

      let data;

      if (contentType?.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        data = {
          message: text,
        };
      }

      if (!res.ok) {
        console.log(data.message || "Failed to delete member");
        return;
      }

      setTeam((prev) =>
        Array.isArray(prev)
          ? prev.filter((member) => member._id !== id)
          : []
      );
    } catch (error) {
      console.log("Failed to delete team member:", error);
    }
  };

  // =========================================================
  // TOGGLE ACTIVE
  // =========================================================

  const handleToggle = async (member) => {
    try {
      const newStatus = !member.isActive;

      const res = await fetch(`/api/team/${member._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...member,
          isActive: newStatus,
          order: Number(member.order) || 0,
        }),
      });

      const contentType = res.headers.get("content-type");

      let data;

      if (contentType?.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        data = {
          message: text,
        };
      }

      if (!res.ok) {
        console.log(data.message || "Failed to update status");
        return;
      }

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
      console.log("Failed to update team status:", error);
    }
  };

  // =========================================================
  // SORT TEAM
  // =========================================================

  /*
    PENTING:

    Jangan gunakan:

    team.sort(...)

    karena:
    1. state bisa bukan array
    2. sort() memodifikasi array secara langsung

    Kita buat copy terlebih dahulu.
  */

  const sortedTeam = Array.isArray(team)
    ? [...team].sort((a, b) => {
        return (
          (Number(a.order) || 0) -
          (Number(b.order) || 0)
        );
      })
    : [];

  // =========================================================
  // AUTHORIZATION
  // =========================================================

  if (!currentUser?.isAdmin) {
    return (
      <div className="p-6 text-center">
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="w-full p-4 md:p-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

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

      {/* =====================================================
          FORM
      ====================================================== */}

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

            {/* NAME + POSITION */}

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="text-sm font-medium">
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
                <label className="text-sm font-medium">
                  Position
                </label>

                <Input
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Editor in Chief"
                  required
                />
              </div>

            </div>

            {/* IMAGE */}

            <div>
              <label className="text-sm font-medium">
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
              <label className="text-sm font-medium">
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
                <label className="flex items-center gap-2 text-sm font-medium">
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

              <div>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <FaWhatsapp />
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
                <label className="text-sm font-medium">
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
                  checked={Boolean(formData.isActive)}
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
                disabled={saving}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Member"
                  : "Add Member"}
              </Button>

            </div>

          </form>
        </div>
      )}

      {/* =====================================================
          TEAM LIST
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border">

        <div className="border-b p-5">
          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold">
                Team Members
              </h2>

              <p className="text-sm text-muted-foreground">
                {sortedTeam.length} member
                {sortedTeam.length !== 1 ? "s" : ""}
              </p>
            </div>

          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading team members...
          </div>

        ) : sortedTeam.length === 0 ? (

          /* EMPTY */

          <div className="p-8 text-center text-muted-foreground">
            <FaUsers
              className="mx-auto mb-3"
              size={30}
            />

            <p>
              No team members yet.
            </p>

            <Button
              className="mt-4"
              onClick={() => setShowForm(true)}
            >
              <FaPlus className="mr-2" />
              Add Team Member
            </Button>
          </div>

        ) : (

          /* LIST */

          <div className="divide-y">

            {sortedTeam.map((member) => (

              <div
                key={member._id}
                className="flex flex-col gap-5 p-5 transition hover:bg-muted/40 md:flex-row md:items-center"
              >

                {/* IMAGE */}

                <img
                  src={
                    member.image ||
                    "https://via.placeholder.com/100"
                  }
                  alt={member.name || "Team member"}
                  className="h-16 w-16 rounded-full bg-muted object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/100";
                  }}
                />

                {/* INFO */}

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-bold">
                      {member.name}
                    </h3>

                    {member.isActive ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-400">
                        Visible
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        Hidden
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-orange-500">
                    {member.position}
                  </p>

                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {member.bio ||
                      "No biography available."}
                  </p>

                  {/* SOCIAL */}

                  <div className="mt-2 flex items-center gap-3">

                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 transition hover:opacity-70"
                        title="Instagram"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <FaInstagram />
                      </a>
                    )}

                    {member.whatsapp && (
                      <a
                        href={`https://wa.me/${String(
                          member.whatsapp
                        ).replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 transition hover:opacity-70"
                        title="WhatsApp"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <FaWhatsapp />
                      </a>
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