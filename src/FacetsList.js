import React, { useState, useEffect, useRef, useContext } from 'react';
import FacetItemList from './FacetListItem';
import FacetsContext from './FacetsContext'

function List() {

  return (

    <FacetsContext.Consumer>
      {
        ({collection, getRefById, handleOnClick}) => {

          return (
            <div>{
              collection.items.map(item => {
                return <FacetItemList key={item.id} {...item}/>
              })
            }</div>
          )

        }
      }
    </FacetsContext.Consumer>


  );
}

export default List;
