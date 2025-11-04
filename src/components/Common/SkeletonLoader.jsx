import React from "react";

const SkeletonLoader = ({
  count = 1,
  height = "1rem",
  width = "100%",
  className = "",
}) => {
  const skeletons = Array.from({ length: count });

  const style = {
    height,
    width,
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    display: "inline-block",
    lineHeight: 1,
    animation: "skeleton-loading 1.2s infinite ease-in-out",
    margin: "0.1rem 0",
  };

  return (
    <>
      <style>{`
        @keyframes skeleton-loading {
          0% { background-color: #e0e0e0; }
          50% { background-color: #f5f5f5; }
          100% { background-color: #e0e0e0; }
        }
      `}</style>
      {skeletons.map((_, index) => (
        <span
          key={index}
          style={style}
          className={`skeleton-loader ${className}`}
        >
          &zwnj;
        </span>
      ))}
    </>
  );
};

export default SkeletonLoader;
