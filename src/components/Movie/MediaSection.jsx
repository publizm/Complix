import React from 'react';
import styled from 'styled-components';

const MediaSectionBlock = styled.section`
  margin: 30px 0 0;
  padding: 0 0 0 50px;

  h2 {
    margin: 0 0 30px;
    font-weight: 700;
    font-size: 4rem;
  }

  & + & {
    margin: 150px 0 0;
  }
`;

const MediaSection = ({ title, children, onWheel }) => {
  return (
    <MediaSectionBlock onWheel={onWheel}>
      <h2>{title}</h2>
      {children}
    </MediaSectionBlock>
  );
};

export default MediaSection;
