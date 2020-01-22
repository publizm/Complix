import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import axios from 'axios';
import qs from 'query-string';
import uuid from 'uuid';
import ScrollItem from 'react-horizontal-scrolling-menu';
import VisualArea from '../components/VisualArea';
import MediaSection from '../components/MediaSection';
import ItemDetail from '../components/ItemDetail';
import Header from '../components/Header';

function Main(props) {
  const [visual, setVisual] = useState({});
  const [newMovies, setNewMovies] = useState([]);
  const [newTv, setNewTv] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);
  const [trending, setTrending] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTv, setSelectedTv] = useState(null);
  const [selectedTrending, setSelectedTrending] = useState(null);
  const [selectedPopularTv, setSelectedPopularTv] = useState(null);
  const [selectedPopularMovie, setSelectedPopularMovie] = useState(null);
  const [searchList, setSearchList] = useState(null);
  const [query, setQuery] = useState('');

  useLayoutEffect(() => {
    const getNewMovieList = async () => {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing',
          {
            params: {
              api_key: process.env.REACT_APP_API_TOKEN,
              language: 'en-US',
              page: 1,
            },
          },
        );

        setNewMovies(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const getNewTvList = async () => {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/tv/on_the_air',
          {
            params: {
              api_key: process.env.REACT_APP_API_TOKEN,
              language: 'en-US',
              page: 1,
            },
          },
        );
        setNewTv(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const getTrendingList = async () => {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/trending/all/week',
          {
            params: {
              api_key: process.env.REACT_APP_API_TOKEN,
            },
          },
        );
        setTrending(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const getPopularTvList = async () => {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/tv/popular',
          {
            params: {
              api_key: process.env.REACT_APP_API_TOKEN,
              language: 'en-US',
              page: 1,
            },
          },
        );
        setPopularTv(data.results);
        console.log(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const getPopularMovieList = async () => {
      try {
        const { data } = await axios.get(
          'https://api.themoviedb.org/3/movie/popular',
          {
            params: {
              api_key: process.env.REACT_APP_API_TOKEN,
              language: 'en-US',
              page: 1,
            },
          },
        );
        setPopularMovie(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    getNewMovieList();
    getNewTvList();
    getTrendingList();
    getPopularTvList();
    getPopularMovieList();
  }, []);

  useLayoutEffect(() => {
    const randomIdx = Math.floor(Math.random() * Math.floor(trending.length));
    setVisual(trending[randomIdx]);
  }, [trending]);

  const MediaItem = ({ posterUrl, id, category }) => {
    const onSelect = useCallback(() => {
      if (category === 'newMovies') {
        const [_selectedMovie] = newMovies.filter(movie => movie.id === id);
        setSelectedTv(null);
        setSelectedTrending(null);
        setSelectedPopularTv(null);
        setSelectedPopularMovie(null);
        setSelectedMovie(_selectedMovie);
      }

      if (category === 'newTv') {
        const [_selectedTv] = newTv.filter(tv => tv.id === id);
        setSelectedMovie(null);
        setSelectedTrending(null);
        setSelectedPopularTv(null);
        setSelectedPopularMovie(null);
        setSelectedTv(_selectedTv);
      }

      if (category === 'trending') {
        const [_selectedTrending] = trending.filter(
          trending => trending.id === id,
        );
        setSelectedMovie(null);
        setSelectedTv(null);
        setSelectedPopularTv(null);
        setSelectedPopularMovie(null);
        setSelectedTrending(_selectedTrending);
      }

      if (category === 'popularTv') {
        const [_selectedPopularTv] = popularTv.filter(tv => tv.id === id);
        setSelectedMovie(null);
        setSelectedTv(null);
        setSelectedTrending(null);
        setSelectedPopularMovie(null);
        setSelectedPopularTv(_selectedPopularTv);
      }

      if (category === 'popularMovie') {
        const [_selectedPopularMovie] = popularMovie.filter(
          movie => movie.id === id,
        );
        setSelectedMovie(null);
        setSelectedTv(null);
        setSelectedTrending(null);
        setSelectedPopularTv(null);
        setSelectedPopularMovie(_selectedPopularMovie);
      }
    }, [category, id]);

    return (
      <div className="menu-item" onClick={onSelect}>
        <img src={posterUrl} alt="poster" />
      </div>
    );
  };

  const onReset = () => {
    setSelectedMovie(null);
    setSelectedTv(null);
    setSelectedTrending(null);
    setSelectedPopularTv(null);
    setSelectedPopularMovie(null);
  };

  const getSearchList = (list, query) => {
    // console.log('in main', list);
    console.log(query);
    setQuery(query);
    setSearchList(list);
  };

  return (
    <>
      <Header onSearch={getSearchList} query={query} />
      {searchList ? (
        <section className="search-list-section">
          {searchList.map(item => {
            return (
              <div className="search-list" key={uuid.v4()}>
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : '/noimage.gif'
                  }
                  alt="poster"
                />
                <p>{item.title}</p>
                <p>{item.release_date}</p>
              </div>
            );
          })}
        </section>
      ) : (
        <div className="container">
          {visual && visual.backdrop_path && (
            <VisualArea visual={visual.backdrop_path}>
              <p className="title">{visual.title || visual.original_name}</p>
              <p className="overview">{visual.overview}</p>
            </VisualArea>
          )}

          <MediaSection title="New Movies">
            {newMovies && (
              <>
                <ScrollItem
                  data={newMovies.map(movie => (
                    <MediaItem
                      key={uuid.v4()}
                      id={movie.id}
                      title={movie.title}
                      posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      category="newMovies"
                    />
                  ))}
                  alignCenter={false}
                  // onWheel={event => {
                  //   event.nativeEvent.stopImmediatePropagtion();
                  // }}
                />
                {selectedMovie && (
                  <ItemDetail
                    title={
                      selectedMovie.original_name ||
                      selectedMovie.original_title ||
                      selectedMovie.title
                    }
                    average={selectedMovie.vote_average}
                    release={selectedMovie.release_date}
                    overview={selectedMovie.overview}
                    bgUrl={selectedMovie.backdrop_path}
                    onReset={onReset}
                  />
                )}
              </>
            )}
          </MediaSection>

          <MediaSection title="New TV Programs">
            {newTv && (
              <>
                <ScrollItem
                  data={newTv.map(tv => (
                    <MediaItem
                      key={uuid.v4()}
                      id={tv.id}
                      title={tv.title}
                      posterUrl={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                      category="newTv"
                    />
                  ))}
                  alignCenter={false}
                  // onWheel={event => {
                  //   event.nativeEvent.stopImmediatePropagtion();
                  // }}
                />
                {selectedTv && (
                  <ItemDetail
                    title={
                      selectedTv.original_name ||
                      selectedTv.original_title ||
                      selectedTv.title
                    }
                    average={selectedTv.vote_average}
                    release={selectedTv.release_date}
                    overview={selectedTv.overview}
                    bgUrl={selectedTv.backdrop_path}
                    onReset={onReset}
                  />
                )}
              </>
            )}
          </MediaSection>

          <MediaSection title="Trending">
            {trending && (
              <>
                <ScrollItem
                  data={trending.map(t => (
                    <MediaItem
                      key={uuid.v4()}
                      id={t.id}
                      title={t.title}
                      posterUrl={`https://image.tmdb.org/t/p/w500/${t.poster_path}`}
                      category="trending"
                    />
                  ))}
                  alignCenter={false}
                  // onWheel={event => {
                  //   event.nativeEvent.stopImmediatePropagtion();
                  // }}
                />
                {selectedTrending && (
                  <ItemDetail
                    title={
                      selectedTrending.original_name ||
                      selectedTrending.original_title ||
                      selectedTrending.title
                    }
                    average={selectedTrending.vote_average}
                    release={selectedTrending.release_date}
                    overview={selectedTrending.overview}
                    bgUrl={selectedTrending.backdrop_path}
                    onReset={onReset}
                  />
                )}
              </>
            )}
          </MediaSection>

          <MediaSection title="Popular TV Programs">
            {popularTv && (
              <>
                <ScrollItem
                  data={popularTv.map(tv => (
                    <MediaItem
                      key={uuid.v4()}
                      id={tv.id}
                      title={tv.title}
                      posterUrl={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                      category={'popularTv'}
                    />
                  ))}
                  alignCenter={false}
                  // onWheel={event => {
                  //   event.nativeEvent.stopImmediatePropagtion();
                  // }}
                />
                {selectedPopularTv && (
                  <ItemDetail
                    title={
                      selectedPopularTv.original_name ||
                      selectedPopularTv.original_title ||
                      selectedPopularTv.title
                    }
                    average={selectedPopularTv.vote_average}
                    release={selectedPopularTv.release_date}
                    overview={selectedPopularTv.overview}
                    bgUrl={selectedPopularTv.backdrop_path}
                    onReset={onReset}
                  />
                )}
              </>
            )}
          </MediaSection>

          <MediaSection title="Popular Movies">
            {popularMovie && (
              <>
                <ScrollItem
                  data={popularMovie.map(movie => (
                    <MediaItem
                      key={uuid.v4()}
                      id={movie.id}
                      title={movie.title}
                      posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      category={'popularMovie'}
                    />
                  ))}
                  alignCenter={false}
                  // onWheel={event => {
                  //   event.nativeEvent.stopImmediatePropagtion();
                  // }}
                />
                {selectedPopularMovie && (
                  <ItemDetail
                    title={
                      selectedPopularMovie.original_name ||
                      selectedPopularMovie.original_title ||
                      selectedPopularMovie.title
                    }
                    average={selectedPopularMovie.vote_average}
                    release={selectedPopularMovie.release_date}
                    overview={selectedPopularMovie.overview}
                    bgUrl={selectedPopularMovie.backdrop_path}
                    onReset={onReset}
                  />
                )}
              </>
            )}
          </MediaSection>
        </div>
      )}
    </>
  );
}

export default Main;
