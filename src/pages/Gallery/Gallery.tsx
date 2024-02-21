import styles from './Gallery.module.css';
import { memo } from 'react';
import { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import axios from 'axios';
import Banner from '../../components/Banner/Banner';
import ReactPaginate from 'react-paginate';
import Wrapper from '../../components/Wrapper/Wrapper';
import GalleryItem from '../../components/GalleryItem/GalleryItem';

type GalleryPropsType = {
  src: {
    medium: string;
  };
  photographer: string;
  photographer_url: string;
};

const Gallery = () => {
  const [images, setImages] = useState<GalleryPropsType[]>([]);

  const [pageCount, setPageCount] = useState(1);

  const [currentPage, setCurrentPage] = useState(0);

  const fetchImages = (selectedPage = 0) => {
    axios
      .get('/images/curated', {
        params: {
          per_page: 20,
          page: selectedPage + 1,
        },
      })
      .then((response) => {
        setImages(response.data.photos);

        setPageCount(Math.ceil(response.data.total_results / 20));
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
    fetchImages(selectedPage.selected);
  };

  return (
    <>
      <Banner />
      <Wrapper>
        <Element name="scroll_section">
          <div className={styles.items}>
            {images &&
              images.map((image, index) => (
                <GalleryItem
                  key={'image item -' + image + index}
                  src={image.src.medium}
                  title={image.photographer}
                  subTitle="pexels.com"
                />
              ))}
          </div>
        </Element>
        <ReactPaginate
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={20}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'custom_active'}
          initialPage={currentPage}
          className={styles.custom_pagination}
          key={currentPage}
        />
      </Wrapper>
    </>
  );
};

export default memo(Gallery);
