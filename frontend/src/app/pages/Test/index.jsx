import FilteGroup from "app/components/FilterGroup";
import { useState } from "react";

const TestPage = () => {
  const [sortOptions, setSortOptions] = useState([
    { name: "Distance", checked: false, type: "radio" },
    { name: "Most recent", checked: false, type: "radio" },
  ]);

  const [employmentOptions, setEmploymentOptions] = useState([
    { name: "Full Time", checked: false, type: "checkbox" },
    { name: "Part Time", checked: false, type: "checkbox" },
    { name: "One Time", checked: false, type: "checkbox" },
  ]);

  const handleRadioChange = (stateVar, setStateVar, newValue) => {
    const newArray = [...stateVar];
    newArray.map((option) => {
      if (option.name == newValue) {
        option.checked = true;
      } else {
        option.checked = false;
      }
      return option;
    });
    setStateVar([...newArray]);
  };

  const handleCheckBoxChange = (stateVar, setStateVar, newValue) => {
    const newArray = [...stateVar];
    newArray.map((option) => {
      if (option.name == newValue) {
        option.checked = !option.checked;
      }
      return option;
    });
    setStateVar([...newArray]);
  };

  return (
    <>
      <FilteGroup
        groupTitle={"Sort by"}
        options={sortOptions}
        setOptions={handleRadioChange}
        setState={setSortOptions}
      />
      <FilteGroup
        groupTitle={"Employment Type"}
        options={employmentOptions}
        setOptions={handleCheckBoxChange}
        setState={setEmploymentOptions}
      />
    </>
  );
};

export default TestPage;
