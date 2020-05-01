import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


/*************************************************************************
 to be honest I don't know what this does. But don't delete it I guess
***************************************************************************/

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
