import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import media from '../libs/MediaQuery';
import uuid from 'uuid';
import Header from '../components/Header';
import MediaDetailPopup from '../components/Media/MediaDetailPopup';

const ResultListArea = styled.section`
  display: flex;
  justify-content: center;
  padding: 72px 30px 0;
  min-height: 100vh;
`;

const ResultList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
`;

const ResultItem = styled.li`
  position: relative;
  align-self: flex-start;
  width: 20%;
  height: auto;
  padding: 1%;
  img {
    width: 100%;
    height: 100%;
  }

  ${media.tablet`
    width: 33%;
  `}

  ${media.mobile`
    width: 100%;
    padding: 5%;
  `}
`;

const Infobox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10%;
  background: rgba(0, 0, 0, 0.8);

  ${media.mobile`
    padding: 10% 10% 15%;
  `}
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 1.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.mobile`
    font-size: 1.8rem;
  `}
`;

const Empty = styled.div`
  font-size: 2rem;
  align-self: center;
`;

const Result = React.memo(({ query, searchList, pageIndex, searchMedia }) => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailInfo, setDetailInfo] = useState(null);

  const addDefaultSrc = useCallback(e => {
    e.target.src = '/images/no-image.png';
  }, []);

  const showDetail = useCallback(list => {
    setDetailVisible(true);
    setDetailInfo(list);
  }, []);

  const hideDetail = useCallback(() => {
    setDetailVisible(false);
    setDetailInfo(null);
  }, []);

  return (
    <>
      <Header />
      <div className="container" style={{ color: '#fff' }}>
        <ResultListArea>
          {searchList && searchList.length > 0 && (
            <ResultList>
              {searchList.map(list => (
                <ResultItem key={uuid.v4()} onClick={() => showDetail(list)}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${list.poster_path}`}
                    alt={list.title}
                    onError={addDefaultSrc}
                  />
                  <Infobox>
                    <Title>
                      {list.title ||
                        list.original_title ||
                        list.original_name ||
                        list.name}
                    </Title>
                  </Infobox>
                </ResultItem>
              ))}
            </ResultList>
          )}
          {searchList && searchList.length === 0 && (
            <Empty>해당하는 검색결과를 찾지 못했습니다.</Empty>
          )}
        </ResultListArea>
        {detailInfo && (
          <MediaDetailPopup
            visible={detailVisible}
            hide={hideDetail}
            info={detailInfo}
          />
        )}
      </div>
    </>
  );
});

export default Result;
