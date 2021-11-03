import React from 'react';
import { render } from '@testing-library/react';
import MainMenu from './MainMenu';

describe('MainMenu Component', () => {
    test('it should match the snapshot', () => {
        const { asFragment } = render(<MainMenu title={'SEARCH'} query={'q'}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
