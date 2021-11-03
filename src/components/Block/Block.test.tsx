import React from 'react';
import { render } from '@testing-library/react';
import Block from './Block';

describe('Block Component', () => {
    test('it should match the snapshot', () => {
        const { asFragment } = render(<Block />);
        expect(asFragment()).toMatchSnapshot();
    });
});
