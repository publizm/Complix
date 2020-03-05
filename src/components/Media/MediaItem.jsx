import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import './slider.css';
import { selectMediaSaga } from '../../redux/modules/media';

const Item = styled.div`
  overflow: hidden;
  position: relative;
  border: 2px solid transparent;
  img {
    width: 100%;
  }
  p {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 20px;
    font-size: 1.6rem;
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(100%);
    transition: all 0.3s;
  }

  ${props =>
    props.isOver
      ? css`
          p {
            opacity: 1;
            transform: translateY(0);
          }
        `
      : css`
          p {
            opacity: 0;
          }
        `}

  ${props =>
    props.isSelect
      ? css`
          border-color: red;
        `
      : css`
          border-color: transparent;
        `}
`;
const MediaItem = React.memo(({ posterUrl, title, id, category }) => {
  const seletedId = useSelector(state => state.media.selected.id);
  const dispatch = useDispatch();
  const [isOver, setIsOver] = useState(false);
  const [isSelect, setIsSelect] = useState(false);

  const onHover = useCallback(() => {
    setIsOver(true);
  }, []);

  const offHover = useCallback(() => {
    setIsOver(false);
  }, []);

  useEffect(() => {
    if (seletedId === id) setIsSelect(true);
    else setIsSelect(false);
  }, [id, seletedId]);

  const onSelect = useCallback(() => {
    console.log(category);
    dispatch(selectMediaSaga({ id, category }));
    setIsSelect(prev => !prev);
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
  }, [category, dispatch, id]);

  return (
    <Item
      onClick={onSelect}
      isOver={isOver}
      isSelect={isSelect}
      onMouseOver={onHover}
      onMouseLeave={offHover}
    >
      <img src={posterUrl} alt="poster" />
      <p>{title}</p>
    </Item>
  );
});

export default MediaItem;
