import React from 'react'

export default function ResumeDownload(props) {
    return (
        <div className="columns download">
                <p>
                    <a href={process.env.PUBLIC_URL + props.resumeDownload} target="_blank" className="button" download><i className="fa fa-download" d></i>Download Resume</a>
                </p>
        </div>
    )
}
