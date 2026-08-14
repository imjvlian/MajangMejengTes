import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const DashboardCategories = () => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("/api/category/getcategories");
    const data = await res.json();

    if (res.ok) {
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/category/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast({
        title: data.message,
      });

      return;
    }

    toast({
      title: "Category created",
    });

    setName("");

    fetchCategories();
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/category/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      toast({
        title: data.message,
      });

      return;
    }

    toast({
      title: "Category deleted",
    });

    setCategories((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-10">
        <Input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button type="submit">Add</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{category.name}</TableCell>

              <TableCell>{category.slug}</TableCell>

              <TableCell>
                {new Date(category.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardCategories;
