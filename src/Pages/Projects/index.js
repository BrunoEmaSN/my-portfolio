import React from 'react';
import Card from '../../Components/Card';
import projects from '../../Services/projects';
import '../../App.css';
import './stylesProjects.css';

export default class Projects extends React.Component{
    render(){
        return (
            <section id="projects" className="flex project-container">
                <div className="container">
                    <h1>Projects</h1>
                    <div className="flex row wrap">
                        { projects.map((data) => (
                            <Card
                                key={ data.id }
                                title={ data.title }
                                description={ data.description }
                                img={ data.image }
                                link={ data.links }
                            />
                        )) }
                    </div>
                </div>
                
            </section>
        );
    }
}