import React from 'react';
import Slider from 'react-slick';
import uuid from 'uuid';
import MediaItem from './MediaItem';

const settings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  variableWidth: true,
  useTransform: false,
  draggable: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        draggable: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        draggable: true,
      },
    },
  ],
};

const MediaSlider = React.memo(({ mediaItems, category }) => {
  return (
    <Slider {...settings}>
      {mediaItems &&
        mediaItems.map(media => (
          <MediaItem
            key={uuid.v4()}
            id={media.id}
            title={media.title}
            posterUrl={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
            category={category}
          />
        ))}
    </Slider>
  );
});

export default MediaSlider;
