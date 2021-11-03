import React from 'react';
import { render } from '@testing-library-react';
import Menu from './Menu';

describe('Menu Component', () => {
    test('it should match the snapshot', () => {
        const { asFragment } = render(<Menu />);
        expect(asFragment()).toMatchSnapshot();
    });
});
