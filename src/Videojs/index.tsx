/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-multi-assign */
import React, { FC, useRef, useEffect, KeyboardEvent } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

// Styles
import 'video.js/dist/video-js.css';
import './player.css';

interface IVideoPlayerProps {
	sources: videojs.Tech.SourceObject[];
}

const CUSTOM_OPTION = {
	VOLUME_STEP: 0.1,
	SEEK_STEP: 5,
};

const options: VideoJsPlayerOptions = {
	autoplay: true,
	controls: true,
	controlBar: {
		pictureInPictureToggle: false,
	},
	responsive: true,
	fluid: true,
	muted: true,
};

// TODO : 이전 시청 이력 반영 > ready
const VideoPlayer: FC<IVideoPlayerProps> = ({ sources }) => {
	const supposedCurrentTime = useRef<number>(0);
	const videoRef = useRef<HTMLVideoElement>(null);
	const playerRef = useRef<VideoJsPlayer>();

	useEffect(() => {
		// make sure Video.js player is only initialized once
		if (!playerRef.current) {
			const videoElement = videoRef.current;
			if (!videoElement) return;

			const player = (playerRef.current = videojs(videoElement, { ...options, sources }, () => {
				player.on('timeupdate', () => handleTimeUpdate(player));
				player.on('seeking', () => handleSeeking(player));
				player.on('focusout', () => handleFocusOut(player));
				player.on('keydown', (e) => handleKeyDown(e, player));
			}));
		}
	}, [sources, videoRef]);

	// Dispose the Video.js player when the functional component unmounts
	useEffect(() => {
		const player = playerRef.current;

		if (player) {
			player.focus();
			player.muted(false);
		}

		return () => {
			if (player) {
				player.dispose();
				playerRef.current = undefined;
			}
		};
	}, [playerRef]);

	const handleTimeUpdate = (player: VideoJsPlayer) => {
		if (!player.seeking()) {
			supposedCurrentTime.current = player.currentTime();
		}
	};

	const handleSeeking = (player: VideoJsPlayer) => {
		const currentTime = player.currentTime();
		const prevTime = supposedCurrentTime.current;
		if (currentTime > prevTime) {
			player.currentTime(prevTime);
		}
	};

	const handleFocusOut = (player: VideoJsPlayer) => {
		player.focus();
	};

	const handleKeyDown = (e: KeyboardEvent, player: VideoJsPlayer) => {
		switch (e.code) {
			case 'Space':
				if (player.paused()) {
					player.play();
				} else {
					player.pause();
				}
				break;
			case 'Enter':
				if (player.isFullscreen()) {
					player.exitFullscreen();
				} else {
					player.requestFullscreen();
				}
				break;
			case 'ArrowLeft':
				player.currentTime(player.currentTime() - CUSTOM_OPTION.SEEK_STEP);
				break;
			case 'ArrowDown':
				player.volume(player.volume() - CUSTOM_OPTION.VOLUME_STEP);
				break;
			case 'ArrowUp':
				player.volume(player.volume() + CUSTOM_OPTION.VOLUME_STEP);
				break;
			default:
		}
	};

	return (
		<div data-vjs-player>
			<video ref={videoRef} className="video-js vjs-big-play-centered" />
		</div>
	);
};

export default VideoPlayer;
