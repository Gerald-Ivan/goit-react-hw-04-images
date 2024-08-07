import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react'
import css from './ImageGallery.module.css'

export class ImageGallery extends Component {
  render() {
    const { photos } = this.props;
    return (
      <ul className={css.imageGallery}>
      {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
    )
  }
}
