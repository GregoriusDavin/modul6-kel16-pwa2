// LandingPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import Card from "../components/card";
import Modal from "../components/modal";

export default function LandingPage() {
  const [data, setData] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(" ");

  // Modal
  const [modalShow, setModalShow] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchData = async (query) => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://imdb8.p.rapidapi.com/auto-complete",
          {
            params: { q: query },
            headers: {
              "x-rapidapi-host": "imdb8.p.rapidapi.com",
              "x-rapidapi-key": "b86e0bdb92msh6012038d7a6209ep192c75jsn4d4896e01e98",
            },
          }
        );
        if (response.status === 200) {
          setData(response.data);
          setisLoaded(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    if (!isLoaded) {
      fetchData(query);
    }
  }, [isLoaded, query]);

  const onSearch = (e) => {
    if (e.key === "Enter") {
      setisLoaded(false);
      setQuery(e.target.value);
    }
  };

  const handleClick = (item) => {
    navigate(`/movie/${item.id}`); // Use navigate instead of history.push
  };

  return (
    <main>
      <input
        type="text"
        placeholder="Search film by name"
        onKeyDown={(e) => onSearch(e)}
      />
      <h3 className="title">Search : {query}</h3>
      {!data || isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {data.d.map((item, index) => (
            <Link to={`/movie/${item.id}`} key={index}>
              <Card data={item} onClick={() => handleClick(item)} />
            </Link>
          ))}
        </div>
      )}
      <Modal
        data={modalItem}
        isShow={modalShow}
        onCancel={() => setModalShow(false)}
      />
    </main>
  );
}
