import React from 'react'
import css from './LoadMore.module.css'

export const LoadMore = ({ onClick }) => {
  return (
    <div className={css.buttonWrap}>
      <button className={css.button} onClick={onClick}>
        Load More
      </button>
    </div>
  )
}
