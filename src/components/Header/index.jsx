import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import media from '../../libs/MediaQuery';
import Button from '../Common/Button';
import { debounce } from 'lodash';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import { searchMediaSaga } from '../../redux/modules/media';

const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 15px 30px;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );

  ${media.mobile`
    padding: 15px;
  `}
`;

const Logo = styled.h1`
  width: 100px;

  img {
    width: 100%;
  }

  a {
    display: block;
  }

  ${media.mobile`
    flex: 1 0 auto;
    max-width: 100px;
    margin: 0 5px 0 0;
  `}
`;

const UtillArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: flex-end;
`;

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px 0 0;
`;

const SearchBox = styled.div`
  overflow: hidden;
  width: 0;
  margin: 0 10px 0 0;
  padding: 0 0 0 20px;
  border: 1px solid #e50914;
  background: #000 url('/images/search-icon.png') 5px center no-repeat;
  background-size: 18px;
  opacity: 0;
  transform-origin: right center;
  transition: all 0.3s;
  transform: scaleX(0);

  ${props =>
    props.searchOpen &&
    css`
      width: 230px;
      transform: scaleX(1);
      opacity: 1;
    `}

  ${media.mobile`
    width: auto;
  `};
`;

const SearchBar = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  border: none;
  font-size: 1.2rem;
  background: none;
  transition: all 0.3s;
`;

const SearchButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  background: none;

  img {
    width: 100%;
  }
`;

const Header = () => {
  const query = useSelector(state => state.media.searched.query);
  const dispatch = useDispatch();
  const [searchOpen, setSearchOpen] = useState(false);
  const history = useHistory();

  const handleOnChange = debounce(async value => {
    if (!value || value === query) return;

    dispatch(searchMediaSaga(value));
  }, 800);

  useEffect(() => {
    if (history.location.pathname === '/result') {
      const { search: query } = qs.parse(history.location.search);

      if (query === '') return;

      dispatch(searchMediaSaga(query));
    }
  }, [dispatch, history.location.pathname, history.location.search]);

  const handleSearch = () => {
    setSearchOpen(prevOpen => !prevOpen);
  };

  return (
    <StyledHeader>
      <Logo>
        <Link to="/">
          <img src="/images/logo.png" alt="logo" />
        </Link>
      </Logo>
      <UtillArea>
        <SearchArea>
          <SearchBox searchOpen={searchOpen}>
            <SearchBar
              type="text"
              placeholder="Titles, people, genres"
              defaultValue={query}
              onChange={({ target }) => {
                handleOnChange(target.value.trim());
              }}
            />
          </SearchBox>
          <SearchButton
            type="button"
            onClick={handleSearch}
            searchOpen={searchOpen}
          >
            {!searchOpen ? (
              <img src="/images/search-icon.png" alt="검색" />
            ) : (
              <img src="/images/close-white-40x40.png" alt="닫기" />
            )}
          </SearchButton>
        </SearchArea>
        <Button
          width="100"
          size="medium"
          color="red"
          onClick={() => {
            localStorage.removeItem('token');
            history.push('/signin');
          }}
        >
          Signout
        </Button>
      </UtillArea>
    </StyledHeader>
  );
};

export default Header;
