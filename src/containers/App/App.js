import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { setRestaurants } from '../../actions';
import Form from '../Form/Form';
import CardContainer from '../CardContainer/CardContainer';
import { Info } from '../Info/Info';
import background from '../../media/background.jpg';
import { fetchAll } from '../../fetchAll';

export class App extends Component {

  componentDidMount() {
    this.fetchRestaurants();
  }

  async fetchRestaurants() {
    const url = 'https://data.colorado.gov/resource/d5e8-gubm.json';
    let data = await fetchAll(url);
    this.gatherRestaurantNames(data);
  }

  gatherRestaurantNames = (data) => {
    const facilities = data.map(facility =>  facility.facilityname)
    const flatFacilities = [...new Set(facilities)];
    this.props.setRestaurants(flatFacilities);
  }

  render() {
    const backgroundStyle = { backgroundImage: 'url(' + background + ')' };
    return (
      <div className="App">
        <div style={backgroundStyle} className="background-image"></div>
        <div className="app-frame"></div>
        <div className="App-content">
          <Route exact path="/" component={Form} />
          <Route exact path="/locations" component={CardContainer} />
          <Route path='/locations/:id' render={({ match }) => {
            return ( <div>New Route!</div> ) }} 
          />
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setRestaurants: (restaurants) => dispatch(setRestaurants(restaurants)),
})

export default connect(null, mapDispatchToProps)(App);