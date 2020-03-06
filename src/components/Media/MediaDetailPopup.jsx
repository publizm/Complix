import React from 'react';
import Popup from '../Popup';
import styled from 'styled-components';
import media from '../../libs/MediaQuery';

const ImgBox = styled.div`
  img {
    width: 100%;
  }
`;

const InfoArea = styled.div`
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

    ${media.mobile`
      font-size: 2.2rem;
    `}
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

    ${media.mobile`
      font-size: 1.8rem;

      span {
        font-size: 1.8rem;
      }
    `}
  }

  .overview {
    position: relative;
    z-index: 1;
    margin: 20px 0 0;
    font-size: 1.6rem;
  }
`;

const MediaDetailPopup = React.memo(({ visible, hide, info }) => {
  const {
    original_name: originName,
    name: mediaName,
    title: mediaTitle,
    original_title: originTitle,
    vote_average: average,
    release_date: release,
    overview,
    backdrop_path: bgUrl,
  } = info;

  return (
    <Popup visible={visible} hide={hide}>
      <ImgBox>
        <img
          src={`https://image.tmdb.org/t/p/original/${bgUrl}`}
          alt={originTitle}
        />
      </ImgBox>
      <InfoArea>
        <p className="title">
          {originName || mediaName || mediaTitle || originTitle}
        </p>
        <p className="summary">
          <span>
            <i>
              <img src="/images/star.png" alt="average_icon" />
            </i>
            {average}
          </span>
          <span>{release}</span>
        </p>
        <p className="overview">{overview}</p>
      </InfoArea>
    </Popup>
  );
});

export default MediaDetailPopup;
