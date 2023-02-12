import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({ accessToken, trackUri, trackId }) => {
  const [player, setPlayer] = useState(null);
  
  useEffect(() => {
    const setupPlayer = async () => {
      const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      setPlayer(data.preview_url);
    };
    setupPlayer();
  }, [trackId]);

  return (
    <div>
      <button onClick={() => player.play()}>Play</button>
      <button onClick={() => player.pause()}>Pause</button>
      <AudioPlayer
    autoPlay
    src={player}
    onPlay={e => console.log("onPlay")}
    // other props here
  />
    </div>
    );
}

export default Player;
