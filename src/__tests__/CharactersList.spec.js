import React from 'react'; 
import ReactDOM from 'react-dom'; 
import CharactersList from '../components/charactersList'; 

import fetchMock from "fetch-mock";
import { act } from 'react-dom/test-utils';

let container
describe('CharactersList tests', () => {
  beforeAll(() => {
    container = document.createElement('div');
    global.fetch = fetch;
  });
  afterAll(() => {
    document.body.removeChild(container);
    container = null;
    fetchMock.restore();
  });

  it('renders fine', () => { 
    const response =  {
      data: {
        results: [{
          id: 1,
          name: 'captain',
          thumbnail: {
            path: 'path_of_image'
          }
        }]
      }
    }
    fetchMock.mock("*", JSON.stringify(response));
    act(() => {
      ReactDOM.render(<CharactersList />, container);
    })
  });
}) 