import React from 'react';
import ReactDOM from 'react-dom';

import "../../src/styles.css";
import 'bootstrap/dist/css/bootstrap.css';

import { BrandywineEditor } from '../../src/index';
import Image from '../../src/plugins/image';
import Markdown from '../../src/plugins/markdown';
import CoverPhoto from "../../src/plugins/cover-photo";
import Spacer from '../../src/plugins/spacer';
import Carousel from '../../src/plugins/carousel';
import Video from '../../src/plugins/video';

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];

function Demo(props) {
	function onEditorChange(header, blocks) {
		// save this somewhere
	}

	return (
		<BrandywineEditor
			plugins={plugins}
			onChange={onEditorChange}
		/>
  );
}

ReactDOM.render(
  <Demo />,
  document.querySelector('#demo')
);

