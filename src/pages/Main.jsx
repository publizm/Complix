import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import media from '../libs/MediaQuery';

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
  padding: 100px 50px;
  color: #fff;

  ${media.mobile`
    height: 60vh;
    padding: 100px 15px 15px;
  `}

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
    background: url('https://image.tmdb.org/t/p/original/${props.visual}') center center no-repeat;
    background-size: cover;
  `}

  .title {
    display: inline-block;
    overflow: hidden;
    position: relative;
    max-width: 700px;
    max-height: 4.8em;
    z-index: 1;
    font-weight: 700;
    font-size: 5rem;
    line-height: 1.2;
    color: #fff;
    white-space: normal;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    ${media.tablet`
      max-height: 3.6em;
      -webkit-line-clamp: 3;
    `}

    ${media.mobile`
      max-width: 100%;
      max-height: 2.4em;
      -webkit-line-clamp: 2;
      font-size: 3rem;
    `}
  }

  .overview {
    display: inline-block;
    overflow: hidden;
    position: relative;
    z-index: 1;
    max-width: 700px;
    max-height: 4.8em;
    margin: 30px 0 0;
    font-size: 1.8rem;
    line-height: 1.2;
    color: #fff;
    white-space: normal;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    ${media.tablet`
      max-height: 3.6em;
      -webkit-line-clamp: 3;
    `}

    ${media.mobile`
      max-height: 2.4em;
      -webkit-line-clamp: 2;
      max-width: 100%;
      font-size: 1.6rem;
    `}
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
