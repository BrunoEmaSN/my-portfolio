import React from 'react';
import Card from '../../Components/Card';

export default class Projects extends React.Component{
    render(){
        return (
            <section className="flex" id="projects">
                <h1>Projects</h1>
                <Card />
            </section>
        );
    }
}