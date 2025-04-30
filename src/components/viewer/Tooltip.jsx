import React, { useRef, useState, useEffect } from "react";

const baseArrowStyle = {
  position: "absolute",
  width: "0",
  height: "0",
};

const getArrowStyle = (position) => {
  switch (position) {
    case "top":
      return {
        ...baseArrowStyle,
        bottom: "-8px",
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderTop: "8px solid #333",
      };
    case "bottom":
      return {
        ...baseArrowStyle,
        top: "-8px",
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: "8px solid #333",
      };
    case "left":
      return {
        ...baseArrowStyle,
        right: "-8px",
        top: "50%",
        transform: "translateY(-50%)",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderLeft: "8px solid #333",
      };
    case "right":
      return {
        ...baseArrowStyle,
        left: "-8px",
        top: "50%",
        transform: "translateY(-50%)",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderRight: "8px solid #333",
      };
    default:
      return {};
  }
};

const Tooltip = ({ children, text, position = "top" }) => {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (visible && tooltipRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      const padding = 8;

      let top = 0,
        left = 0;

      switch (position) {
        case "top":
          top = containerRect.top - tooltipEl.offsetHeight - padding;
          left = containerRect.left + containerRect.width / 2 - tooltipEl.offsetWidth / 2;
          break;
        case "bottom":
          top = containerRect.bottom + padding;
          left = containerRect.left + containerRect.width / 2 - tooltipEl.offsetWidth / 2;
          break;
        case "left":
          top = containerRect.top + containerRect.height / 2 - tooltipEl.offsetHeight / 2;
          left = containerRect.left - tooltipEl.offsetWidth - padding;
          break;
        case "right":
          top = containerRect.top + containerRect.height / 2 - tooltipEl.offsetHeight / 2;
          left = containerRect.right + padding;
          break;
        default:
          break;
      }

      setTooltipPos({ top, left });
    }
  }, [visible, position]);

  return (
    <div
      ref={containerRef}
      style={{ display: "inline-block", position: "relative" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`,
            border: "1px solid #fff",
            backgroundColor: "#333",
            color: "#fff",
            padding: "6px 8px",
            borderRadius: "4px",
            fontSize: "13px",
            whiteSpace: "nowrap",
            zIndex: 1000,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          {text}
          <div style={getArrowStyle(position)} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
