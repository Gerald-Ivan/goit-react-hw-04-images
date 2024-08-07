import css from './Modal.module.css'
import { useEffect } from 'react'

export const Modal = ({ image, tags, onClose }) => {

  useEffect(() => {
    
  const handleKeyDown = e => {
    console.log(e);
    if (e.code === 'Escape') {
    onClose();
    }
  };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose])
  
    // componentDidMount() {
    //     window.addEventListener('keydown', this.handleKeyDown);
    //   }
  
      // componentWillUnmount() {
      //   window.removeEventListener('keydown', this.handleKeyDown);
      // }
    
   
    
        return (
          <div className={css.overlay}>
            <div className={css.modal}>
              <img src={image} alt={tags} />
            </div>
          </div>
        )
  }

