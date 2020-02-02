import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import media from '../libs/MediaQuery';
import Button from '../components/Button';
import { debounce } from 'lodash';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Header(props) {
  const history = useHistory();

  const Logo = styled.h1`
    width: 100px;

    img {
      width: 100%;
    }

    ${media.mobile`
      width: 130px;
    `}
  `;

  const StyledHeader = styled.header`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    padding: 15px 30px;
    justify-content: space-between;
    align-items: center;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 10%,
      rgba(0, 0, 0, 0)
    );
  `;

  const StyledNav = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;

    ul {
      margin-left: 50px;
      font-size: 1.4rem;
    }
  `;

  const SearchBar = styled.input`
    display: inline-block;
    width: 230px;
    height: 30px;
    padding-left: 15px;
    background: #000;
    margin-right: 10px;
    border: 1px solid #000;
    border-radius: 3px;
    transition: all 0.3s;

    &:focus {
      border: 1px solid #e50914;
    }
  `;

  const handleOnChange = debounce(async query => {
    if (!query) return;
    try {
      const { data } = await axios.get(
        'https://api.themoviedb.org/3/search/multi',
        {
          params: {
            api_key: process.env.REACT_APP_API_TOKEN,
            query,
          },
        },
      );
      props.onSearch(data.results, query);
    } catch (err) {
      console.log(err);
    }
  }, 800);

  return (
    <StyledHeader>
      <StyledNav>
        <Logo>
          <Link to="/">
            <img src="/logo.png" alt="logo" />
          </Link>
        </Logo>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </StyledNav>
      <div>
        <SearchBar
          type="search"
          placeholder="Titles, people, genres"
          defaultValue={props.query}
          onChange={({ target }) => {
            handleOnChange(target.value.trim());
          }}
        />
        <Button
          width="100"
          size="small"
          color="red"
          onClick={() => {
            localStorage.removeItem('token');
            history.push('/signin');
          }}
        >
          Log out
        </Button>
      </div>
    </StyledHeader>
  );
}

export default Header;
