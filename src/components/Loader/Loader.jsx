import React, { Component } from 'react'
import { TailSpin } from 'react-loader-spinner'
import css from './Loader.module.css'

export class Loader extends Component {
  render() {
    return (
      <div className={css.LoaderContainer}>
      <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
  }
}
