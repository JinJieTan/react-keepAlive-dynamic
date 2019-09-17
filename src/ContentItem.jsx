import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { DynamicSizeList as List } from 'react-window';

class Row extends React.PureComponent {
  render() {
    const { index, style, data } = this.props;
    const {list} = data
    return <div style={style}>{list[index]}</div>;
  }
}


export default class ContentItem extends React.PureComponent {
  render() {
    const { list } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={1000}
            width={width}
            itemData={{list}}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    );
  }
}
