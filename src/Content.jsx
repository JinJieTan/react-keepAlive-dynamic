import React from 'react';
import ContentOne from './ContentOne';
import ContentTwo from './ContentTwo';

export default class Content extends React.PureComponent {
  render() {
    const { show, list1, list2 } = this.props;
    if (show === 'one') {
      return (
        <div className="wrap">
          <ContentOne list={list1}></ContentOne>
        </div>
      );
    } else if (show === 'two') {
      return (
        <div className="wrap">
          <ContentTwo list={list2}></ContentTwo>
        </div>
      );
    } else {
      return 'initstate';
    }
  }
}
