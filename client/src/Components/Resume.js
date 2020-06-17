import React, { Component } from 'react';
import ResumeDownload from './ResumeDownload';

import '../Styles/resume.css';

class Resume extends Component {
  render() {

    if(this.props.data && this.props.main){
      var skillmessage = this.props.data.skillmessage;
      var resumeDownloadLink = this.props.main.resumeDownloadLink;
      console.log("this.props.data.education", this.props.data.education);
      var education = this.props.data.education.map(function(edu){
        return <div key={edu.school}><h3>{edu.school}</h3>
          <p className="info">{edu.degree} <span>&bull;</span><em className="date">{edu.graduated}</em></p>
          <p>{edu.description}</p>
            {(edu.minor) ? (
              <div>
                <p className="info">{edu.minor.degree}</p>
                <p>{edu.minor.description}</p>
              </div>
            ): (<div></div>)}
          </div>
      })
      var work = this.props.data.work.map(function(work){
        return (
          <div key={work.company}>
            <h3>{work.company}</h3>
            <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
            {/* <p className="tech-stack">
              {work.technologies.map(function(tech){
                return <span className="tech-label">{tech} </span>
              })}
            </p> */}
            <div className="technologies workTechnologies">
              {work.technologies.map(function(tech){
                return <div className="technologyItem">{tech} </div>
              })}
            </div>
            <ul className="workDesc">
              {work.description.map((desc, i) => <li key={i}>{desc}</li>)}
            </ul>
          </div>
        ) 
      })
      var extracurriculars = this.props.data.extracurriculars.map(function(extracurricular){
        return <div key={extracurricular.org}><h3>{extracurricular.org}</h3>
            <p className="info">{extracurricular.title}<span>&bull;</span> <em className="date">{extracurricular.dates}</em></p>
            <p>{extracurricular.description}</p>
            {(extracurricular.website) ? (
              <p className="websiteURL">
                <a href={extracurricular.website}>{extracurricular.website}</a>
              </p>
            ) : (<div />)}
        </div>
      })
      var skills = this.props.data.skills.map(function(skills){
        var className = 'bar-expand '+skills.name.toLowerCase();
        return <li key={skills.name}><span style={{width:skills.level}}className={className}></span><em>{skills.name}</em></li>
      })
    }

    return (
      <section id="resume">

        <div className="resume-download-container" style={{
              position: "absolute",
              right: 0
        }}>
          <ResumeDownload resumeDownload={resumeDownloadLink} />
        </div>

        <div className="row work">

          <div className="three columns header-col">
              <h1><span>Work</span></h1>
          </div>

          <div className="nine columns main-col">
            {work}
          </div>
        </div>

        <div className="row education">
            <div className="three columns header-col">
              <h1><span>Education</span></h1>
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                  <div className="twelve columns">
                    {education}
                  </div>
              </div>
            </div>
        </div>

        <div className="row work">
          <div className="three columns header-col">
            <h1><span>Extracurriculars</span></h1>
          </div>

          <div className="nine columns main-col">
            {extracurriculars}
          </div>
        </div>


        <div className="row skill">

          <div className="three columns header-col">
              <h1><span>Skills</span></h1>
          </div>

          <div className="nine columns main-col">

              <p>{skillmessage}
              </p>

          <div className="bars">
            <ul className="skills">
              {skills}
            </ul>
          </div>
        </div>
        </div>
      </section>
    );
  }
}

export default Resume;
