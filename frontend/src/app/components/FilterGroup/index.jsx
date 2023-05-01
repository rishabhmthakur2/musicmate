import React, { useState } from "react";
import "./filterGroup.scss";

const FilteGroup = ({ groupTitle, options, setOptions, setState }) => {
  function handleFilterChange(event) {
    const { value } = event.target;
    setOptions(options, setState, value);
  }
  return (
    <>
      <div className="filter-title">{groupTitle}</div>
      <div className="filter-container">
        <div className="filter-box">
          <div className="filter-options">
            {options.map((option, i) => {
              return (
                <>
                  <label className="filter-label desc-text">
                    {option.name}
                    <input
                      id={option.name}
                      type={option.type}
                      name={option.name}
                      value={option.name}
                      className="checkbox-label"
                      checked={option.checked}
                      onChange={handleFilterChange}
                    />
                  </label>
                  {i !== options.length - 1 && (
                    <hr
                      style={{
                        borderWidth: "2px",
                        color: "#EAE2E2",
                        margin: "0",
                        padding: "0px",
                      }}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilteGroup;
