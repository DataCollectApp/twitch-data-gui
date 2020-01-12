import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('renders recent data text', () => {
  const {getByText} = render(<App/>);
  const text = getByText(/Recent data/i);
  expect(text).toBeInTheDocument();
});
