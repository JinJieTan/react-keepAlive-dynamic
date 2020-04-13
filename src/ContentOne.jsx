import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { DynamicSizeList as List } from 'react-peter-window';
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
        <span>这是第一个哦</span>
        <Provider>
          <KeepAlive name="content1">
            <h2>被缓存的内容1</h2>
          </KeepAlive>
        </Provider>
        <span>虚拟列表1</span>
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemCount={100000}
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
