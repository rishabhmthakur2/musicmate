import { useEffect, useState } from "react";
import { Form, Row, Container } from "react-bootstrap";
import BadgeMain from "app/pages/upload/components/Badge";

const AutocompleteDropdown = ({
  options,
  selectedGenres,
  setSelectedGenres,
  title = "Genres",
  placeholder = "e.g. Pop or Country",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const textSuggestions = options.filter((option) =>
      option.toLowerCase().startsWith(value.toLowerCase())
    );
    if (textSuggestions.length === 1 && value === textSuggestions[0]) {
      const genre = textSuggestions[0];
      if (!selectedGenres.includes(genre)) {
        setSelectedGenres([...selectedGenres, genre]);
        setInputValue("");
      }
      setSuggestions([]);
    } else {
      setSuggestions(textSuggestions);
    }
  };

  const removeSelectedGenre = (selectedGenre) => {
    const updatedGenres = selectedGenres.filter(
      (genre) => genre !== selectedGenre
    );
    setSelectedGenres(updatedGenres);
  };

  return (
    <div>
      <Form.Group className="mb-4">
        <Form.Label className="desc-text">
          {title} <span style={{ color: "#3A86FF" }}>(required)</span>
        </Form.Label>
        <Form.Control
          className="p-2 auth-input-wrap mb-2"
          type="text"
          placeholder={placeholder}
          onChange={handleInputChange}
          list="places"
          value={inputValue}
          required
          pattern={suggestions.join("|")}
          autoComplete="off"
        />
        <datalist id="places">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
        <div className="p-0">
          <Row className="mb-2 d-flex">
            <BadgeMain
              options={selectedGenres}
              setOptions={removeSelectedGenre}
            />
          </Row>
        </div>
      </Form.Group>
    </div>
  );
};

export default AutocompleteDropdown;
