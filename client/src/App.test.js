import { render, screen } from '@testing-library/react';
import {App} from './App';
import renderer from 'react-test-renderer';

describe("App rendering specification", () => {
  it('App is rendered', () => {
      const component = renderer.create(
          <App />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
  });
});