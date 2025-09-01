import { Request, Response } from "express";
import Category from "../../models/category.model";
import { systemConfig } from "../../config/system";

// [GET] /admin/categories/
export const index = async (req: Request, res: Response) => {
  // SELECT * FROM categories WHERE deleted = false;
  const categories = await Category.findAll({
    where: {
      deleted: false,
    },
    raw: true
  });

  res.render("admin/pages/categories/index", {
    pageTitle: "Danh mục tour",
    categories: categories
  });
};

// [GET] /admin/categories/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/categories/create", {
    pageTitle: "Thêm mới danh mục tour",
  });
}

// [POST] /admin/categories/create
export const createPost = async (req: Request, res: Response) => {
  const countCategory = await Category.count();

  if (req.body.position === "") {
    req.body.position = countCategory + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const dataCategory = {
    title: req.body.title,
    image: JSON.stringify(req.body.image),
    description: req.body.description,
    status: req.body.status,
    position: req.body.position,
  };

  await Category.create(dataCategory);
  
  res.redirect(`/${systemConfig.prefixAdmin}/categories`)
}