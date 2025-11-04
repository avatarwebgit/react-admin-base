import React, { useState } from "react";
import { Input } from "reactstrap";

const TagInput = ({ tags = [], setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const tagContainerStyle = {
    border: "1px solid #ced4da",
    borderRadius: ".25rem",
    padding: "5px",
    minHeight: "38px",
    cursor: "text",
  };
  const tagStyle = {
    display: "inline-flex",
    alignItems: "center",
    background: "#e0e0e0",
    color: "#333",
    borderRadius: "4px",
    padding: "2px 8px",
    marginRight: "5px",
    marginBottom: "5px",
  };
  const removeBtnStyle = {
    marginLeft: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div
      style={tagContainerStyle}
      onClick={() => document.getElementById("tag-input-field").focus()}
    >
      {tags.map((tag) => (
        <span key={tag} style={tagStyle}>
          {tag}
          <span style={removeBtnStyle} onClick={() => removeTag(tag)}>
            ×
          </span>
        </span>
      ))}
      <Input
        id="tag-input-field"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="افزودن کلمه کلیدی..."
        style={{
          border: "none",
          boxShadow: "none",
          display: "inline",
          width: "auto",
          minWidth: "150px",
          padding: "0",
          background: "transparent",
        }}
      />
    </div>
  );
};

export default TagInput;
