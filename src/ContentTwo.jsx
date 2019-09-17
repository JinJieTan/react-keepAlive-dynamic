import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { DynamicSizeList as List } from 'react-window';
import { Provider, KeepAlive } from 'react-component-keepalive';
class Row extends React.PureComponent {
  render() {
    const { index, style, data } = this.props;
    const { list } = data;
    return <div style={style}>{list[index]}</div>;
  }
}

export default class ContentItem extends React.PureComponent {
  render() {
    const { list } = this.props;
    return (
      <div style={{ height: 500 }}>
        <div>这是第二个哦</div>
        <Provider>
          <KeepAlive name="content1">
            <h2>被缓存的内容2</h2>
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />
            <img
              src="https://image-static.segmentfault.com/357/337/3573378947-5d5ab60933857"
              alt=""
            />

          </KeepAlive>
        </Provider>
        <span>虚拟列表2</span>
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemCount={1000}
              width={width}
              itemData={{ list }}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    );
  }
}
