import React from "react";

import PropTypes from "prop-types";

import RetryLogic from "./core-functions/retry-logic";


/**
 * Root Component to some core / common functions to
 * a react component.
 *
 * 1. Retry capabilities.
 * 2. Error handling <=> Error display.
 * 3. User decides what to use what not to use.
 *
 */
export default class CoreComponent extends React.Component {

   constructor(props) {
     super(props);
   }


  /**
   * Call this function in the componentWillMount of the child component.
   */
  supportCoreFunctions = () => {
      this.setState({
        _managed_is_initialized : true,
        _managed_error: false,
        _managed_loading: false,
        _managed_error_text: null
      });

      this.supports(RetryLogic);
  }



  /**
   * Are the core functions supported.
   * @returns {boolean}
   */
  isInitialized = () => {
    return !!this.state._managed_is_initialized;
  }

  /**
   * Wrap all the checks before calling a function.
   */
  doChecks = () => {
    if(!this.isInitialized()) {
      throw new Error("you need to call supportCoreFunctions from componentWillUpdate" +
        "to use the capabilities");
    }
  }

  /**
   * Set the loading to true.
   * @param isLoading
   */
  setLoading = (isLoading) => {
     this.doChecks();
     if(typeof isLoading == "boolean") {
       this.setState({_managed_loading: isLoading});
     } else {
       throw new Error("setLoading needs to be called with boolean argument");
     }
   }


   render() {
     return (<div>{`props is : ${JSON.stringify(this.props)}
                    state is : ${JSON.stringify(this.state)}`}</div>);
   }


  /**
   * The child needs to check whether there is something the
   * parent component would render.
   * Child needs to check doesParentHasInformation.
   * @returns {*}
   */
  renderInformation = () => {
     if(this.doesParentHasInformation()) {
       return (<div>Render Core Components information</div>);
     } else {
       return null;
     }
   }

  /**
   * Implements a simple getOrDefault.
   * @returns {*}
   */
  getOrDefault = (getThis, ifNotGetThis) => {
    console.log(getThis, ifNotGetThis);
    if(!!getThis) {
      return getThis;
    } else {
      return ifNotGetThis;
    }
  }


  /**
   * Should the child component render or the core component
   * has something to say to the user.
   * @returns {boolean}
   */
  doesParentHasInformation() { //TODO implement
    this.doChecks();
    return true;
  }


  /**
   * Enables this component with the functionality
   * @param functionality
   */
  supports = (functionality) => {
    functionality.enable(this);
  }
}


CoreComponent.propTypes = {

};
