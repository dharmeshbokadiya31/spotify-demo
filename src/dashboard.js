import React,  { useEffect, useState } from 'react';
import { Container, Navbar,  Button, Form, Card } from 'react-bootstrap';
import TrackSearchResult from './trackSearchResult';
import Player from "./player"

const API_URL = 'https://api.spotify.com/v1/search?q=';
const API_TOKEN = localStorage.getItem("token");

const Dashboard = ({ setToken }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState()

  const logout = () => {
    setToken("")
    window.localStorage.clear()
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}${query}&type=track,artist`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const data = await response.json();
      setResults(data.tracks.items.map(item => {
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
    };
    if (query) {
      fetchData();
    }
  }, [query]);

  const chooseTrack = (track) => {
    setPlayingTrack(track)
    setQuery("")
    setResults([])
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className='d-flex justify-content-between'>
          <Navbar.Brand>React Spotify</Navbar.Brand>
          <Navbar.Brand>
            <Button variant="outline-success" onClick={() => logout()}>Logout</Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className='d-flex flex-column py-2' style={{ height: "calc(100vh - 90px)" }}>
          <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className='flex-grow-1 my-2' style={{ overflowY: !playingTrack && "auto" }}>
            {results?.length ? results.map(detail => 
                <TrackSearchResult
                  detail={detail}
                  chooseTrack={chooseTrack}
                />
              ) : 
              playingTrack ? 
                <div class="card mb-3 bg-dark text-white" style={{ minHeight: "calc(100vh - 300px)" }}>
                  <div class="row no-gutters">
                    {console.log(playingTrack)}
                    <div class="col-md-4">
                      <img src={playingTrack?.albumUrl} class="card-img" alt="Image" style={{ height: "100%" }} />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h1 class="card-title">{playingTrack.title}</h1>
                        <p class="card-text">{playingTrack.artist}</p>
                      </div>
                    </div>
                  </div>
                </div>
              :
              <Container
                className='d-flex justify-content-center align-items-center my-5'
              >
                Search Songs/Artists and play the songs.
              </Container>
              }
          </div>
          {playingTrack && <div>
              <Player
                trackId={playingTrack?.id}
              />
          </div>}
      </Container>
    </>
  );
}

export default Dashboard;
