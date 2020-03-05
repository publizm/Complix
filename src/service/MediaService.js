import axios from 'axios';

export default class MediaService {
  static newMovie = async () => {
    return await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
  };

  static newTv = async () => {
    return await axios.get('https://api.themoviedb.org/3/tv/on_the_air', {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
  };

  static trending = async () => {
    return await axios.get('https://api.themoviedb.org/3/trending/all/week', {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
      },
    });
  };

  static popularTv = async () => {
    return await axios.get('https://api.themoviedb.org/3/tv/popular', {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
  };

  static popularMovie = async () => {
    return await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
  };
}
