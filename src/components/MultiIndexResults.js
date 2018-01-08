import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Template from './Template';

class MultiIndexResults extends React.Component {
  static propTypes = {
    cssClasses: PropTypes.shape({
      root: PropTypes.string,
      item: PropTypes.string,
      empty: PropTypes.string,
    }),
    derivedIndices: PropTypes.array,
    templateProps: PropTypes.object.isRequired,
  };

  renderNoResults({ label }) {
    const { cssClasses: { root, empty } } = this.props;
    const className = cx(root, empty);
    return (
      <div key={label}>
        <strong>{label}</strong>
        <Template
          rootProps={{ className }}
          templateKey="empty"
          {...this.props.templateProps}
        />
      </div>
    );
  }

  renderResults({ label, hits }) {
    const { cssClasses: { item } } = this.props;

    const hitsMarkup = hits.map((hit, position) => {
      const data = { ...hit, __hitIndex: position };
      return (
        <Template
          data={data}
          key={data.objectID}
          rootProps={{ className: item }}
          templateKey="item"
          {...this.props.templateProps}
        />
      );
    });

    return (
      <div key={label}>
        <strong>{label}</strong>
        <div>{hitsMarkup}</div>
      </div>
    );
  }

  render() {
    const { derivedIndices, cssClasses: { root } } = this.props;

    const markup = derivedIndices.map(
      ({ label, results }) =>
        results && results.hits && results.hits.length > 0
          ? this.renderResults({ label, hits: results.hits })
          : this.renderNoResults({ label })
    );

    return <div className={root}>{markup}</div>;
  }
}

export default MultiIndexResults;
