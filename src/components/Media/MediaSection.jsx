import React from 'react';
import styled from 'styled-components';
import MediaSlider from './MediaSlider';
import ItemDetail from './ItemDetail';

const MediaSectionBlock = styled.section`
  overflow: hidden;
  margin: 30px 0 0;
  font-size: 3rem;
  color: #fff !important;

  h2 {
    margin: 0 0 30px;
    font-weight: 700;
    font-size: 4rem;
  }

  & + & {
    margin: 150px 0 0;
  }
`;

const MediaSection = ({ title, mediaItems, category, selectCategory }) => {
  return (
    <MediaSectionBlock>
      <h2>{title}</h2>
      <MediaSlider mediaItems={mediaItems} category={category} />
      {category === selectCategory && <ItemDetail />}
    </MediaSectionBlock>
  );
};

export default MediaSection;
