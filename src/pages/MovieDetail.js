import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";

export default function MovieDetail() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          "https://imdb8.p.rapidapi.com/title/get-overview-details",
          {
            params: {
              tconst: id,
              currentCountry: "US",
            },
            headers: {
              "X-RapidAPI-Key": "b86e0bdb92msh6012038d7a6209ep192c75jsn4d4896e01e98",
              "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
            },
          }
        );

        if (response.status === 200) {
          setMovieDetail(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  return (
    <div className="movie-detail-container">
      {movieDetail ? (
        <>
          <h2 className="movie-title">{movieDetail.title?.title}</h2>
          {movieDetail.title?.image && (
            <img
              className="movie-image"
              src={movieDetail.title.image.url}
              alt={movieDetail.title.title}
            />
          )}
          {movieDetail.ratings && (
            <p className="movie-rating">
              Rating: {movieDetail.ratings.rating.toFixed(1)} (
              {movieDetail.ratings.ratingCount} votes)
            </p>
          )}
          {movieDetail.plotSummary && movieDetail.plotSummary.author && (
            <p className="movie-author">Author: {movieDetail.plotSummary.author}</p>
          )}
          {movieDetail.genres && (
            <p className="movie-genres">Genres: {movieDetail.genres.join(", ")}</p>
          )}
          {movieDetail.plotSummary && movieDetail.plotSummary.text && (
            <p className="movie-plot-summary">{movieDetail.plotSummary.text}</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
