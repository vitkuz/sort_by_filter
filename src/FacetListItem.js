import React, { useState, useEffect, useRef, useContext } from 'react';

import FacetsContext from './FacetsContext'

function Item(props) {

  const {
    id,
    title
  } = props;

  return (
    <FacetsContext.Consumer>
      {
        ({ getRefById, handleOnClick, handleMouseEnter, handleMouseLeave }) => {

          const { rootRef } = getRefById(id);

          return (
            <div ref={rootRef} onClick={handleOnClick(id)} onMouseEnter={handleMouseEnter(id)} onMouseLeave={handleMouseLeave(id)}> {title} </div>
          )
        }
      }
    </FacetsContext.Consumer>


  );
}

export default Item;
