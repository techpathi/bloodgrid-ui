import React from 'react';
import './error-container.scss';
import { BiErrorCircle } from 'react-icons/bi';

export default function ErrorMessage({ message }) {
  return (
    <p className='error-block'>
      <BiErrorCircle />
      {message}
    </p>
  );
}
