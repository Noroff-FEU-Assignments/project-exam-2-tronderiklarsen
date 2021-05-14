import styles from "../../styles/Search.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../../constants/api";
import Image from "next/image";

export default function Search() {
  const router = useRouter();

  const [places, setPlaces] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const response = await fetch(`${API_URL}/places`);
      const result = await response.json();
      setPlaces(result);
    };
    loadPlaces();
  }, []);

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };

  const OnChangeHandler = (text) => {
    let matches = [];

    if (text.length > 0) {
      matches = places.filter((place) => {
        const regex = new RegExp(`${text}`, "i");
        return place.name.match(regex);
      });
    }
    setSuggestions(matches);
    setText(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/results?term=${text}`);
    setPlaces("");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => OnChangeHandler(e.target.value)}
          value={text}
          onBlur={() => {
              setTimeout(() => {
                  setSuggestions([])
              }, 100)
          }}
          placeholder="Bergen, apartment, hotel"
        ></input>
        <input
          type="submit"
          className={styles.searchbtn}
          value="Search"
        ></input>
      </form>
      {suggestions &&
        suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={styles.suggestion}
            onClick={(e) => onSuggestHandler(suggestion.name)}
          >
            <div className={styles.preview}>
              <Image
                src={suggestion.image.formats.thumbnail.url}
                width={100}
                height={70}
              />
              <div className={styles.info}>
                <div>
                  <h3>{suggestion.name}</h3>
                </div>
                <div>
                  <p>{suggestion.price} kr</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
