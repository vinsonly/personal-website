import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const reactSwal = withReactContent(swal);

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: "",
      contactEmail: "",
      contactSubject: "",
      contactMessage: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("state", this.state);

    let isValid = this.validateInputs();
    if(!isValid) { return }

    const data = Object.assign({}, this.state);
    
    console.log("data", data);
    let status;
    
    swal.showLoading();

    fetch('/api/send_email', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          'Content-Type':'application/json'
      }
    }).then((res) => {
      status = res.status;
      return res.json()
    }).then(body => {
      console.log("body", body);
      console.log("status", status);
      if(status == 200) {
        swal({
          type: "success",
          text: "Your message was sent, thank you! I will get back to you as soon as possible."
        })
      } else {

        reactSwal.fire({
          text: <p>Hello World</p>,
          text: (
            <div id="message-warning">
              <i className="far fa-times-circle"></i>
              Your message failed to send, please try again later. In the mean time, you can contact me at <a href="https://www.linkedin.com/in/vinsonly/">https://www.linkedin.com/in/vinsonly/</a>. Thanks!
            </div>
          )
        })
      }
    })
    .catch((err) => {
      console.error(err.msg);
      reactSwal.fire({
        text: <p>Hello World</p>,
        text: (
          <div id="message-warning">
            <i className="far fa-times-circle"></i>
            Your message failed to send, please try again later. In the mean time, you can contact me at <a href="https://www.linkedin.com/in/vinsonly/">https://www.linkedin.com/in/vinsonly/</a>. Thanks!
          </div>
        )
      })
    })
  }

  validateInputs() {
    let s = this.state;

    if(s.contactName.length == 0 || s.contactEmail.length == 0 || s.contactSubject.length == 0 || s.contactMessage.length == 0) {
      swal({
        type: "error",
        text: "Please fill in all the required fields"
      })
      return false;
    }

    return true;
  }

  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="twelve columns">

               <form id="contactForm" name="contactForm" onSubmit={this.handleSubmit}>
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={this.handleChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input type="email" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.handleChange}/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" onChange={this.handleChange}></textarea>
                  </div>

                  <div>
                     <button className="submit" type="submit" form="contactForm">Submit</button>
                     <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
					</fieldset>
				   </form>

           <div id="message-warning">
            <i className="far fa-times-circle"></i>
            Your message failed to send, please try again later. In the mean time, you can contact me at <a href="https://www.linkedin.com/in/vinsonly/">https://www.linkedin.com/in/vinsonly/</a>. Thanks!
          </div>
				   <div id="message-success">
            <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

				   </div>

            </aside>
      </div>
   </section>
    );
  }
}

export default Contact;
