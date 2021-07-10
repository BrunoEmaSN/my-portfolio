import React from 'react';
import Card from '../../Components/Card';
import projects from '../../Services/projects';
import '../../App.css';
import './stylesPortfolio.css';

export default class Projects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isActive: ''
        };
    }

    handleHover = (id) => {
        this.setState({isActive: id});
        console.log(this.state.isActive);
    }

    resetHover = () => {
        this.setState({isActive: ''});
    }
    render(){
        return (
            <section id="portfolio" className="fix bg-dark">
                <div className="container">
                    <div className="row flex">
                        <div className="section-title">
                            <h2 className="title portfolio-title">My Projects</h2>
                        </div>
                    </div>
                    <div className="row">
                        <section className="portfolio-section">
                            {projects.map((data) => (
                                <div className="card">
                                    <Card 
                                        key={data.id}
                                        image={data.image}
                                        title={data.title}
                                        description={data.description}
                                        href={data.href}
                                    />
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </section>
        );
    }
}