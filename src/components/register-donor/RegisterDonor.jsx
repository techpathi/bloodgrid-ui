import React from 'react';
import { useFormik } from 'formik';
import './register-donor.scss';
import { Button, Input } from '@chakra-ui/react';
import PlacesSearchInput from '../locationsearch-input/PlacesSearchInput';

export default function RegisterDonor() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      age: '',
      gender: '',
      bloodgroup: '',
      location: ''
    }
  });

  const formSubmit = () => {
    console.log(JSON.stringify(formik.values, null, 2));
  };

  return (
    <div className='register-donor-container'>
      <div>
        <p className='header-text'>
          Let us add you to our list of life saviours
        </p>
        <form className='register-donor-form'>
          <Input
            variant='flushed'
            type='text'
            name='fullName'
            placeholder='Full name'
            {...formik.getFieldProps('fullName')}
          />
          <br />
          <Input
            type='number'
            name='age'
            placeholder='Age'
            {...formik.getFieldProps('age')}
          />
          <br />
          <select name='gender' {...formik.getFieldProps('gender')}>
            <option disabled value=''>
              Gender
            </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='neutral'>Prefer not to say</option>
          </select>
          <br />
          <select name='bloodgroup' {...formik.getFieldProps('bloodgroup')}>
            <option disabled value=''>
              Blood group
            </option>
            <option value='O+'>O+</option>
            <option value='O-'>O-</option>
            <option value='A+'>A+</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B-'>B-</option>
            <option value='AB+'>AB+</option>
            <option value='AB-'>AB-</option>
          </select>
          <br />
          <div id='place-search-input'>
            <PlacesSearchInput />
          </div>
        </form>
        <Button
          colorScheme='red'
          className='action-button'
          variant='solid'
          type='submit'
          onClick={formSubmit}
        >
          Add Me
        </Button>
      </div>
    </div>
  );
}
