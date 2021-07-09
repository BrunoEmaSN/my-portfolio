import React from 'react';
import CoverVideo from '../../Media/cover_video.mp4';
import './stylesCover.css';

export default class Cover extends React.Component {
    render(){
        return(
            <div className="cover-container">
                <video className="video" src={CoverVideo} autoPlay loop muted />
                <h1 className="title">Hi World, I'm Bruno Sanchez</h1>
                <p className="text-second">this is my portfolio</p>
            </div>
        );
    }
}