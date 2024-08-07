import React, { Component } from 'react'
import css from './ImageGalleryItem.module.css'
import  Modal  from 'components/Modal/Modal';


export class ImageGalleryItem extends Component {

  state = {
    showModal: false,
  };

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.showModal !== this.state.showModal) {
      const gallery = document.querySelector('.js-gallery');
      if (!gallery) return;

      if (this.state.showModal) {
        console.log('Modal is now shown');
        gallery.style.pointerEvents = 'none';
      } else {
        console.log('Modal is now hidden');
        gallery.style.pointerEvents = 'auto';
      }
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;
  
    return (
      
      <li className={css.imageGalleryItem}>
        <img className={css.imageGalleryItemImage} src={webformatURL} alt={tags}  onClick={this.toggleModal}/>
          {showModal && (
          <Modal image={largeImageURL} tags={tags} onClose={this.toggleModal} />
        )}  
      </li>
    )
  }
}
