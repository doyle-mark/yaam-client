import React from 'react'
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export default function LoadingModal() {
  const isLoading = useSelector(state => state.initalLoading);
  // const isLoading = true
  console.log(isLoading);
  

  const modalContainer = css`
    width: 100vw;
    height 100vh;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 30000;
    display: grid;
  `;

  console.log(modalContainer);
  

  const override = css`
    color: white;
  `;

  if (isLoading) {
    return (
      <div css={modalContainer}>
            <div css={css`margin: auto;`}>
              <PacmanLoader css={override} color="yellow"/>
            </div>
      </div>
    )
  } else {
    return null;
  }
  
}
