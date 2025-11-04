import React, { useEffect, useState } from "react";
import { Chrome } from "@uiw/react-color";

function ColorPicker({ color, onChange }) {
  const [hex, setHex] = useState("#0088ff");

  useEffect(() => {
    // Validate and set the initial color
    if (color && isValidColor(color)) {
      setHex(color);
    }
  }, [color]);

  const handleChange = (newColor) => {
    const newHex = typeof newColor === "object" ? newColor.hex : newColor;
    setHex(newHex);
    if (onChange) {
      onChange(newHex);
    }
  };

  // Simple color validation
  const isValidColor = (colorStr) => {
    return /^#([0-9A-F]{3}){1,2}$/i.test(colorStr);
  };

  return (
    <div style={{ padding: 20 }}>
      <Chrome color={hex} onChange={(colorObj) => handleChange(colorObj)} />
    </div>
  );
}

export default ColorPicker;
