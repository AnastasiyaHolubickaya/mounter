import { useState, useEffect } from 'react';
import { memo } from 'react';
import { Element } from 'react-scroll';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
//*Styles
import styles from './Gallery.module.css';
//*Components
import Banner from '../../components/Banner/Banner';
import Wrapper from '../../components/Wrapper/Wrapper';
import GalleryItem from '../../components/GalleryItem/GalleryItem';

//* Define the prop types for the Gallery component
type GalleryPropsType = {
  src: {
    medium: string;
  };
  photographer: string;
  photographer_url: string;
};

const Gallery = () => {
  //* State variables for managing images, page count, and current page
  const [images, setImages] = useState<GalleryPropsType[]>([]);

  const [pageCount, setPageCount] = useState(1);

  const [currentPage, setCurrentPage] = useState(0);

  //* Function to fetch images from the Pexels API
  const fetchImages = (selectedPage = 0) => {
    axios
      .get('https://api.pexels.com/v1/curated', {
        headers: {
          Authorization:
            '8PSieWtK09vlW7mlJ8qJVS3W3CpKYLMlNCOvKD6Zz4UKfptt8sxHWF2G',
        },
        params: {
          per_page: 20,
          page: selectedPage + 1,
        },
      })
      .then((response) => {
        //* Update state with the fetched images and calculate the page count
        setImages(response.data.photos);
        setPageCount(Math.ceil(response.data.total_results / 20));
      })
      .catch((error) => {
        //* Log an error if the image fetching fails
        console.error('Error fetching images:', error);
      });
  };

  //* Fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  //* Event handler for handling page clicks
  const handlePageClick = (selectedPage: { selected: number }) => {
    //* Update current page and fetch images for the selected page
    setCurrentPage(selectedPage.selected);
    fetchImages(selectedPage.selected);
  };

  return (
    <>
      <Banner />
      <Wrapper>
        <Element name="scroll_section">
          <div className={styles.items_flex}>
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
