import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function PlacesSearchInput() {
  const [place, setPlace] = useState(null);

  return (
    <GooglePlacesAutocomplete
      apiKey={'AIzaSyBJzpT-DK-84S6HcDUt1eOnnpsLQeEPrjA'}
      selectProps={{
        place,
        onChange: setPlace,
        placeholder: 'City or Town'
      }}
    />
  );
}
