import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import SubCategory from "../models/subCategoryModel.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/addCategory",
  expressAsyncHandler(async (req, res) => {
    const newCategory = new Category({
      categoryName: req.body.category,
      categorySlug: req.body.categorySlug,
      subCategories: req.body.categories,
    });
    const category = await newCategory.save();
    if (category)
      res.status(201).send({ message: "New Category Created", category });
    else res.status(404).send({ message: "Error creating category" });
  })
);

categoryRouter.put(
  "/updateCategory",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findOne({
      categorySlug: req.body.category,
    });

    if (category) {
      category.categoryName = category.categoryName;
      category.categorySlug = category.categorySlug;
      category.subCategories = req.body.categories;

      const updatedCategory = await category.save();
      res.send(updatedCategory);
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryRouter.get(
  "/getCategories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
  })
);

categoryRouter.get(
  "/getCategory",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.find({ categorySlug: req.query.category });
    res.send(category);
  })
);

categoryRouter.post(
  "/addSubCategory",
  expressAsyncHandler(async (req, res) => {
    const newSubCategory = new SubCategory({
      subCategoryName: req.body.subCategory,
      subCategorySlug: req.body.subCategorySlug,
    });
    const subCategory = await newSubCategory.save();
    if (subCategory)
      res.status(201).send({ message: "New Category Created", subCategory });
    else res.status(404).send({ message: "Error creating category" });
  })
);

categoryRouter.get(
  "/getSubCategory",
  expressAsyncHandler(async (req, res) => {
    const subCategory = await SubCategory.find({
      subCategorySlug: req.query.subCategory,
    });
    res.send(subCategory);
  })
);

export default categoryRouter;
