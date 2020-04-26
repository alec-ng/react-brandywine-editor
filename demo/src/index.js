import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { BrandywineEditor } from '../../src/edit-mode/index';
import { BrandywineReader } from '../../src/read-mode/index';

import Image from '../../src/plugins/image';
import Markdown from '../../src/plugins/markdown';
import CoverPhoto from "../../src/plugins/cover-photo";
import Spacer from '../../src/plugins/spacer';
import Carousel from '../../src/plugins/carousel';
import HTMLVideo from '../../src/plugins/html-video';
import EmbeddedVideo from '../../src/plugins/embedded-video';

import testData from './data';

const plugins = [
  Image, 
  Markdown, 
  CoverPhoto, 
  Spacer, 
  Carousel, 
  HTMLVideo, EmbeddedVideo
];

function Demo() {
  
  function onEditorChange(header, blocks) {
  // save this somewhere
  }

  return (
    <div className="container">
      <BrandywineEditor
        plugins={plugins}
        onChange={onEditorChange}
        pageData={testData}
      />
      {/* Readonly module for static rendering */}
      {/* <div style={{marginBottom: '2rem'}}>
        <BrandywineReader
          plugins={plugins}
          pageData={testData}
        />
      </div> */}
    </div>
  );
}

ReactDOM.render(
  <Demo />,
  document.querySelector('#demo')
);

