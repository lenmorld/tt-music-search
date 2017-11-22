import React from 'react';
require('../style.scss');

class App extends React.Component {
  render() {
    return (
      <h2>Hello world - {this.props.name}</h2>
    );
  }
}

export default App;
