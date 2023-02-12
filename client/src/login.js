import React from 'react';
import { Container } from "react-bootstrap"

const AUTH_URL = `https://accounts.spotify.com/authorize
?client_id=3a9a76f893c44dd391d99b514595a208
&response_type=code
&redirect_uri=http://localhost:3000
&scope=user-read-private%20user-read-email`

const Login = () => {
    return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: "100vh" }}
    >
        <a className='btn btn-success btn-lg' href={AUTH_URL}>
            Login to Spotify
        </a>
    </Container>
  );
}

export default Login;
