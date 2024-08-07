import { Component } from 'react'
import { getAPI } from 'pixabay-api';
import { SearchBar } from './components/SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { LoadMore } from './components/LoadMore/LoadMore';
import css from './components/App/styles.css'
import { Loader } from 'components/Loader/Loader';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    isLoading: false,
    isError: false,
    isEnd: false,
  };

  componentDidUpdate = async (_prevProps, prevState) => {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      await this.fetchImages(search, page);
    } 
    if (prevState.images !== this.state.images) {
      this.initializeLightbox();
    }
  };

  fetchImages = async (search, page) => {
    try {
      this.setState({ isLoading: true });

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
        this.setState({ isEnd: true });
        toast("We're sorry, but you've reached the end of search results.", {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
    } catch {
      this.setState({ isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  initializeLightbox = () => {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
    this.lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { search } = this.state;
    const newSearch = e.target.search.value.trim().toLowerCase();

    if (newSearch !== search) {
      this.setState({ search: newSearch, page: 1, images: [] });
    }
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length >= 1 && <ImageGallery photos={images} />}
        {images.length >= 1 && !isEnd && <LoadMore onClick={this.handleClick} />}
        
        {isError &&
          toast.error(' something went wrong! Reload this page!')}
        {isLoading && <Loader/>}
        <Toaster position="top-left" reverseOrder={false} />
      </div>
    );
  }
}