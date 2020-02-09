import React from "react";
import PropTypes from "prop-types";

const Footer = ({ year }) => {
  return (
    <footer className="footer">{year} - Copyright © Tommaso Campani</footer>
  );
};

Footer.propTypes = {
  year: PropTypes.number.isRequired
};

export default Footer;
