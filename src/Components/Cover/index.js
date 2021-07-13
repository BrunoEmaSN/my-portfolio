import React from 'react';
import CoverVideo from '../../Media/cover_video.mp4';
import TextLoop from 'react-text-loop';
import './stylesCover.css';

export default class Cover extends React.Component {
    render(){
        return(
            <div className="cover-container flex">
                <video
                    className="video width-100 height-100vh"
                    src={CoverVideo}
                    autoPlay
                    loop
                    muted
                />
                <p className="text-second">welcome to my portfolio</p>
                <h1 className="title">Hi, I'm Bruno Sanchez</h1>
                <div className="presentation align-items-center">
                <TextLoop>
                        <span className="text-presentation">System Analyst</span>
                        <span className="text-presentation">Web Developer</span>
                        <span className="text-presentation">UX / UI Designer</span>
                </TextLoop>
                </div>
            </div>
        );
    }
}