import expect from 'expect';
import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import { BrandywineEditor } from 'src/';

describe('Component', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div')
  });

  afterEach(() => {
    unmountComponentAtNode(node)
  });

  it('is just a sample test', () => {
    expect(true).toBe(true);
  })
})
