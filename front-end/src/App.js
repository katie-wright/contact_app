import React, { Component } from 'react';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
        super();
        this.state = {
            contacts: [],
            search: "",
            searchFilter: "",
            sortBy: "",
            reverse: false,
            showFavourites: false
        }
        this.addContact=this.addContact.bind(this);
        this.deleteContact=this.deleteContact.bind(this);
        this.editContact=this.editContact.bind(this);
        this.reset=this.reset.bind(this);
        this.setStates=this.setStates.bind(this);
        this.sortBy=this.sortBy.bind(this);
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
    reset(){
      this.setState({
        search: "",
        searchFilter: "",
        sortBy: "",
        reverse: false,
        showFavourites: false
      });
      document.getElementById("sortBy").value = "";
    }
    setStates(e){
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    sortBy(e){
      let order = e.target.value.substring(0,2);
      let property = e.target.value.substring(2,e.target.value.length);
      this.setState({
        sortBy: property,
        reverse: order==="ZA"
      })
    }
    arraySort(arr, property){
      function compare(a,b) {
        if (a[property] < b[property])
          return -1;
        if (a[property] > b[property])
          return 1;
        return 0;
      }
      return this.state.reverse ? arr.sort(compare).reverse() : arr.sort(compare)
    }
    render() {
        let contacts=this.state.contacts;
        if (this.state.showFavourites) {
          contacts=contacts.filter(contact=>{
            return contact.favourite
          })
        }
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
        if (this.state.sortBy) {
          contacts=this.arraySort(contacts, this.state.sortBy);
        }
        let contactsJsx = contacts.map((contact,i)=>{
            return <Contact details={contact} deleteContact={this.deleteContact} editContact={this.editContact} key={i}/>
        })
        return (
            <div className="container" >
              <h1 className="text-center">My Contacts</h1>
              <div className="row">
                <button className="btn btn-primary pull-right" data-toggle="modal" data-target="#add">Add New Contact </button>
                <AddModal addContact={this.addContact} />
              </div>
              <div className="row form-inline">
                <input className="form-control" type="text" name="search" placeholder="Search..." onChange={this.setStates} value={this.state.search}/>
                <label for="searchFilter">in: </label>
                <select className="form-control" name="searchFilter" onChange={this.setStates} value={this.state.searchFilter} >
                  <option value="">All</option>
                  <option value="firstName">First Name</option>
                  <option value="lastName">Last Name</option>
                  <option value="tags">Tags</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone Number</option>
                </select>
              </div>
              <div className="row form-inline">
                <div className="pull-right">
                  <label for="sortBy">Sort By:</label>
                  <select className="form-control" name="sortBy" id="sortBy" onChange={this.sortBy}>
                    <option value="">None</option>
                    <option value="AZfirstName">First Name A-Z</option>
                    <option value="ZAfirstName">First Name Z-A</option>
                    <option value="AZlastName">Last Name A-Z</option>
                    <option value="ZAlastName">Last Name Z-A</option>
                  </select>
                </div>
              </div>
              <div className="row form-inline">
                <div className="pull-right">
                  <label for="filter">Show:</label>
                  <select className="form-control" name="showFavourites" onChange={this.setStates} value={this.state.showFavourites} >
                    <option value="">All</option>
                    <option value="true">Favourites</option>
                  </select>
                </div>
              </div>
              <div className="row form-inline">
                <div className="pull-right">
                  <button className="btn" onClick={this.reset}>Reset Filters</button>
                </div>
              </div>
              <br />
              <div className="row">
                {contacts.length>0 ? 
                <table className="table table-striped">
                    <tbody>
                        {contactsJsx}
                    </tbody>
                </table> 
                : "No contacts found"}
              </div>
            </div>
        )
    }
}

class Contact extends Component {
    render(){
        return (
            <tr>
                <td className="col-xs-3"><img className="contact-photo" src={this.props.details.picture ? this.props.details.picture : "https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg"} /> </td>
                <td className="col-xs-6">
                    <p><strong>Name: </strong>{this.props.details.firstName + " " + this.props.details.lastName}{this.props.details.favourite ? <i className="fa fa-star"/>:null}</p>
                    <p><strong>Phone: </strong>{this.props.details.phone}</p>
                    <p><strong>Email: </strong>{this.props.details.email}</p>
                    <p><strong>Tags: </strong>{this.props.details.tags ? this.props.details.tags.join(", "): null}</p>
                </td>
                <td className="col-xs-3">
                  <button className="btn btn-info" data-toggle="modal" data-target={"#edit"+this.props.details.id}>Edit</button>
                  <br />
                  <button className="btn btn-danger" onClick={()=>{this.props.deleteContact(this.props.details.id)}}>Delete</button>
                  <br />
                  <button className="btn btn-success" onClick={()=>{this.props.editContact({"favourite": !this.props.details.favourite}, this.props.details.id)}}>{this.props.details.favourite ? "Unfavourite" : "Favourite"}</button>
                  <EditModal details={this.props.details} editContact={this.props.editContact} />
                </td>
            </tr>
        )
    }
}

export default App;
