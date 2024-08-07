import React, { Component } from 'react'
import css from './Modal.module.css'

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
      }
    
      componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
      }
    
      handleKeyDown = e => {
        console.log(e);
        if (e.code === 'Escape') {
          this.props.onClose();
        }
      };
    
      render() {
        const { image, tags } = this.props;
        return (
          <div className={css.overlay}>
            <div className={css.modal}>
              <img src={image} alt={tags} />
            </div>
          </div>
        )
  }
}
export default Modal;