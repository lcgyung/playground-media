import React, { FC, useRef, useEffect } from 'react';
import videojs from 'video.js';
import hotkeys from 'videojs-hotkeys';

// Styles
import 'video.js/dist/video-js.css';

type TypeSource = {
	src: string;
	type: string;
};

interface IVideoPlayerProps {
	sources: Array<TypeSource>;
}

const PLAYER_OPTION = {
	seekStep: 5,
	volumeStep: 0.1,
};

const initialOptions: videojs.PlayerOptions = {
	autoplay: true, // 오동작
	controls: true,
	controlBar: {
		pictureInPictureToggle: false,
		progressControl: false,
		descriptionsButton: true,
		volumePanel: {
			inline: false,
		},
	},
	playbackRates: [0.5, 1, 1.5, 2],
	plugins: {
		hotkeys,
	},
	userActions: {
		hotkeys: true,
	},
};

const VideoPlayer: FC<IVideoPlayerProps> = ({ sources }) => {
	const videoNode = useRef<HTMLVideoElement>(null);
	const player = useRef<videojs.Player>();

	useEffect(() => {
		if (videoNode.current) {
			player.current = videojs(videoNode.current, {
				...initialOptions,
				sources,
			});
		}
		return () => {
			if (player.current) {
				player.current.dispose();
			}
		};
	}, [sources]);

	useEffect(() => {
		if (player.current) {
			player.current.ready(function () {
				this.hotkeys({
					volumeStep: PLAYER_OPTION.volumeStep,
					seekStep: PLAYER_OPTION.seekStep,
				});
			});
		}
	}, [player]);

	return <video ref={videoNode} className="video-js" />;
};

export default VideoPlayer;
