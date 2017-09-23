/*
 Adds support for retry logic.
 */
import Commons from "./commons";

import StateManagement from "./state-management";

const allErrorsKey = Commons.buildStateKey("errorsList");


const initializer = (componentRef) => {

  const enable = () => {
    console.log(componentRef);
    return initializeState();
  };

  const initializeState = () => {
    return {[allErrorsKey] : []};
  };

  const recordError = (error) => {
    if(typeof error === "string") {
      const errors = [];
      errors.push(error);
      componentRef.setState({[allErrorsKey] : errors});
    } else { //TODO Any react component can be added to error list
      throw new Error("Only strings can be set");
    }
  };

  const getErrors = () => {
    return componentRef.state[allErrorsKey];
  };

  return {
    enable,
    recordError,
    getErrors
  };
};
export default initializer;
