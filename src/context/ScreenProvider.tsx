import React, { useContext, useEffect, useState, useCallback } from "react";

interface Screen {
  screenWidth: number;
  screenHeight: number;
  windowYOffset: number;
  isTop: boolean;
}

const ScreenContext = React.createContext<Screen | null>(null);

const getWindowWidth = () => {
  const { innerWidth: width } = window;
  return width;
};

const getWindowHeight = () => {
  const { innerHeight: height } = window;
  return height;
};

export function useScreen() {
  return useContext(ScreenContext);
}

export function ScreenProvider({ children }: { children: JSX.Element }) {
  const initialScreenState = {
    width: getWindowWidth(),
    height: getWindowHeight(),
  };
  const [screenDimensions, setScreenDimensions] = useState(initialScreenState);
  const [windowYOffset, setWindowYOffset] = useState(window.pageYOffset);
  const [isTop, setIsTop] = useState(true);

  const handleResize = useCallback(async () => {
    await sleep(250);

    const screenDimensions_ = { ...screenDimensions };
    screenDimensions_["height"] = getWindowHeight();
    screenDimensions_["width"] = getWindowWidth();

    setScreenDimensions(screenDimensions_);
  }, [screenDimensions]);

  const handleScroll = useCallback(() => {
    setWindowYOffset(window.pageYOffset);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (document) document.body.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setStyleDimensions();
  }, [screenDimensions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    windowYOffset === 0 ? setIsTop(true) : setIsTop(false);
  }, [windowYOffset]);

  const setStyleDimensions = () => {
    document.documentElement.style.setProperty(
      "--vw",
      `${screenDimensions.width}px`
    );
    document.documentElement.style.setProperty(
      "--vh",
      `${screenDimensions.height}px`
    );
  };

  const value = {
    screenWidth: screenDimensions.width,
    screenHeight: screenDimensions.height,
    windowYOffset,
    isTop,
  };

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
}

async function sleep(msec: number) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}
