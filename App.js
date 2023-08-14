/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, Button} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      message: 'Initial Message',
      count: 1,
    };
    this.bindedFunction = this.func.bind(this.obj1);
  }

  static getDerivedStateFromProps(props, state) {
    return (this.state = {
      message: 'Changed',
    });
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data =>
        this.setState({
          message: data.filter(item => {
            //using .filter method of array to filter out data as required
            console.log(
              ` Name: ${item.name}\n Email: ${item.email}\n Phone No.: ${item.phone}\n Company Name: ${item.company.name}\n`,
            );
          }),
        }),
      )
      .catch(err => console.log('Error Occured ' + err));
  }

  obj1 = {
    key1: 'value1',
  };

  func() {
    console.log(this);
  }

  //Commented because button will not work when we use shouldComponentUpdate
  //Please uncomment to check functionality

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.message !== nextProps.message) {
  //     return true;
  //   }
  //   if (this.state.count !== nextState.count) {
  //     return true;
  //   }
  //   console.log('inside shouldComponentUpdate');
  //   return false;
  // }

  componentDidUpdate() {
    console.log('Component did update');
  }

  componentWillUnmount() {
    console.log('Unmounted');
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello World!</Text>

        <Text>{this.state.message}</Text>

        {!this.state.isVisible && (
          <Text>Hello Appinventiv! {this.state.count}</Text>
        )}
        <Button
          title="Click me to display"
          onPress={() =>
            this.setState({
              isVisible: !this.state.isVisible && this.state.count++,
            })
          }
        />
        {this.bindedFunction()}
      </View>
    );
  }
}

export default App;
