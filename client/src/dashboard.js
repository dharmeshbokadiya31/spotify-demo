import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './trackSearchResult';
import Player from "./player"

const spotifyApi = new SpotifyWebApi({
    clientId: "3a9a76f893c44dd391d99b514595a208"
})
const Dashboard = ({ code }) => {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState()
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
        if (cancel) return
        setSearchResults(res.body.tracks.items.map(item => {
          console.log("item", item)
            const smallestAlbumImage = item.album.images.reduce((smallest, image) => {
                if (image.height < smallest.height) return image
                return smallest
            }, item.album.images[0])
            return {
                id: item.id,
                artist: item.artists[0].name,
                title: item.name,
                url: item.uri,
                albumUrl: smallestAlbumImage.url
            }
        }))
    })
    return () => cancel = true
  }, [search, accessToken])

  const chooseTrack = (track) => {
    setPlayingTrack(track)
    setSearch("")
  }

  return (
    <Container className='d-flex flex-column py-2' style={{ height: "100vh" }}>
        <Form.Control
           type="search"
           placeholder="Search Songs/Artists"
           value={search}
           onChange={(event) => setSearch(event.target.value)}
        />
        <div className='flex-grow-1 my-2' style={{ overflowY: "auto" }}>
           {searchResults.map(detail => 
              <TrackSearchResult
                detail={detail}
                key={detail.uri}
                chooseTrack={chooseTrack}
              />
            )}
        </div>
        <div>
            <Player
              accessToken={accessToken}
              trackUri={playingTrack?.url}
              trackId={playingTrack?.id}
            />
        </div>
    </Container>   
  );
}

export default Dashboard;
