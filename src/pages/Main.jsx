import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'query-string';
import uuid from 'uuid';
import styled, { css } from 'styled-components';

function Main(props) {
  const [visual, setVisual] = useState({});
  const [newMovies, setNewMovies] = useState([]);
  const [newTv, setNewTv] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const getNewMovieList = async () => {
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
        setNewMovies(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const getNewTvList = async () => {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/tv/on_the_air',
          {
            params: {
              api_key: process.env.REACT_APP_API_TOKEN,
              language: 'en-US',
              page: 1,
            },
          },
        );
        setNewTv(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const getTrendingList = async () => {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/trending/all/week',
          {
            params: {
              api_key: process.env.REACT_APP_API_TOKEN,
            },
          },
        );
        setTrending(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const getPopularTvList = async () => {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/tv/popular',
          {
            params: {
              api_key: process.env.REACT_APP_API_TOKEN,
              language: 'en-US',
              page: 1,
            },
          },
        );
        setPopularTv(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const getPopularMovieList = async () => {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/movie/popular',
          {
            params: {
              api_key: process.env.REACT_APP_API_TOKEN,
              language: 'en-US',
              page: 1,
            },
          },
        );
        setPopularMovie(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    getNewMovieList();
    getNewTvList();
    getTrendingList();
    getPopularTvList();
    getPopularMovieList();
  }, []);

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * Math.floor(trending.length));
    setVisual(trending[randomIdx]);
  }, [trending]);

  const VisualArea = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: 90vh;
    padding: 100px 300px 100px 50px;
    color: #fff;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
    }

    ${props => css`
      background: url('https://image.tmdb.org/t/p/original/${props.visual}')
        center center no-repeat;
      background-size: cover;
    `}

    .title {
      position: relative;
      z-index: 1;
      font-weight: 700;
      font-size: 5rem;
      color: #fff;
    }

    .overview {
      position: relative;
      z-index: 1;
      margin: 30px 0 0;
      font-size: 2rem;
    }
  `;

  console.log(visual);
  return (
    <div>
      {visual && visual.backdrop_path && (
        <VisualArea visual={visual.backdrop_path}>
          <p className="title">{visual.title || visual.original_name}</p>
          <p className="overview">{visual.overview}</p>
        </VisualArea>
      )}

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
