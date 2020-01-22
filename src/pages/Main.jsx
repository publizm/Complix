import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'query-string';
import uuid from 'uuid';

function Main(props) {
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing',
          {
            params: {
              api_key: process.env.REACT_APP_API_TOKEN,
              language: 'en-US',
              page: 1,
            },
          },
        );
        console.log(data.results);
        setNewMovies(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getMovieList();
  }, []);

  return (
    <div>
      메인입니다.
      <ul>
        {newMovies.map(m => {
          return (
            <li key={uuid.v4()}>
              {m.title}
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${m.backdrop_path}`}
                  alt="poster"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Main;
