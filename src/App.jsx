import React from 'react';
import Content from './Content';
import './index.less';
import { bindLifecycle } from 'react-component-keepalive';

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
    const { show } = this.state;
    const list = [];
    if (show === 'one') {
      for (let i = 0; i < 1000; i++) {
        list[i] = i + 'one';
      }
    } else if (show === 'two') {
      for (let i = 0; i < 1000; i++) {
        list[i] = i + 'two';
      }
    }else {
      for (let i = 0; i < 1000; i++) {
        list[i] ='null';
      }
    }
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
          <button onClick={()=>{}}>添加一条数据</button>
        </div>
        <div>
          <Content show={this.state.show} list={list}></Content>
        </div>
      </div>
    );
  }
}

export default bindLifecycle(App);
