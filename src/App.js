import React, { useState, useEffect, useRef, useContext } from 'react';
import { TweenLite, TimelineLite } from 'gsap';
import './App.css';

import FacetsList from './FacetsList'

import FacetsContext from './FacetsContext'

function App() {
  const wrapperRef = useRef();
  const [isLoading, setLoading] = useState(true);
  let [collection, setRefsMap] = useState({ items: [], refsMap: [] });

  const createRefsMap = (response) => {
    const refsMap = response.reduce((acc, next) => {
      return {
        ...acc,
        [next.id]: {
          rootRef: React.createRef()
        }
      }
    }, {});

    setRefsMap({ items: response, refsMap });
    setLoading(false);
  };

  const getRefById = id => {
    return collection.refsMap[id];
  };

  const handleOnClick = (id) => (e) => {
    console.log(`handleOnClick`, getRefById(id));
  };

  const fetchItems = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(response => {

        createRefsMap(response);
      })
  };

  const handleMouseEnter = (id) => (e) => {
    console.log(`handleMouseEnter`, getRefById(id));
  };

  const handleMouseLeave = (id) => (e) => {
    console.log(`handleMouseLeave`, getRefById(id));
  };

  useEffect(() => {

    fetchItems();

    const interval = setInterval(() => {
      console.log(`interval running`)
    },1000);

    return () => {
      clearInterval(interval);
    }

  }, []);



  return (

    <div className={`container`}>
      <FacetsContext.Provider value={{
        collection,
        handleOnClick,
        getRefById,
        handleMouseEnter,
        handleMouseLeave
      }}>
        <div ref={wrapperRef}>
          {isLoading ? <div>Loading</div> : <FacetsList />}
        </div>
      </FacetsContext.Provider>
    </div>


  );
}

export default App;
