import React, { useState, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Control, Controller } from "react-hook-form";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface Suggestion {
  id: string;
  place_name: string;
  context: Array<{ id: string; text: string; }>;
  text: string;
}

interface MapboxCityStateAutocompleteProps {
  control: Control<any>;
  name: string;
  className?: string;
  placeholder?: string;
}

// This component uses the Mapbox Geocoding API to provide city and state suggestions
// as the user types, excluding country information.
const MapboxCityStateAutocomplete: React.FC<MapboxCityStateAutocompleteProps> = ({
  control,
  name,
  className,
  placeholder = "Enter a city"
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length > 2 && MAPBOX_TOKEN) {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;
      const url = `${endpoint}?access_token=${MAPBOX_TOKEN}&types=place&limit=5`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setSuggestions(data.features as Suggestion[]);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  }, []);

  const formatCityState = (suggestion: Suggestion) => {
    const city = suggestion.text;
    const state = suggestion.context.find(item => item.id.startsWith('region'))?.text;
    return state ? `${city}, ${state}` : city;
  };

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <>
            <Input
              className={className}
              autoComplete="off"
              type="text"
              value={value || ''}
              onChange={(e) => {
                const newValue = e.target.value;
                onChange(newValue);
                fetchSuggestions(newValue);
              }}
              ref={ref}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-[#0c6999]"
                    onClick={() => {
                      const formattedLocation = formatCityState(suggestion);
                      onChange(formattedLocation);
                      setSuggestions([]);
                    }}
                  >
                    {formatCityState(suggestion)}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      />
    </div>
  );
};

export default MapboxCityStateAutocomplete;