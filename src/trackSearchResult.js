import React from 'react';

const TrackSearchResult = ({ detail, chooseTrack }) => {
    return (
        <div 
          className='d-flex m-2 align-items-center'
          style={{ cursor: "pointer" }}
          onClick={() => chooseTrack(detail)}
        >
            <img src={detail.albumUrl} style={{ height: "64px", width: "64px" }} />
            <div className='ml-3'>
                <div>{detail.title}</div>
                <div className='text-muted'>{detail.artist}</div>
            </div>
        </div>
    );
}

export default TrackSearchResult;
