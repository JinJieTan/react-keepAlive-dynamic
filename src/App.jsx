import React from 'react';
import Content from './Content';
import './index.less';

const list1 = [];
const list2 = [];
for (let i = 0; i < 1000; i++) {
  list1[i] = i + 'one';
  list2[i] = i + 'two';
}
class App extends React.PureComponent {
  state = {
    show: null
  };
  componentDidActivate() {
    console.log('componentDidActivateƒ');
  }
  componentDidActivate() {
    console.log('componentDidActivate');
  }

  render() {
    return (
      <div>
        <div>
          <button
            className="button"
            onClick={() => {
              this.setState({
                show: 'one'
              });
            }}
          >
            show one
          </button>
          <button
            className="button"
            onClick={() => {
              this.setState({
                show: 'two'
              });
            }}
          >
            show two
          </button>
        </div>
        <div>
          <Content show={this.state.show} list1={list1} list2={list2}></Content>
        </div>
      </div>
    );
  }
}

export default App;
