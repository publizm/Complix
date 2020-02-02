import styled, { css } from 'styled-components';

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

export default VisualArea;
