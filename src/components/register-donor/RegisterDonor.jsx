import React, { useState } from 'react';
import './register-donor.scss';
import {
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  Input,
  Container,
  Heading,
  VStack,
  Select,
  Button,
  Text
} from '@chakra-ui/react';
import PlacesSearchInput from '../locationsearch-input/PlacesSearchInput';
import { BiCurrentLocation } from 'react-icons/bi';
import ErrorMessage from '../common/error-container/ErrorMessage';
import * as $ from 'jquery';

export default function RegisterDonor() {
  const styles = {
    focusBorderColor: 'red.300',
    selectSize: 'lg'
  };

  const [fullName, setFullName] = useState(null);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState(null);
  const [bloodGroup, setBloodGroup] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState(null);

  const onSubmit = values => {
    console.debug(values, 'Form submitted');
    if (locationCoords !== null) {
      setFormData({ ...values, locationCoords });
    }
  };

  const validateField = event => {
    if (!event.target.value.length) {
      setErrors({
        ...errors,
        [event.target.name]: {
          required: 'This field cannot be empty.'
        }
      });
    }
    checkIsFormValid();
  };

  const checkIsFormValid = () => {
    if (
      fullName !== null &&
      age !== 0 &&
      gender !== null &&
      bloodGroup !== null &&
      (locationCoords !== null || selectedPlace !== null)
    ) {
      setIsFormValid(true);
    }
  };

  const handleFieldChange = event => {
    validateField(event);
    switch (event.target.name) {
      case 'fullName':
        setFullName(event.target.value);
        break;
      case 'gender':
        setGender(event.target.value);
        break;
      case 'bloodGroup':
        setBloodGroup(event.target.value);
        break;
    }
  };

  const getCurrentLocation = () => {
    $('.location-picker').addClass('bounce');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocationCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setTimeout(() => {
            $('.location-picker').removeClass('bounce');
          }, 2000);
        },
        err => {
          if (err.code == 1) {
            alert('Error: Access is denied!');
          } else if (err.code == 2) {
            alert('Error: Position is unavailable!');
          }
          setTimeout(() => {
            $('.location-picker').removeClass('bounce');
          }, 2000);
        }
      );
    }
  };

  const updatePlaceSelection = place => {
    setSelectedPlace(place);
    console.debug('Selected place:', place);
  };

  return (
    <Container className='register-donor-container' centerContent>
      <Heading as='h3' size='lg' className='header-text'>
        Let us add you to our list of life saviours
      </Heading>
      <VStack spacing={5}>
        <div className='register-donor-form'>
          <Input
            name='fullName'
            variant='flushed'
            placeholder='Full name'
            focusBorderColor={styles.focusBorderColor}
            isRequired
            onChange={event => handleFieldChange(event)}
          />
          {errors?.fullName?.required && (
            <ErrorMessage message={errors.fullName.required} />
          )}
          <NumberInput
            min={18}
            max={100}
            name='age'
            isRequired
            variant='flushed'
            focusBorderColor={styles.focusBorderColor}
            onChange={value => setAge(value)}
          >
            <NumberInputField placeholder='Age' name='age' />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {errors?.age?.required && (
            <ErrorMessage message={errors.age.required} />
          )}
          <Select
            placeholder='Select your gender'
            variant='flushed'
            size={styles.selectSize}
            focusBorderColor={styles.focusBorderColor}
            name='gender'
            isRequired
            onChange={event => handleFieldChange(event)}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='neutral'>Prefer not to say</option>
          </Select>
          <Select
            placeholder='Select your bloodgroop'
            variant='flushed'
            size={styles.selectSize}
            focusBorderColor={styles.focusBorderColor}
            isRequired
            name='bloodGroup'
            onChange={event => handleFieldChange(event)}
          >
            <option value='O+'>O+</option>
            <option value='O-'>O-</option>
            <option value='A+'>A+</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B-'>B-</option>
            <option value='AB+'>AB+</option>
            <option value='AB-'>AB-</option>
          </Select>

          <div className='location-block'>
            <div id='place-search-input'>
              <PlacesSearchInput
                isDisabled={locationCoords !== null}
                updatePlaceSelection={updatePlaceSelection}
              />
            </div>
            <BiCurrentLocation
              className='location-picker'
              onClick={getCurrentLocation}
              style={{ color: locationCoords !== null && 'green' }}
            />
          </div>
        </div>
        <Button
          className='action-button'
          colorScheme='red'
        >
          Add me
        </Button>
      </VStack>
    </Container>
  );
}
