import React from 'react';
import ShakaPlayer from 'shaka-player-react';

import 'shaka-player/dist/controls.css';

function App() {
	return <ShakaPlayer autoPlay src="https://streams.com/example.mpd" />;
}

export default App();
