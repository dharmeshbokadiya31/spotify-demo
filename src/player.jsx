import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const API_TOKEN = localStorage.getItem("token");

const Player = ({ trackId }) => {
  const [player, setPlayer] = useState(null);
  
  useEffect(() => {
    if (trackId) {
      const setupPlayer = async () => {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        });
        const data = await response.json();
        setPlayer(data.preview_url);
      };
      setupPlayer();
    }
  }, [trackId]);

  return (
      <AudioPlayer
        autoPlay
        src={player}
        onPlay={e => console.log("onPlay")}
      />
    );
}

export default Player;
