import React, { Component } from 'react';

class Portfolio extends Component {
  render() {

    if(this.props.data){
      var projects = this.props.data.projects.map(function(projects){
        var projectImage = 'images/portfolio/'+projects.image;
        return <div key={projects.title} className="columns portfolio-item">
           <a className="githubProjectLink" target="_blank" href={projects.github}><i className="fa fa-github"></i></a> 
           <div className="item-wrap">
            <a href={projects.url} title={projects.title}>
               <img alt={projects.title} src={projectImage} />
               <div className="overlay">
                  <div className="portfolio-item-meta">
                    <h5>{projects.title}</h5>
                    <p>{projects.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
          </div>
          <div className="projectTechnologies">
            {projects.technologies.map((tech, i) => {
              return (technologyItem(tech, i))
            })}
          </div>
        </div>
      })
    }

    return (
      <section id="portfolio">
      <div className="row">
         <div className="twelve columns collapsed">
            <h1>Check Out Some of My Projects.</h1>
            <div id="portfolio-wrapper" className="bgrid-halves s-bgrid-halves cf">
                {projects}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

function technologyItem(tech, key) {
  return (
    <div className="technologyItem" key={key}>
      {tech}
    </div>
  )
}

export default Portfolio;
