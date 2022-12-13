import express, { query } from "express";
import Product from "../models/productModel.js";
import multer from "multer";
import expressAsyncHandler from "express-async-handler";
import userRouter from "./userRoutes.js";

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../frontend/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const multipleUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "sideImage", maxCount: 1 },
  { name: "sideImage2", maxCount: 1 },
  { name: "dimension", maxCount: 1 },
  { name: "scheme", maxCount: 1 },
]);
productRouter.post(
  "/add",
  multipleUpload,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      image: `/uploads/${req.files.image[0].originalname}`,
      sideImage: `/uploads/${req.files.sideImage[0].originalname}`,
      sideImage2: `/uploads/${req.files.sideImage2[0].originalname}`,
      dimension: `/uploads/${req.files.dimension[0].originalname}`,
      scheme: `/uploads/${req.files.scheme[0].originalname}`,
      category: req.body.category,
      subCategory: req.body.subCategory,
      description: req.body.description,
      price: req.body.price,
      priceMontaza: req.body.priceMontaza,
      countInStock: req.body.countInStock,
      height: req.body.H,
      width: req.body.W,
      length: req.body.L,
    });

    const product = await newProduct.save();
    if (product)
      res.status(201).send({ message: "New Product Created", product });
    else res.status(404).send({ message: "Error creating product" });
  })
);

const PAGE_SIZE = 7;

productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const searchQuery = query.text;
    console.log("HEEEY: " + searchQuery);
    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? { name: { $regex: searchQuery, $options: "i" } }
        : {};
    const descriptionFilter =
      searchQuery && searchQuery !== "all"
        ? { description: { $regex: searchQuery, $options: "i" } }
        : {};
    const slug =
      searchQuery && searchQuery !== "all"
        ? { slug: { $regex: searchQuery, $options: "i" } }
        : {};
    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { slug: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { slug: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const subCategory = query.subCategory || "";
    const order = query.order || "";
    const searchQuery = query.query || "";
    const HF = query.HF || 0;
    const HT = query.HT || 1000;
    const WF = query.WF || 0;
    const WT = query.WT || 1000;
    const LF = query.LF || 0;
    const LT = query.LT || 1000;

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? { name: { $regex: searchQuery, $options: "i" } }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const subCategoryFilter =
      subCategory && subCategory !== "all" ? { subCategory } : {};
    const sortOrder =
      order === "lowFirst"
        ? { price: 1 }
        : order === "highFirst"
        ? { price: -1 }
        : { createdAt: -1 };
    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...subCategoryFilter,
      $and: [
        { height: { $gte: HF } },
        { height: { $lte: HT } },
        { width: { $gte: WF } },
        { width: { $lte: WT } },
        { length: { $gte: LF } },
        { length: { $lte: LT } },
      ],
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...subCategoryFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);
/*
productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
*/
productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Продуктот не е пронајден" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Продуктот не е пронајден" });
  }
});

productRouter.put(
  "/edit",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.updateOne(
      { slug: req.body.slug },
      {
        $set: {
          name: req.body.name,
          category: req.body.category,
          slug: req.body.slug,
          subCategory: req.body.subCategory,
          description: req.body.description,
          price: req.body.price,
          priceMontaza: req.body.priceMontaza,
          countInStock: req.body.countInStock,
        },
      }
    );
    /*
    if (product) {
      product.name = req.body.name || product.name;
      product.slug = req.body.slug || product.slug;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.subCategory = req.body.subCategory || product.subCategory;
      product.description = req.body.description || product.description;
      product.priceMontaza = req.body.priceMontaza || product.priceMontaza;
      product.countInStock = req.body.countInStock || product.countInStock;
      product.image = product.image;
      product.sideImage = product.sideImage2;
      product.sideImage2 = product.sideImage2;

      const updatedProduct = await product.save();*/
    res.status(200).send({ message: "Succesful" });
    //else {
    //res.status(404).send({ message: "Product Not Found" });
  })
);
export default productRouter;
