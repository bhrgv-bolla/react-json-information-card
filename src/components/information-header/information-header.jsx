/**
 * Renders a information header with a default style. Styles could be overridden
 */
import React from "react";

import PropTypes from "prop-types";

import styles from "../../styles/information-header.css";

import CoreComponent from "../core-component-capabilities/core-component";


/**
 * An information header that will display the title.
 */
export default class InformationHeader extends CoreComponent {

  constructor(props) {
    super(props);
    this.state = {
      informationHeader : true
    };
  }

  componentWillMount() {
    this.supportCoreFunctions();
  }

  componentDidMount() {
    this.setLoading(false);
    console.log("check state", this.state);
  }

  render() {
    if(this.doesParentHasInformation()) {
      return this.renderInformation();
    }
    return (<div style={this.getStyle()} className={this.getClassName()}>
                {this.props.text}
            </div>);
  }



  /**
   * Configurable class names.
   * @returns {*}
   */
  getClassName = () => {
    const { optionalClassName } = this.props;
    return this.getOrDefault(optionalClassName, styles.information_header);
  }

  /**
   * Configurable styles.
   * @returns {*}
   */
  getStyle() {
    const { optionalStyle } = this.props;
    return this.getOrDefault(optionalStyle, {});
  }
}


/**
 * All custom props accepted by this component
 */
InformationHeader.propTypes = {
  text : PropTypes.string.isRequired,
  optionalStyle: PropTypes.object,
  optionalClassName: PropTypes.string
};

InformationHeader.defaultProps = {
  optionalStyle : {},
  optionalClassName : null
};
