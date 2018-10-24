import React, { createContext } from 'react';

const ContextAPI = createContext({ token: '' });

class Provider extends React.Component {
  render() {
    return (
      <ContextAPI.Provider>
        {this.props.children}
      </ContextAPI.Provider>
    )
  }
}

export default Provider;
