import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children, className }) => {
  return (
    <section className={`section ${className || ''}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Section; 