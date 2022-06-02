import React, { Component } from 'react';
import { connect } from 'react-redux';

class Tag extends Component {
  getTagType(tag) {
    let arr = tag.split('_');
    return arr[0] ? arr[0] : '';
  }

  getTagValue(tag) {
    let tagType = this.getTagType(tag);
    if (tagType == 'tbcode') {
      return tag.replace(tagType + '_', '');
    }
    return this.props.tags[tag];
  }

  getClassTag(tag) {
    return `badge badge-tag badge-warning badge-pill mr-1 tag-type-${this.getTagType(
      tag,
    )}`;
  }

  render() {
    let exceptTypes = this.props.exceptTypes || [];
    return (
      this.props.label &&
      this.props.label.split(',').map((tag) => {
        if (exceptTypes.indexOf(this.getTagType(tag)) > -1) {
          return <></>;
        }
        return (
          <span key={tag} className={this.getClassTag(tag)}>
            {this.getTagValue(tag)}
          </span>
        );
      })
    );
  }
}

const mapStateToProps = (state) => ({
  tags: state.tags,
});

export default connect(mapStateToProps)(Tag);
