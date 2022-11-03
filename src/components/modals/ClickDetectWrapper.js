import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const useClickDetect = (ref, callback) => {
  useEffect(() => {
    const handleClickOutsideElement = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideElement);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideElement);
    };
  }, [callback, ref]);
}

const ClickDetectWrapper = (props) => {
  const wrapperRef = useRef(null);
  useClickDetect(wrapperRef, props.callback);

  return <div ref={wrapperRef}>{props.children}</div>;
};

export default ClickDetectWrapper;

ClickDetectWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  callback: PropTypes.func.isRequired,
}
