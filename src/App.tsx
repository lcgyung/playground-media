import React, { useRef } from 'react';
import SampleZoom from './Zoom';
import SamplePlyr from './Plyr';
import SampleVideoJs from './Videojs';
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

const options: VideoJsPlayerOptions = {
	autoplay: true,
	controls: true,
	controlBar: {
		pictureInPictureToggle: false,
	},
	responsive: true,
	fluid: true,
	muted: true,
	sources: [
		{
			src: 'https://kpec2-dlacc.myskcdn.net/lecture/lecss3-1.mov',
			type: 'video/mp4',
		},
	],
	// autoplay: true,
	// preload: 'auto',
	// bigPlayButton: true,
	// controls: true,
	// controlBar: {
	// 	pictureInPictureToggle: false,
	// 	descriptionsButton: true,
	// 	volumePanel: {
	// 		inline: false,
	// 	},
	// },
	// sources: [
	// 	{
	// 		src: 'https://kpec2-dlacc.myskcdn.net/lecture/lecss3-1.mov',
	// 		type: 'video/mp4',
	// 	},
	// ],
	// userActions: {
	// 	hotkeys: true,
	// },
};

function App() {
	const supposedCurrentTime = useRef<number>(0);
	const playerRef = useRef<VideoJsPlayer>();

	const handlePlayerReady = (player: VideoJsPlayer) => {
		playerRef.current = player;

		player.ready(() => {
			player.hotkeys({
				volumeStep: 0.1,
				seekStep: 5,
			});
		});
		player.on('timeupdate', () => {
			if (!player.seeking()) {
				supposedCurrentTime.current = player.currentTime();
			}
		});
		player.on('play', () => {
			player.muted(false);
		});
		player.on('seeking', () => {
			const currentTime = player.currentTime();
			const prevTime = supposedCurrentTime.current;
			if (currentTime > prevTime) {
				player.currentTime(prevTime);
			}
		});
	};

	return (
		<>
			{/* <SampleZoom /> */}
			{/* <SamplePlyr /> */}
			{<SampleVideoJs options={options} onReady={handlePlayerReady} />}
			{/* <video controls autoPlay>
				<source src="https://kpec2-dlacc.myskcdn.net/lecture/lecss3-1.mov" type='video/mp4'></source>
			</video> */}
		</>
	);
}

export default App;
