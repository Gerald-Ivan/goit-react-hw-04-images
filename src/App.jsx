import { useState, useEffect } from 'react'
import { getAPI } from 'pixabay-api';
import { SearchBar } from './components/SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { LoadMore } from './components/LoadMore/LoadMore';
import css from './components/App/styles.css'
import { Loader } from 'components/Loader/Loader';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

export const App = () => {
  // state = {
  //   search: '',
  //   page: 1,
  //   images: [],
  //   isLoading: false,
  //   isError: false,
  //   isEnd: false,
  // };
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  // componentDidUpdate = async (_prevProps, prevState) => {
  //   // const { search, page } = this.state;
    
    // if (prevState.search !== search || prevState.page !== page) {
    //   await fetchImages(search, page);
  //   } 
  //   if (prevState.images !== this.state.images) {
  //     initializeLightbox();
  //   }
  // };
  useEffect(() => {
    if(search === '') return;
    (async () => {
        await fetchImages(search, page);
    })();
    
  }, [search, page]);
  

  const fetchImages = async (search, page) => {
    try {
      setIsLoading(true);
      // this.setState({ isLoading: true });

      const fetchedImages = await getAPI(search, page);

      const { hits, totalHits } = fetchedImages;

      console.log(hits, totalHits);

      if (hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} images!`);
      }

      if (page * 12 >= totalHits) {
      setIsEnd(true);
        // this.setState({ isEnd: true });
        toast("We're sorry, but you've reached the end of search results.", {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }

      setImages(prevImages => [...prevImages, ...hits]);
      // this.setState(prevState => ({
      //   images: [...prevState.images, ...hits],
      // }));
    } catch {
      setIsError(true);
      // this.setState({ isError: true });
    } finally {
      setIsLoading(false);
      // this.setState({ isLoading: false });
    }
  };

  // const initializeLightbox = () => {
  //   if (this.lightbox) {
  //     this.lightbox.destroy();
  //   }
  //   this.lightbox = new SimpleLightbox('.gallery a', {
  //     captionsData: 'alt',
  //     captionDelay: 250,
  //   });
  // };

  const handleSubmit = e => {
    e.preventDefault();

    // const { search } = this.state;
    const newSearch = e.target.search.value.trim().toLowerCase();

    if (newSearch !== search) {
      setSearch(newSearch);
      setPage(1);
      setImages([]);
      // this.setState({ search: newSearch, page: 1, images: [] });
    }
  };

  const handleClick = () => {
    setPage((prevPage) => prevPage + 1);
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // render() {
    // const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmit={handleSubmit} />
        {images.length >= 1 && <ImageGallery photos={images} />}
        {images.length >= 1 && !isEnd && <LoadMore onClick={handleClick} />}
        
        {isError &&
          toast.error(' something went wrong! Reload this page!')}
        {isLoading && <Loader/>}
        <Toaster position="top-left" reverseOrder={false} />
      </div>
    );
  }
// }