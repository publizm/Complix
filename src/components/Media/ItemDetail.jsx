import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectMediaSaga } from '../../redux/modules/media';
import media from '../../libs/MediaQuery';

const ItemDetailBlock = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: relative;
  min-height: 500px;
  padding: 50px;
  z-index: 2;

  ${props => css`
    background: url(https://image.tmdb.org/t/p/original/${props.bgUrl}) center
      right no-repeat;
    background-size: cover;
  `}

  .info-area {
    width: 40%;
    height: 100%;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 60%;
      background-image: linear-gradient(to right, #000, transparent);
    }
    ${media.mobile`
      width: 100%;
    `}
  }

  .title {
    position: relative;
    z-index: 1;
    font-size: 5rem;
  }

  .summary {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    margin: 20px 0 0;
    font-size: 1.5rem;

    span {
      display: inline-flex;
      align-items: center;
      font-size: 2.5rem;
      margin: 0 0 0 20px;

      i {
        width: 30px;
        margin: 0 10px 0 0;

        img {
          width: 100%;
        }
      }

      &:first-child {
        margin: 0;
      }
    }
  }

  .overview {
    position: relative;
    z-index: 1;
    margin: 20px 0 0;
    font-size: 1.7rem;
  }

  .close {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: none;
    background: none;
    text-indent: -9999em;

    &:before {
      position: absolute;
      top: 20px;
      right: 0;
      content: '';
      width: 30px;
      height: 3px;
      background: #fff;
      transform: rotate(45deg);
      transform-origin: 10px -8px;
    }

    &:after {
      position: absolute;
      top: 20px;
      right: 0;
      content: '';
      width: 30px;
      height: 3px;
      background: #fff;
      transform: rotate(-45deg);
      transform-origin: 12px 12px;
    }
  }
`;

const ItemDetail = () => {
  const {
    original_name: originName,
    name: mediaName,
    title: mediaTitle,
    original_title: originTitle,
    vote_average: average,
    release_date: release,
    overview,
    backdrop_path: bgUrl,
  } = useSelector(state => state.media.selected.media);
  const dispatch = useDispatch();

  const closeDetail = () => {
    dispatch(selectMediaSaga({ id: null, category: null, media: null }));
  };

  return (
    <ItemDetailBlock className="item-detail" bgUrl={bgUrl}>
      <div className="info-area">
        <p className="title">
          {originName || mediaName || mediaTitle || originTitle}
        </p>
        <p className="summary">
          <span>
            <i>
              <img src="/star.png" alt="average_icon" />
            </i>
            {average}
          </span>
          <span>{release}</span>
        </p>
        <p className="overview">{overview}</p>
      </div>
      <button type="button" className="close" onClick={closeDetail}>
        Close
      </button>
    </ItemDetailBlock>
  );
};

export default ItemDetail;
