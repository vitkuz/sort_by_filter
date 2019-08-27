import React, { useState, useEffect, useRef } from 'react';
import { TweenLite, TimelineLite } from 'gsap';
import './App.css';

const FilterName = ({ filter }) => {
  const filterNameElement = useRef(null);

  useEffect(() => {
    console.log(`DID MOUNT`);
    transitionIn();
  },[]);

  const transitionIn = () => {
    TweenLite.set(filterNameElement.current, { opacity: 0 });
    TweenLite.to(filterNameElement.current, 1, { opacity: 1 });
  };

  useEffect(() => {
    console.log(`DID UPDATE`, filter);
    transitionIn();

  },[filter]);



  return (<div className={`filter-name`} ref={filterNameElement}>
    {filter}
  </div>)
}

function App() {
  const dropdownRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const underlineRef = useRef(null);
  const [ isOpen, toggle ] = useState(false);
  const [ filter, setFilter ] = useState(null);
  const [ height, setHeight ] = useState(0);

  const animTime = 0.20;

  const handleMouseEnter = (e) => {
    console.log(`Mouse Enter`);
    toggle(true);
  };

  const handleMouseLeave = (e) => {
    console.log(`Mouse Leave`);
    toggle(false);
  };

  const handleMouseClick = (filter) => (e) => {
    // e.preventDefault();
    console.log(filter);
    setFilter(filter)
  };

  useEffect(() => {
    const { height } = dropdownRef.current.getBoundingClientRect();
    setHeight(height);
  }, []);

  useEffect(() => {

    console.log(`initialHeight`, height);

    if (isOpen) {

      const openRootTM = new TimelineLite({ paused: false });

      const dropDownTL = new TimelineLite();
      const titleWrapperTL = new TimelineLite();
      const underlineTL = new TimelineLite();

      underlineTL.to(underlineRef.current, animTime + 0.25, { opacity: 1, width: 250 });
      openRootTM.add(underlineTL, 0);

      titleWrapperTL.to(titleWrapperRef.current, animTime, { width: 250 } );
      openRootTM.add(titleWrapperTL, 0);

      dropDownTL.to(dropdownRef.current, 0.1, {
        opacity: 1,
        height
      });
      openRootTM.add(dropDownTL, animTime);

      openRootTM.play();

    } else {
      const openRootTM = new TimelineLite({ paused: false });

      const dropDownTL = new TimelineLite();
      const titleWrapperTL = new TimelineLite();
      const underlineTL = new TimelineLite();

      titleWrapperTL.to(titleWrapperRef.current, animTime, { width: 150 } );
      openRootTM.add(titleWrapperTL, 0);

      underlineTL.to(underlineRef.current, animTime + 0.25, { opacity: 0, width: 0 });
      openRootTM.add(underlineTL, 0);

      dropDownTL.to(dropdownRef.current, 0.1, {
        opacity: 0,
        height: 0
      });
      openRootTM.add(dropDownTL, 0);

      openRootTM.play();
    }
  },[isOpen]);

  return (

    <div className={`container`}>
      <div className="sort" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
        <div className={`sort-title`} ref={titleWrapperRef}>
          <div className="sort-title-wrapper">
            <span>Sort by</span> <FilterName filter={filter} />
          </div>
          <div className="sort-title-underline" ref={underlineRef}></div>
        </div>
        <div className={`sort-dropdown ${isOpen ? 'sort-dropdown--open' : ''}`} ref={dropdownRef}>
          <ul>
            <li className={`sort-dropdown__li`}>
              <label htmlFor="price" className={`sort-input-label`}>
                <input type="checkbox" className={`sort-input-checkbox`} id={`price`}/>
                <span className={`toggle`}></span>
                <span onClick={handleMouseClick('price')}>Price</span>
              </label>
            </li>
            <li className={`sort-dropdown__li`}>
              <label htmlFor="date" className={`sort-input-label`}>
                <input type="checkbox" className={`sort-input-checkbox`} id={`date`}/>
                <span className={`toggle`}></span>
                <span onClick={handleMouseClick('date')}>Date</span>
              </label>
            </li>
            <li className={`sort-dropdown__li`}>
              <label htmlFor="new" className={`sort-input-label`}>
                <input type="checkbox" className={`sort-input-checkbox`} id={`new`}/>
                <span className={`toggle`}></span>
                <span onClick={handleMouseClick('new')}>New</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>


  );
}

export default App;
