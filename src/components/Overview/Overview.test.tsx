import React from 'react';
import { render } from '@testing-library-react';
import Overview from './Overview';

describe('Overview Component', () => {
    test('it should match the snapshot', () => {
        const { asFragment } = render(<Overview />);
        expect(asFragment()).toMatchSnapshot();
    });
});
