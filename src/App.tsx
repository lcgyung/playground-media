import React from 'react';
import SampleZoom from './Zoom';
import SamplePlyr from './Plyr';
import VideoPlayerTemp from './Videojs';

const sources = [
	{
		src: 'http://vjs.zencdn.net/v/oceans.mp4',
		type: 'video/mp4',
	},
];

function App() {
	return (
		<>
			{/* <SampleZoom /> */}
			{/* <SamplePlyr /> */}
			{<VideoPlayerTemp sources={sources} />}
		</>
	);
}

export default App;
