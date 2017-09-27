import React, { Component } from 'react';

class AddModal extends Component {
  constructor(){
    super();
    this.state={
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      picture: "",
      tags: []
    }
    this.txtFieldChange=this.txtFieldChange.bind(this);
    this.formSubmit=this.formSubmit.bind(this);
  }
  txtFieldChange(e){
    if (e.target.name==="tags"){
      let tags=e.target.value.split(",")
      this.setState({
        tags: tags
      })
    }
    else {
      this.setState({
            [e.target.name]: e.target.value
        });
    }
  }
  formSubmit(e){
    e.preventDefault();
    if (this.state.firstName && this.state.lastName) {
        this.props.addContact(this.state);
    }
    else {
        alert("Please include a first and last name for each contact");
    }
  }
  render(){
    return (
        <div id="add" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">New Contact</h4>
                </div>
                <div className="modal-body">
                    <div id="auth">
                        <form>
                        <div className="form-group">
                            <input 
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            placeholder="First Name" 
                            name="firstName" />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            placeholder="Last Name" 
                            name="lastName" />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            placeholder="Phone Number" 
                            name="phone" />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            placeholder="Email" 
                            name="email" />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            placeholder="Image URL" 
                            name="picture" />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            placeholder="Tags (separated by commas)" 
                            name="tags" />
                        </div>
                        <div className="form-group">
                            <button onClick={this.formSubmit} className="btn btn-primary" data-dismiss="modal">Add</button>
                        </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
  }
}

export default AddModal;