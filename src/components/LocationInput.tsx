import { useState, useEffect, useRef } from "react";
import styles from "./styles/locationInput.module.css";
import { PlaneIcon } from "@/icons";
import { autoSuggestSearch } from "@/services/autoSuggestSearch";

interface LocationInputProps {
    placeholder: string;
    name: string;
    iconAction: "takeoff" | "landing";
    onChange: (name: string, value: string) => void;
    value: string;
}

interface LocationSuggestion {
    place_id: string;
    place_name: string;
    city_name: string;
    country_id: string;
    geo_id: string;
    geo_container_id: string;
    distance: string | null;
}

export default function LocationInput({
    placeholder,
    name,
    iconAction,
    onChange,
    value,
}: LocationInputProps) {
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState<number | null>(
        null
    );
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    // Handle input change with debounce
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set new timer
        debounceTimer.current = setTimeout(() => {
            if (newValue.trim().length > 1) {
                // Call the parent's onChange with the debounced value
                onChange(name, newValue);
                // Show suggestions dropdown
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 500); // 500ms debounce
    };

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion: LocationSuggestion) => {
        setInputValue(`${suggestion.place_name} (${suggestion.city_name ? suggestion.city_name : suggestion.country_id})`);
        onChange(name, `${suggestion.place_name} (${suggestion.city_name ? suggestion.city_name : suggestion.country_id})`);
        setShowSuggestions(false);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveSuggestion((prev) =>
                    prev === null
                        ? 0
                        : Math.min(prev + 1, suggestions.length - 1)
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveSuggestion((prev) =>
                    prev === null
                        ? suggestions.length - 1
                        : Math.max(prev - 1, 0)
                );
                break;
            case "Enter":
                e.preventDefault();
                if (
                    activeSuggestion !== null &&
                    suggestions[activeSuggestion]
                ) {
                    handleSuggestionClick(suggestions[activeSuggestion]);
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                break;
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Update input value when parent value changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // Replace the fetchSuggestions function with this:
    const fetchSuggestions = async (query: string) => {
        try {
            const response = await autoSuggestSearch({ text: query });

            if (response && Array.isArray(response)) {
                const formattedSuggestions = response.map((item) => {
                    if (item?.AirportInformation) {
                      return {
                        place_id: item.AirportInformation.PlaceId,
                        place_name: item.AirportInformation.PlaceName,
                        city_name: item.AirportInformation.CityName,
                        country_id: item.AirportInformation.CountryId,
                        geo_id: item.AirportInformation.GeoId,
                        geo_container_id: item.AirportInformation.GeoContainerId,
                        distance: `${Math.round(item.AirportInformation.Distance.Value)} ${(item.AirportInformation.Distance.UnitCode).replace('kilometre', 'km').replace('metre', 'm')} from ${item.CityName}`
                      }
                    }
                    return {
                        place_id: item.PlaceId,
                        place_name: item.PlaceName,
                        city_name: item.CityName,
                        country_id: item.CountryId,
                        geo_id: item.GeoId,
                        geo_container_id: item.GeoContainerId,
                        distance: null
                    };
                });

                setSuggestions(formattedSuggestions);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        }
    };

    // Call fetchSuggestions when input value changes
    useEffect(() => {
        if (inputValue.trim().length > 1) {
            fetchSuggestions(inputValue);
        } else {
            setSuggestions([]);
        }
    }, [inputValue]);

    return (
        <div className={styles.input_container}>
            <div className={styles.icon_container}>
                <PlaneIcon action={iconAction} />
            </div>
            <input
                ref={inputRef}
                className={styles.input_field}
                placeholder={placeholder}
                type="text"
                name={name}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className={styles.suggestions_dropdown}
                >
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={suggestion.place_id}
                            className={`${styles.suggestion_item} ${
                                index === activeSuggestion
                                    ? styles.suggestion_item_active
                                    : ""
                            }`}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <div>
                                <span className={styles.suggestion_city}>
                                    {suggestion.place_name}
                                </span>
                                <span className={styles.suggestion_country}>
                                    ({suggestion.distance ? suggestion.distance : suggestion.city_name} |{" "}
                                    {suggestion.country_id})
                                </span>
                            </div>
                            {/* {suggestion.airport && (
                <div className={styles.suggestion_airport}>
                  {suggestion.airport}
                </div>
              )} */}
                        </div>
                    ))}
                </div>
            )}
            {/* {showSuggestions && suggestions.length === 0 && (
        <div className={styles.no_suggestions}>
          No locations found
        </div>
      )} */}
        </div>
    );
}
