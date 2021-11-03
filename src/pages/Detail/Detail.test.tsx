import React from 'react';
import { render } from '@testing-library/react';
import Detail from './Detail';

describe('Detail Component', () => {
    test('it should match the snapshot', () => {
        const { asFragment } = render(<Detail />);
        expect(asFragment()).toMatchSnapshot();
    });
});
