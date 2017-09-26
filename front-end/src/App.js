import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
        super();
        this.state = {
            contacts: [],
            search: "",
            searchFilter: ""
        }
        this.addContact=this.addContact.bind(this);
        this.deleteContact=this.deleteContact.bind(this);
        this.editContact=this.editContact.bind(this);
        this.search=this.search.bind(this);
        this.searchFilter=this.searchFilter.bind(this);
    }
    addContact(contact){
      axios.post('http://localhost:8080/contacts', contact)
        .then(res=>{
          this.setState({
            contacts: res.data
          })
        })
        .catch(err=>{
          console.log(err);
        })
    }
    deleteContact(id) {
      axios.delete('http://localhost:8080/contacts/'+id)
        .then(res=>{
          this.setState({
            contacts: res.data
          });
        })
        .catch(err=>{
          console.log(err);
        })
    }
    editContact(updateData, id){
      axios.put('http://localhost:8080/contacts/'+id, updateData)
        .then(res=>{
          this.setState({
            contacts: res.data
          });
        })
        .catch(err=>{
          console.log(err);
        })
    }
    componentWillMount() {
        axios.get('http://localhost:8080/contacts')
            .then(res=>{
                this.setState({
                    contacts: res.data
                });
            })
            .catch(err=>{
                console.log(err);
            })
    }
    search(e){
      this.setState({
        search: e.target.value
      })
    }
    searchFilter(e){
      this.setState({
        searchFilter: e.target.value
      })
    }
    render() {
        let contacts=this.state.contacts;
        if (this.state.search) {
          contacts=contacts.filter(contact=>{
            if (this.state.searchFilter) {
              return (String(contact[this.state.searchFilter]).toLowerCase().includes(this.state.search.toLowerCase()))
            }
            else {
              for (const key in contact) {
                if (key !== "picture" && String(contact[key]).toLowerCase().includes(this.state.search.toLowerCase())) {
                    return true;
                  }
                }
                return false;
              }
            });
        }
        let contactsJsx = contacts.map(contact=>{
            return <Contact details={contact} deleteContact={this.deleteContact} editContact={this.editContact} />
        })
        return (
            <div className="container" >
                <div>
                  <button data-toggle="modal" data-target="#add">Add New Contact </button>
                  <AddModal addContact={this.addContact} />
                </div>
                <div>
                  <input type="text" placeholder="Search..." onChange={this.search} />
                  <select id="searchIn" onChange={this.searchFilter}>
                    <option value="">All</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="tags">Tags</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone Number</option>
                  </select>
                </div>
                <table>
                    <tbody>
                        {contacts.length>0 ? contactsJsx : "No contacts found"}
                    </tbody>
                </table>
            </div>
        )
    }
}

class Contact extends Component {
    render(){
        return (
            <tr>
                <td><img src={this.props.details.picture ? this.props.details.picture : "https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg"} /> </td>
                <td>
                    <p>{this.props.details.firstName + " " + this.props.details.lastName}</p>
                    <p>{this.props.details.phone}</p>
                    <p>{this.props.details.email}</p>
                    <p><strong>Tags: </strong>{this.props.details.tags.join(", ")}</p>
                </td>
                <td>
                  <button onClick={()=>{this.props.deleteContact(this.props.details.id)}}>Delete Contact</button>
                  <button data-toggle="modal" data-target={"#edit"+this.props.details.id}>Edit Contact</button>
                  <EditModal details={this.props.details} editContact={this.props.editContact} />
                </td>
            </tr>
        )
    }
}

class AddModal extends Component {
  constructor(){
    super();
    this.state={
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
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
    this.props.addContact(this.state);
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
class EditModal extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName: this.props.details.firstName,
      lastName: this.props.details.lastName,
      phone: this.props.details.phone,
      email: this.props.details.email,
      tags: this.props.details.tags
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
    this.props.editContact(this.state, this.props.details.id);
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
                            value={this.state.firstName} />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text"  
                            name="lastName" 
                            value={this.state.lastName} />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            name="phone" 
                            value={this.state.phone}/>
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            name="email" 
                            value={this.state.email} />
                        </div>
                        <div className="form-group">
                            <input  
                            onChange={this.txtFieldChange}
                            className="form-control"
                            type="text" 
                            name="tags" 
                            value={this.state.tags.join(",")} />
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

export default App;
