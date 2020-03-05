import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import MediaSection from '../components/Media/MediaSection';
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

const Main = ({
  newMovie,
  newTv,
  trending,
  popularMovie,
  popularTv,
  getMainMedia,
  selectCategory,
}) => {
  const [visual, setVisual] = useState({});
  const [query, setQuery] = useState('');

  useEffect(() => {
    getMainMedia();
  }, [getMainMedia]);

  useEffect(() => {
    if (trending) {
      const randomIdx = Math.floor(Math.random() * Math.floor(trending.length));
      setVisual(trending[randomIdx]);
    }
  }, [trending]);

  const getSearchList = (list, query) => {
    setQuery(query);
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
        <MediaSection
          title="New Movies"
          category="newMovie"
          mediaItems={newMovie}
          selectCategory={selectCategory}
        />
        <MediaSection
          title="New TV Programs"
          category="newTv"
          mediaItems={newTv}
          selectCategory={selectCategory}
        />
        <MediaSection
          title="Trending"
          category="trending"
          mediaItems={trending}
          selectCategory={selectCategory}
        />
        <MediaSection
          title="Popular Movies"
          category="popularMovie"
          mediaItems={popularMovie}
          selectCategory={selectCategory}
        />
        <MediaSection
          title="Popular TV Programs"
          category="popularTv"
          mediaItems={popularTv}
          selectCategory={selectCategory}
        />
      </div>
    </>
  );
};

export default Main;
