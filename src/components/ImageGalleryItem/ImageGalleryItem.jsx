import css from './ImageGalleryItem.module.css'
import  { Modal } from 'components/Modal/Modal';
import { useState, useEffect, useRef } from 'react';

export const ImageGalleryItem = ( {webformatURL, largeImageURL, tags} ) => {
  // state = {
  //   showModal: false,
  // };
  const [showModal, setModal] = useState(false);
  const prevShowModalRef = useRef();

  useEffect(() => {
    prevShowModalRef.current = showModal;
  }, [showModal]);

  useEffect(() => {
    const prevShowModal = prevShowModalRef.current;
    const gallery = document.querySelector('.js-gallery');

    if (!gallery) return;

    if (prevShowModal !== showModal) {
      if (showModal) {
        console.log('Modal is now shown');
        gallery.style.pointerEvents = 'none';
      } else {
        console.log('Modal is now hidden');
        gallery.style.pointerEvents = 'auto';
      }
    return () => {
      prevShowModalRef.current = showModal;
      }
    }
  }, [showModal]);
  
  // componentDidUpdate(_prevProps, prevState) {
  //   if (prevState.showModal !== this.state.showModal) {
  //     const gallery = document.querySelector('.js-gallery');
  //     if (!gallery) return;

  //     if (this.state.showModal) {
  //       console.log('Modal is now shown');
  //       gallery.style.pointerEvents = 'none';
  //     } else {
  //       console.log('Modal is now hidden');
  //       gallery.style.pointerEvents = 'auto';
  //     }
  //   }
  // }

  const toggleModal = () => {
    setModal(prevModal => !prevModal);
    // this.setState(prevState => ({
    //   showModal: !prevState.showModal,
    // }));
  };

  // render() {

    return (
      
      <li className={css.imageGalleryItem}>
        <img className={css.imageGalleryItemImage} src={webformatURL} alt={tags}  onClick={toggleModal}/>
          {showModal && (
          <Modal image={largeImageURL} tags={tags} onClose={toggleModal} />
        )}  
      </li>
    )
  }

  export default ImageGalleryItem;