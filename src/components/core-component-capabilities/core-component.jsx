import React from "react";

import PropTypes from "prop-types";

import RetryLogic from "./core-functions/retry-logic";
import ErrorLogic from "./core-functions/error-logic";
import StateManagement from "./core-functions/state-management";


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
      const a = {
        _managed_is_initialized : true,
        _managed_loading: false
      };
      const b = this.supports(StateManagement);
      const c = this.supports(RetryLogic);
      const d = this.supports(ErrorLogic);
      return {...a, ...b, ...c, ...d};
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
      throw new Error("call supportCoreFunctions from constructor " +
        " and add the keys to state");
    }
  }

  /**
   * Set the loading.
   * use in componentWillUpdate for a component to update.
   * @param isLoading
   */
  setLoading = (isLoading) => {
     this.doChecks();
     if(typeof isLoading == "boolean") {
       if(isLoading) {
         StateManagement(this).setStateAsLoading();
       } else {
         StateManagement(this).setStateAsSuccess();
       }
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
  renderParentInformation = () => {
     if(this.doesParentHasInformation()) {
       if(StateManagement(this).inErrorState()) {
         RetryLogic(this).retry();
       }
       return (<div>{this._getParentInformation()}</div>);
     } else {
       return (<div>Please check doesParentHasInformation() before rendering</div>);
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
  doesParentHasInformation = () => {
    this.doChecks();
    const stateManagement = StateManagement(this);
    return !stateManagement.inSuccessState() || stateManagement.inErrorState() || stateManagement.inLoadingState();
  }


  /**
   * Enables this component with the capability
   * @param capability
   */
  supports = (capability) => {
    this.capabilties.push(capability);
    return capability(this).enable();
  }

  /*
    Tracks all the capabilities
   */
  capabilties = [];


  /**
   * Notify success; will call setState
   * call with setTimeout to avoid
   */
  notifyOnSuccess = () => {
    StateManagement(this).setStateAsSuccess();
    RetryLogic(this).reset();
  }

  /**
   * This will call setState
   * call with setTimeout to avoid
   * @param errorText
   */
  notifyOnError = (errorText) => {
    if(!errorText) {
      const numRetries = RetryLogic(this).getNumRetries();
      errorText = `Error occured!! retried ${numRetries} times`;
    }
    ErrorLogic(this).recordError(errorText);
    StateManagement(this).setStateAsError();
  }

  /**
   * Return the parent information if any.
   * @private
   */
  _getParentInformation = () => {
    if(StateManagement(this).inErrorState()) {
      return ErrorLogic(this).getErrors();
    } else if(StateManagement(this).inLoadingState()) {
      return "Loading";
    } else if(StateManagement(this).inSuccessState()) {
      return "It seems the component shouldv'e rendered. You should not see this message";
    } else {
      return "Parent got no information";
    }
  }
}


CoreComponent.propTypes = {

};
