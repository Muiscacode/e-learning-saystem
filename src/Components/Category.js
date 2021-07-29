import React from "react";
import { Link } from "react-router-dom";

const categorias = [
  "Boyaca",
  "Meta",
  "Tolima",
  "Otros",
  "Ciencia y tecnologia"
];

const Category = () => {
  return (
    <ul className="list-group">
      {categorias.map((cat, id) => {
        return (
          <Link
            to={{
              pathname: `/${cat}`,
              state: {
                cat: cat
              }
            }}
            key={id}
          >
            <li className="list-group-item">
              <span className="badge badge-primary">{cat}</span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default Category;
