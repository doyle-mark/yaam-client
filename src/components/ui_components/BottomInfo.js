import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

export default function BottomInfo() {
  const isPending = useSelector(state => state.pending);
  const lastUpdated = useSelector(state => state.lastUpdated);
  const theme = useSelector(state => state.settings.themeColors);

  // const isPending = true;
  const override = css`
    position: absolute;
    top: 95%;
    left: 1%;
    z-index: 10000;
    ${'' /* opacity: 0.5 */}
    color: ${theme.textPrimary};
    font-family: 'Poppins';
  `;
  
  if (isPending) {
    return (
      <div css={override}>
        <ClipLoader size={12} color={theme.textPrimary}/>  Loading
      </div>
    )
  } else {
    return (
      <div css={override}>
        Last Updated at {formatTime(lastUpdated)}
      </div>
    )
  }
}

const formatTime = timestamp => {
  if (timestamp != null) {
    const d = new Date(timestamp);
    return d.toLocaleTimeString("en-US", {
      timeStyle: "medium"
    })
  }
  return '';

}