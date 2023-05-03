import React, { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const Dropdown = ({ options, selectedOption, setSelectedOption }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsExpanded(false);
  };

  return (
    <div
      style={{
        position: "relative",
        background: "#FFFFFF",
        border: "1px solid #CCCCCC",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        marginBottom: "4px",
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div style={{ color: "#373737", cursor: "pointer" }}>
        {selectedOption || "Select an option"}
        {isExpanded ? (
          <FaAngleUp
            style={{
              position: "absolute",
              right: "15px",
              top: "15px",
              color: "#3A86FF",
              height: "12px",
              width: "12px",
              marginLeft: "150px",
            }}
          />
        ) : (
          <FaAngleDown
            style={{
              position: "absolute",
              right: "15px",
              top: "15px",
              color: "#3A86FF",
              height: "12px",
              width: "12px",
              marginLeft: "150px",
            }}
          />
        )}
      </div>
      {isExpanded && (
        <div
          style={{
            position: "absolute",
            top: "38px",
            left: "0",
            width: "100%",
            background: "#FFFFFF",
            border: "1px solid #CCCCCC",
            borderTop: "none",
            zIndex: "1",
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor:
                  selectedOption === option ? "#3A86FF" : "#FFFFFF",
                color: selectedOption === option ? "#FFFFFF" : "#000000",
              }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
