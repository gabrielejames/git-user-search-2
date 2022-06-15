import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import {Search} from './components/Search'


describe("WordSearch rendering specification", () => {
    it('WordSearch is rendered', () => {
        const component = renderer.create(
            <Search />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
