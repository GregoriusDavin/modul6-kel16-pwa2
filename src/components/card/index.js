// components/card/index.js
import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

export default function Card({ data, onClick }) {
  return (
    <Link to={`/movie/${data.id}`}>
      <div className="card" onClick={onClick}>
        {data ? (
          <>
            {data.i && data.i.imageUrl ? (
              <figure>
                <img src={data.i.imageUrl} alt={data.l} />
              </figure>
            ) : (
              <p>No Image</p>
            )}
            <div className="card-info">
              <h3>{data.l}</h3>
              <p>{data.q}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Link>
  );
}
