import React, { useState, useLayoutEffect } from 'react';

type Props = {
  src: string,
  alt: string
  styles: string
};

const ImageLoader = ({ src, alt, styles }:Props) => {
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsReady(true);
    };

    return () => {
      img.onload = null; // Clean up the event listener
    };
  }, [src]); // Re-run the effect if the image source changes

  return (
      <img
          src={src}
          alt={alt}
          className={`${styles} transition-opacity duration-500 ease-in opacity-0 ${isReady ? 'opacity-100' : ''}`}
      />
  );
};

export default ImageLoader;
