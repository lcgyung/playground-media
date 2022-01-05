import React, { useRef, useEffect } from 'react';
import Plyr, { APITypes } from 'plyr-react';
import 'plyr-react/dist/plyr.css';

const SamplePlyr = () => {
	const ref = useRef<APITypes>(null);
	useEffect(() => {
		console.log('1 : ', ref.current);
		if (ref.current?.plyr as Plyr) {
			console.log('2 : ', ref.current?.plyr as Plyr);
		}
	}, [ref.current?.plyr as Plyr]);
	return (
		<Plyr
			ref={ref}
			source={{
				type: 'video',
				title: 'Example title',
				sources: [
					{
						src: '/sample-small.mp4',
						type: 'video/mp4',
						size: 1024,
					},
				],
			}}
			options={{
				controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
				autoplay: true,
				invertTime: true,
			}}
		/>
	);
};

export default SamplePlyr;
