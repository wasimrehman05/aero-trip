import { useState, useEffect, useRef } from "react";
import styles from "./styles/locationInput.module.css";
import { PlaneIcon } from "@/icons";
import { autoSuggestSearch } from "@/services/autoSuggestSearch";

export interface LocationSuggestion {
    place_id: string;
    place_name: string;
    city_name: string;
    country_id: string;
    geo_id: string;
    geo_container_id: string;
    distance: string | null;
    location: string | null;
}

interface LocationInputProps {
    placeholder: string;
    name: string;
    iconAction: "takeoff" | "landing";
    onChange: (name: string, value: LocationSuggestion) => void;
    value: string;
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
    const [activeSuggestion, setActiveSuggestion] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle input change with debounce
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (newValue === inputValue) return;
        setInputValue(newValue);
        if (newValue.trim().length < 2) return;

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        setIsLoading(true);
        // Set new timer
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(newValue);
            setShowSuggestions(true);
        }, 2000);

    };

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion: LocationSuggestion) => {
        let location = `${suggestion.place_name} (${suggestion.city_name ? suggestion.city_name === suggestion.place_name ?  suggestion.country_id : suggestion.city_name : suggestion.country_id})`;
        suggestion.location = location;
        setInputValue(location);
        onChange(name, suggestion);
        setShowSuggestions(false);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveSuggestion((prev) => prev === null ? 0 : Math.min(prev + 1, suggestions.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveSuggestion((prev) => prev === null ? suggestions.length - 1 : Math.max(prev - 1, 0));
                break;
            case "Enter":
                e.preventDefault();
                if (activeSuggestion !== null && suggestions[activeSuggestion]) {
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


    const fetchSuggestions = async (query: string) => {
        try {
            const response = await autoSuggestSearch({
                text: query,
                isDestination: name === "to",
            });

            if (response && Array.isArray(response)) {
                const formattedSuggestions = response.map((item) => {
                    if (item?.AirportInformation) {
                        return {
                            place_id: item.AirportInformation.PlaceId.trim(),
                            place_name: item.AirportInformation.PlaceName.trim(),
                            city_name: item.AirportInformation.CityName.trim(),
                            country_id: item.AirportInformation.CountryId.trim(),
                            geo_id: item.AirportInformation.GeoId.trim(),
                            geo_container_id: item.AirportInformation.GeoContainerId.trim(),
                            distance: `${Math.round(item.AirportInformation.Distance.Value)} ${item.AirportInformation.Distance.UnitCode.replace("kilometre", "km").replace("metre", "m")} from ${item.CityName}`,
                            location: null,
                        };
                    }
                    return {
                        place_id: item.PlaceId.trim(),
                        place_name: item.PlaceName.trim(),
                        city_name: item.CityName.trim(),
                        country_id: item.CountryId.trim(),
                        geo_id: item.GeoId.trim(),
                        geo_container_id: item.GeoContainerId.trim(),
                        distance: null,
                        location: null,
                    };
                });

                setSuggestions(formattedSuggestions);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };


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
            {showSuggestions && (
                <div
                    ref={suggestionsRef}
                    className={styles.suggestions_dropdown}
                >
                    {suggestions.length > 0 ? (suggestions.map((suggestion, index) => (
                        <div
                            key={suggestion.place_id}
                            className={`${styles.suggestion_item} ${index === activeSuggestion ? styles.suggestion_item_active : ""}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <div>
                                <span className={styles.suggestion_city}>{suggestion.place_name}</span>
                                <span className={styles.suggestion_country}>
                                    ({suggestion.distance ? suggestion.distance : suggestion.city_name} {" "} | {suggestion.country_id})
                                </span>
                            </div>
                        </div>
                        ))) : (<div
                            className={styles.suggestion_item}
                            onClick={() => setShowSuggestions(false)}
                        >
                            {isLoading ? "Loading..." : "No suggestions found"}
                        </div>)
                    }
                    
                </div>
            )}
        </div>
    );
}
