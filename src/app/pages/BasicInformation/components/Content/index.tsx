import React from "react";

const DynamicContent = ({ componentName, ...props }) => {
    const importedComponentModule = require( `../${componentName}`).default;
    return React.createElement(importedComponentModule); 
    
};

export default DynamicContent