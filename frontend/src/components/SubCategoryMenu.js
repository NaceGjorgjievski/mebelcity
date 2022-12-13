import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        getCategories: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function SubCategoryMenu(props) {
  const [{ loading, getCategories }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `/api/category/getSubCategory?subCategory=${props.subCategory}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };
    fetchData();
  }, [props.subCategory]);

  return (
    <li>
      {getCategories && (
        <Link
          to={`/products/${props.category.categorySlug}/${getCategories[0].subCategorySlug}`}
        >
          {getCategories && getCategories[0].subCategoryName}
        </Link>
      )}
    </li>
  );
}

export default SubCategoryMenu;
