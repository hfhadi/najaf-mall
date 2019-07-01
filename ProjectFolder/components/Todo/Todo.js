import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
export default class Todo extends React.PureComponent {
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    render() {
        return (
          <TouchableHighlight style={{justifyContent:'center', alignItems:'center',}}
            onPress={() => this.toggleComplete()}
          >
              <View style={{ flex: 1, height: 50, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 8, alignItems:'center' }}>
                      <Text>{this.props.name}</Text>
                  </View>
                  <View style={{ flex: 4 }}>
                     
                          <Text>{this.props.id}</Text>
                     
                  </View>
                  <View style={{ flex: 4 }}>
                     
                          <Text>{this.props.complete}</Text>
                     
                  </View>
              </View>
          </TouchableHighlight>
        );
    }
}