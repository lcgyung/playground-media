import React, { FC, useRef, useEffect } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import hotkeys from 'videojs-hotkeys';

// Styles
import 'video.js/dist/video-js.css';

interface IVideoPlayerProps {
	options: VideoJsPlayerOptions;
	onReady?: (player: VideoJsPlayer) => void;
}

const PLAYER_OPTION = {
	seekStep: 5,
	volumeStep: 0.1,
};

const initialOptions: videojs.PlayerOptions = {
	autoplay: true,
	preload: 'autt',
	bigPlayButton: true,
	controls: true,
	controlBar: {
		pictureInPictureToggle: false,
		descriptionsButton: true,
		volumePanel: {
			inline: false,
		},
	},
	plugins: {
		hotkeys,
	},
	userActions: {
		hotkeys: true,
	},
};

const VideoPlayer: FC<IVideoPlayerProps> = ({ options, onReady }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const playerRef = useRef<VideoJsPlayer>();

	useEffect(() => {
		// make sure Video.js player is only initialized once
		if (!playerRef.current) {
			const videoElement = videoRef.current;
			if (!videoElement) return;

			const player = (playerRef.current = videojs(videoElement, options, () => {
				console.log('player is ready');
				onReady && onReady(player);
			}));
		} else {
			// you can update player here [update player through props]
			// const player = playerRef.current;
			// player.autoplay(options.autoplay);
			// player.src(options.sources);
		}
	}, [options, videoRef]);

	// Dispose the Video.js player when the functional component unmounts
	useEffect(() => {
		const player = playerRef.current;

		return () => {
			if (player) {
				player.dispose();
				playerRef.current = undefined;
			}
		};
	}, [playerRef]);

	// useEffect(() => {
	// 	if (videoRef.current) {
	// 		player.current = videojs(videoRef.current, {
	// 			...initialOptions,
	// 			sources,
	// 		});
	// 	}
	// 	return () => {
	// 		if (player.current) {
	// 			player.current.dispose();
	// 		}
	// 	};
	// }, [sources]);

	// useEffect(() => {
	// 	if (player.current) {
	// 		player.current.ready(function () {
	// 			this.hotkeys({
	// 				volumeStep: PLAYER_OPTION.volumeStep,
	// 				seekStep: PLAYER_OPTION.seekStep,
	// 			});
	// 		});
	// 	}
	// }, [player]);

	return (
		<div data-vjs-player>
			<video ref={videoRef} className="video-js vjs-big-play-centered" autoPlay />;
		</div>
	);
};

export default VideoPlayer;
