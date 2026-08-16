import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const DashboardTeam = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

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

  const fetchTeam = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/team");

      const data = await res.json();

      if (res.ok) {
        setTeam(data.team || data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchTeam();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        body: JSON.stringify(formData),
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

  const handleEdit = (member) => {
    setFormData({
      name: member.name || "",
      position: member.position || "",
      bio: member.bio || "",
      image: member.image || "",
      instagram: member.instagram || "",
      whatsapp: member.whatsapp || "",
      order: member.order || 0,
      isActive: member.isActive ?? true,
    });

    setEditingId(member._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setTeam((prev) => prev.filter((member) => member._id !== id));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleToggle = async (member) => {
    try {
      const res = await fetch(`/api/team/${member._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...member,
          isActive: !member.isActive,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setTeam((prev) =>
          prev.map((item) =>
            item._id === member._id
              ? { ...item, isActive: !member.isActive }
              : item
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!currentUser?.isAdmin) {
    return (
      <div className="p-6 text-center">
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>

          <p className="text-muted-foreground mt-1">
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

      {/* Form */}
      {showForm && (
        <div className="border rounded-xl p-6 mb-8 bg-card shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            {editingId ? "Edit Team Member" : "Add Team Member"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
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
            </div>

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

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">
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
                <label className="text-sm font-medium">
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

            <div className="grid sm:grid-cols-2 gap-5 items-end">
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
                  checked={formData.isActive}
                  onCheckedChange={(value) =>
                    setFormData({
                      ...formData,
                      isActive: value,
                    })
                  }
                />

                <span className="text-sm font-medium">
                  Show on About page
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </Button>

              <Button type="submit">
                {editingId ? "Update Member" : "Add Member"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Team List */}
      <div className="border rounded-xl overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-semibold text-lg">
            Team Members
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading team members...
          </div>
        ) : team.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No team members yet.
          </div>
        ) : (
          <div className="divide-y">
            {team
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((member) => (
                <div
                  key={member._id}
                  className="p-5 flex flex-col md:flex-row md:items-center gap-5"
                >
                  {/* Image */}
                  <img
                    src={
                      member.image ||
                      "https://via.placeholder.com/100"
                    }
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover bg-muted"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold">
                      {member.name}
                    </h3>

                    <p className="text-sm text-orange-500">
                      {member.position}
                    </p>

                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {member.bio}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={member.isActive}
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

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(member)}
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