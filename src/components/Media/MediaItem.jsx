import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import './slider.css';
import { selectMediaSaga } from '../../redux/modules/media';

const Item = styled.div`
  overflow: hidden;
  position: relative;
  border: 2px solid transparent;
  cursor: pointer;

  img {
    width: 100%;
  }

  & > div {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 20px;
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(100%);
    transition: all 0.3s;
  }

  ${props =>
    props.isOver
      ? css`
          div {
            opacity: 1;
            transform: translateY(0);
          }
        `
      : css`
          div {
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

const SummaryTitle = styled.p`
  font-size: 1.6rem;
`;

const Average = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0 0;

  & > i {
    display: inline-block;
    width: 30px;
    margin: 0 10px 0 0;
  }
`;

const MediaItem = React.memo(({ average, posterUrl, title, id, category }) => {
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
    dispatch(selectMediaSaga({ id, category }));
    setIsSelect(prev => !prev);
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
      <div>
        <SummaryTitle>{title}</SummaryTitle>
        <Average>
          <i>
            <img src="/star.png" alt="average_icon" />
          </i>
          {average}
        </Average>
      </div>
    </Item>
  );
});

export default MediaItem;
