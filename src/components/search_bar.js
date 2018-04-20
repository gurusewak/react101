import React, { Component } from 'react';
import LDClient from 'ldclient-js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }

  componentDidMount() {
    const user = {
      key: 'gurusewak.kalra@logmein.com'
    };
    this.ldclient = LDClient.initialize('5ad91e0442755c2e1c1093cb', user);
    this.ldclient.on('ready', this.renderdarkly.bind(this));
    this.ldclient.on('change', this.renderdarkly.bind(this));
  }
  renderdarkly() {
    this.setState({ enableFeature: this.ldclient.variation('enable-auto-search') });
  }
  onInputChange(term) {
    this.setState({ term });
    this.props.onTermChange(term);

  }
  handleKeyPress(event) {
    console.log(this.state.enableFeature, 'enableFeature');
    if (event.key === 'Enter') {
      this.onInputChange(event.target.value)
    }
    if (this.state.enableFeature) {
      this.onInputChange(event.target.value)
    }
  }

  render() {
    return (
      <div className="search-bar">
        <input 
        onKeyPress={(event) => this.handleKeyPress(event)} 
        />
    </div>
    );
  }
}

export default SearchBar;