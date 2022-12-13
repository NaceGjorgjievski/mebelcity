import React from "react";
import { Link } from "react-router-dom";
import SubCategoryMenu from "./SubCategoryMenu";

function CategoryMenu(props) {
  let ul = document.getElementById("subCategoryList");

  const result = [];

  props.category.subCategories.forEach((sub) => {
    result.push(
      <SubCategoryMenu
        subCategory={sub}
        category={props.category}
      ></SubCategoryMenu>
    );
  });

  const categoryUrl = `/products/${props.category.categorySlug}/all`;
  return (
    <div>
      <Link to={categoryUrl}>
        <span>{props.category.categoryName}</span>
      </Link>
      <ul id="subCategoryList">{result}</ul>
    </div>
  );
}

export default CategoryMenu;
