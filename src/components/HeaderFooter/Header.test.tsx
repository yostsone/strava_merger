import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderLogo from './HeaderLogo';

test('renders learn react link', () => {
  render(<HeaderLogo />);
  const headerElement = screen.getByText(/smerge/i);
  expect(headerElement).toBeInTheDocument();
});
