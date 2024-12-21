import React, { useState, useEffect } from 'react';
import './newCard.css'

const imageArray = [
  {
    image: 'https://picsum.photos/id/1/2500/2500',
    title: 'idrissi',
    time: '2019-10-26'
  },
  {
    image: 'https://picsum.photos/id/1/2500/2500',
    title: 'idrissi',
    time: '2019-10-26'
  },
  {
    image: 'https://picsum.photos/id/1/2500/2500',
    title: 'idrissi 3xirna',
    time: '2019-10-26'
  },
  {
    image: 'https://picsum.photos/id/1/2500/2500',
    title: 'idrissi dyana',
    time: '2019-10-26'
  },
  {
    image: 'https://picsum.photos/id/1/2500/2500',
    title: 'idrissi dyana',
    time: '2019-10-26'
  },
  {
    image: 'https://picsum.photos/id/1/2500/2500',
    title: 'idrissi dyana',
    time: '2019-10-26'
  },
];

const Carousel = ({
    dataArray,
    autoplay = false,
    delay = 10,
    carouselPostWidth = '400px',
    carouselPostHeight = 150,
    carouselPostMargin = 10,
    carouselPostStyle = {},
    children
    }) => {
    const [nowIndex, setNowIndex] = useState(0);

  useEffect(() => {
    let timer;
    if (autoplay) {
      timer = setInterval(() => {
        changeImagePosition(3);
      },  5000);
    }
    return () => clearInterval(timer);
  }, [autoplay, delay, nowIndex]);

  const changeImagePosition = (step) => {
    setNowIndex((prevIndex) => (prevIndex + step + dataArray.length) % dataArray.length);
  };

  const computedLeft = () => {
    const leftSpan = -nowIndex * parseInt(carouselPostWidth);
    return {
      left: carouselPostWidth.toString().match(/[%vw]/)
        ? `calc(${leftSpan}% - ${carouselPostMargin * 2 * nowIndex}px)`
        : `${leftSpan - carouselPostMargin * 2 * nowIndex}px`
    };
  };

  return (
    <div className='newContainer'>
    <div className=" carouselContainer">
      <div className="carouselArea">
        <div style={computedLeft()} className="carouselPosts">
          {dataArray.map((item, index) => (
            <div
              key={index}
              style={{
                width: carouselPostWidth,
                height: carouselPostHeight,
                margin: `0px ${carouselPostMargin}px`,
                ...carouselPostStyle
              }}
              className="carouselPostBox"
            >
              {children(item, index)}
            </div>
          ))}
        </div>
      </div>

      <div onClick={() => changeImagePosition(-3)} className="controlLeft">
        <i className="fa fa-angle-left" />
      </div>
      <div onClick={() => changeImagePosition(3)} className="controlRight">
        <i className="fa fa-angle-right" />
      </div>
    </div>
    </div>
  );
};

const NewCard = () => {
  const renderChildrenView = (item, index) => (
    // <div className="contentBox" key={index}>
    //   <div className="cardBox">
    //     <div
    //       style={{ backgroundImage: `url(${item.image})` }}
    //       className="imageStyle"
    //     />
    //     <div className="fontBox">
    //       <p className="titleStyle">{item.title}</p>
    //       <span>{item.time}</span>
    //     </div>
    //   </div>
    // </div>
    
  <div className="subscribe">
    <div
          className="imageStyle"
        >
        <img className='imageProd'  src={item.image} />
    </div>
    <div className="submit-btn">SUBMIT</div>
 </div>
  );

  return (
    <Carousel
      dataArray={imageArray}
      autoplay={true}
      delay={10}
      carouselPostWidth={'32%'}
      carouselPostHeight={150}
      carouselPostMargin={10}
    >
      {renderChildrenView}
    </Carousel>
  );
};

export default NewCard;
