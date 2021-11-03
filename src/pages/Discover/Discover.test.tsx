import React from 'react';
import { render } from '@testing-library-react';
import Discover from './Discover';

describe('Discover Component', () => {
    test('it should match the snapshot', () => {
        const { asFragment } = render(<Discover />);
        expect(asFragment()).toMatchSnapshot();
    });
});
