import React from 'react';
import ContentItem from './ContentItem';


export default class Content extends React.PureComponent {
  render() {
    const { show, list } = this.props;
    if (show === 'one') {
      return (
        <div className="wrap">
          <ContentItem list={list}></ContentItem>
        </div>
      );
    } else if (show === 'two') {
      return (
        <div className="wrap">
          <ContentItem list={list}></ContentItem>
        </div>
      );
    } else {
      return 'initstate';
    }
  }
}
