import Category from "../models/category.model.js";
import { errorHandler } from "../utils/error.js";

export const createCategory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Unauthorized"));
  }

  try {
    const slug = req.body.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const category = new Category({
      name: req.body.name,
      slug,
    });

    await category.save();

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Unauthorized"));
  }

  try {
    const slug = req.body.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        slug,
      },
      {
        new: true,
      }
    );

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Unauthorized"));
  }

  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    next(error);
  }
};