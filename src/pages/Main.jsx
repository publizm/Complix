import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
// import uuid from 'uuid';
import styled, { css } from 'styled-components';

import MediaSection from '../components/Movie/MediaSection';
import Header from '../components/Header';

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
    max-width: 600px;
    margin: 30px 0 0;
    font-size: 1.8rem;
  }
`;

function Main(props) {
  const [visual, setVisual] = useState({});
  // const [newMovies, setNewMovies] = useState([]);
  // const [newTv, setNewTv] = useState([]);
  // const [popularTv, setPopularTv] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);
  const [trending, setTrending] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const [selectedTv, setSelectedTv] = useState(null);
  // const [selectedTrending, setSelectedTrending] = useState(null);
  // const [selectedPopularTv, setSelectedPopularTv] = useState(null);
  // const [selectedPopularMovie, setSelectedPopularMovie] = useState(null);
  // const [searchList, setSearchList] = useState(null);
  const [query, setQuery] = useState('');

  useLayoutEffect(() => {
    const getNewMovieList = async () => {
      try {
        // const { data } = await axios.get(
        //   'https://api.themoviedb.org/3/movie/now_playing',
        //   {
        //     params: {
        //       api_key: process.env.REACT_APP_MOVIE_API_KEY,
        //       language: 'en-US',
        //       page: 1,
        //     },
        //   },
        // );
        // setNewMovies(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const getNewTvList = async () => {
      try {
        // const { data } = await axios.get(
        //   'https://api.themoviedb.org/3/tv/on_the_air',
        //   {
        //     params: {
        //       api_key: process.env.REACT_APP_MOVIE_API_KEY,
        //       language: 'en-US',
        //       page: 1,
        //     },
        //   },
        // );
        // setNewTv(data.results);
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
              api_key: process.env.REACT_APP_MOVIE_API_KEY,
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
              api_key: process.env.REACT_APP_MOVIE_API_KEY,
              language: 'en-US',
              page: 1,
            },
          },
        );
        // setPopularTv(data.results);
        console.log(data.results);
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
              api_key: process.env.REACT_APP_MOVIE_API_KEY,
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

  useLayoutEffect(() => {
    const randomIdx = Math.floor(Math.random() * Math.floor(trending.length));
    setVisual(trending[randomIdx]);
  }, [trending]);

  // const onReset = () => {
  //   setSelectedMovie(null);
  //   setSelectedTv(null);
  //   setSelectedTrending(null);
  //   setSelectedPopularTv(null);
  //   setSelectedPopularMovie(null);
  // };

  const getSearchList = (list, query) => {
    setQuery(query);
    // setSearchList(list);
  };

  return (
    <>
      <Header onSearch={getSearchList} query={query} />
      <div className="container">
        {visual && visual.backdrop_path && (
          <VisualArea visual={visual.backdrop_path}>
            <p className="title">{visual.title || visual.original_name}</p>
            <p className="overview">{visual.overview}</p>
          </VisualArea>
        )}

        <MediaSection title="Popular Movies" mediaItems={popularMovie} />
        {/* <MediaSection title="Popular Movies">
          {popularMovie && (
            <>
              <ScrollItem
                data={popularMovie.map(movie => (
                  <MediaItem
                    key={uuid.v4()}
                    id={movie.id}
                    title={movie.title}
                    posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    category={'popularMovie'}
                  />
                ))}
                alignCenter={false}
                // onWheel={event => {
                //   event.nativeEvent.stopImmediatePropagtion();
                // }}
              />
              {selectedPopularMovie && (
                <ItemDetail
                  title={
                    selectedPopularMovie.original_name ||
                    selectedPopularMovie.original_title ||
                    selectedPopularMovie.title
                  }
                  average={selectedPopularMovie.vote_average}
                  release={selectedPopularMovie.release_date}
                  overview={selectedPopularMovie.overview}
                  bgUrl={selectedPopularMovie.backdrop_path}
                  onReset={onReset}
                />
              )}
            </>
          )}
        </MediaSection> */}
      </div>
    </>
  );
}

export default Main;
