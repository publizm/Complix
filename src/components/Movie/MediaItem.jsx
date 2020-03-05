import React, { useCallback } from 'react';
import styled from 'styled-components';
import './slider.css';

const Item = styled.div`
  img {
    width: 100%;
  }
`;

const MediaItem = ({ posterUrl, id, category }) => {
  const onSelect = useCallback(() => {
    // if (category === 'newMovies') {
    //   const [_selectedMovie] = newMovies.filter(movie => movie.id === id);
    //   setSelectedTv(null);
    //   setSelectedTrending(null);
    //   setSelectedPopularTv(null);
    //   setSelectedPopularMovie(null);
    //   setSelectedMovie(_selectedMovie);
    // }
    // if (category === 'newTv') {
    //   const [_selectedTv] = newTv.filter(tv => tv.id === id);
    //   setSelectedMovie(null);
    //   setSelectedTrending(null);
    //   setSelectedPopularTv(null);
    //   setSelectedPopularMovie(null);
    //   setSelectedTv(_selectedTv);
    // }
    // if (category === 'trending') {
    //   const [_selectedTrending] = trending.filter(
    //     trending => trending.id === id,
    //   );
    //   setSelectedMovie(null);
    //   setSelectedTv(null);
    //   setSelectedPopularTv(null);
    //   setSelectedPopularMovie(null);
    //   setSelectedTrending(_selectedTrending);
    // }
    // if (category === 'popularTv') {
    //   const [_selectedPopularTv] = popularTv.filter(tv => tv.id === id);
    //   setSelectedMovie(null);
    //   setSelectedTv(null);
    //   setSelectedTrending(null);
    //   setSelectedPopularMovie(null);
    //   setSelectedPopularTv(_selectedPopularTv);
    // }
    // if (category === 'popularMovie') {
    //   const [_selectedPopularMovie] = popularMovie.filter(
    //     movie => movie.id === id,
    //   );
    //   setSelectedMovie(null);
    //   setSelectedTv(null);
    //   setSelectedTrending(null);
    //   setSelectedPopularTv(null);
    //   setSelectedPopularMovie(_selectedPopularMovie);
    // }
  }, []);

  return (
    <Item onClick={onSelect}>
      <img src={posterUrl} alt="poster" />
    </Item>
  );
};

export default MediaItem;
