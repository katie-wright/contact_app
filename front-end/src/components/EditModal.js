import React, { Component } from 'react';

class EditModal extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName: this.props.details.firstName,
      lastName: this.props.details.lastName,
      phone: this.props.details.phone,
      email: this.props.details.email,
      tags: this.props.details.tags,
      picture: this.props.details.picture
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
        this.props.editContact(this.state, this.props.details.id);
    }
    else {
        alert("Please include a first and last name for each contact");
    }
  }
  render(){
    return (
        <div id={"edit"+this.props.details.id} className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Update Contact</h4>
                </div>
                <div className="modal-body">
                    <div id="auth">
                        <form>
                        <div className="form-group">
                            <input 
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            name="firstName"
                            placeholder="First Name"
                            value={this.state.firstName} />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text"  
                            name="lastName" 
                            placeholder="Last Name"
                            value={this.state.lastName} />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            name="phone" 
                            placeholder="Phone Number"
                            value={this.state.phone}/>
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            name="email" 
                            placeholder="Email"
                            value={this.state.email} />
                        </div>
                         <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            name="picture" 
                            placeholder="Image URL"
                            value={this.state.picture} />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            name="tags" 
                            placeholder="Tags (separated by commas)"
                            value={this.state.tags ? this.state.tags.join(",") : ""} />
                        </div>
                        <div className="form-group">
                            <button onClick={this.formSubmit} className="btn btn-primary" data-dismiss="modal">Update</button>
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

export default EditModal;