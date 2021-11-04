import React from 'react';
import { render } from '@testing-library/react';
import Block from './Block';

const fakeRepo = {
      column: {masthead: '', body: ''},
      image: {name: 'not-found', URL: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80'}
    }

describe('Block Component', () => {
    test('it should match the snapshot', () => {
        const { asFragment } = render(<Block content={fakeRepo}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
