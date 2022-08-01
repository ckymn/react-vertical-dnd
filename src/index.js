import ReactDOM from "react-dom";
import React, { useState, useEffect, useRef, useMemo } from "react";

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);
  const rect = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll, true);
    return () => window.removeEventListener("scroll", listenToScroll, true);
  }, []);

  const listenToScroll = () => {
    if (!rect.current) return;
    const { top, bottom } = rect.current.getBoundingClientRect();
    // let heightToHideFrom = 200; // eger burda sabit deger verirsek calisiyor.
    // TODO: burda map yaparsak isVisible nasil kullanicaz ?
    // butun data'lara ayri ref() mi acmak gerek?

    setHeight(bottom);
    if (bottom > 0) {
      console.log("true");
      setIsVisible(true);
    } else if (bottom < 0) {
      console.log("false");
      setIsVisible(false);
      console.log(bottom);
    }
  };

  return (
    <div id="container">
      <div id="height">
        <b>
          height: {height} - {isVisible ? "show" : "hide"}
        </b>
      </div>
      {isVisible && (
        <>
          <div id="hide" ref={rect}>
            Top div {isVisible && "| in viewport"}
          </div>
          <div id="hide" ref={rect}>
            Top div {isVisible && "| in viewport"}
          </div>
        </>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
