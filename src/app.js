import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import _ from 'lodash';

const styles = StyleSheet.create({
  list: {
    display: 'block',
    margin: 0,
    padding: 0
  },
  item: {
    display: 'block',
    margin: '0 0 10px',
    padding: '1em',
    background: '#eee'
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [1,2,3]
    };
  }

  render() {
    return (
      <div>
        <ul className={css(styles.list)}>
        {this._resolveItems()}
        </ul>
      </div>
    );
  }

  _resolveItems() {
    return _.map(this.state.data, (d, i) => {
      return (
        <li key={i}
            draggable="true"
            onTouchStart={this._touchStartHdl.bind(this)}
            onDragStart={this._dragStartHdl.bind(this, i)}
            onDragEnter={this._dragOverHdl.bind(this, i)}
            className={css(styles.item)}>{d}</li>
      );
    });
  }

  _touchStartHdl(e) {
    e.preventDefault();
  }

  _dragStartHdl(i, e) {
    this.dragSourceIndex = i;
  }

  _dragOverHdl(i, e) {
    if(this.dragSourceIndex === undefined) return;
    if(this.dragSourceIndex === i) return;

    this.setState({
      data: swap(this.state.data, this.dragSourceIndex, i)
    });
  }
}

function swap(data, sourceIndex, targetIndex) {
  let result = [].concat(data);
  const source = result[sourceIndex];
  const target = result[targetIndex];
  result[sourceIndex] = target;
  result[targetIndex] = source;
  return result;
}

export default App;
