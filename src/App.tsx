import React, { useRef } from 'react';
import SampleZoom from './Zoom';
import SamplePlyr from './Plyr';
import SampleVideoJs from './Videojs';
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

const sources = [
	{
		src: 'https://kpec2-dlacc.myskcdn.net/lecture/lecss3-1.mov',
		type: 'video/mp4',
	},
];

function App() {
	return (
		<>
			{/* <SampleZoom /> */}
			{/* <SamplePlyr /> */}
			{<SampleVideoJs sources={sources} />}
			{/* <video controls autoPlay>
				<source src="https://kpec2-dlacc.myskcdn.net/lecture/lecss3-1.mov" type='video/mp4'></source>
			</video> */}
		</>
	);
}

export default App;
