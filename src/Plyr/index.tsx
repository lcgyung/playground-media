import React, { useRef, useEffect } from 'react';
import Plyr, { APITypes } from 'plyr-react';
import 'plyr-react/dist/plyr.css';

const SamplePlyr = () => {
	const ref = useRef<APITypes>(null);
	return (
		<Plyr
			ref={ref}
			source={{
				type: 'video',
				title: 'Example title',
				sources: [
					{
						src: 'https://kpec2-dlacc.myskcdn.net/lecture/lecss3-1.mov',
						type: 'video/mp4',
						size: 1024,
					},
				],
			}}
			options={{
				controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
				autoplay: true,
				invertTime: true,
			}}
		/>
	);
};

export default SamplePlyr;
