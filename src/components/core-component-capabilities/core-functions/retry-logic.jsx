/*
 Adds support for retry logic.
 */
import Commons from "./commons";
import StateManagement from "./state-management";

const numRetriesKey = Commons.buildStateKey("numRetries");
const retriesSupportKey = Commons.buildStateKey("isRetriesSupportEnabled");
const maxRetries = 3;


const initializer = (componentRef) => {

  const enable = () => {
    console.log(componentRef);
    return initializeState();
  };

  const initializeState = () => {
    return {[numRetriesKey] : 0,
      [retriesSupportKey] : true};
  };

  const incrementRetries = () => {
    componentRef.setState({[numRetriesKey] : componentRef.state[numRetriesKey] + 1});
  };

  const reset = () => {
    componentRef.setState({[numRetriesKey] : 0});
  };

  const _retry = () => {
    //Increment the retries and actually retry.
    incrementRetries();
    if(componentRef.hasOwnProperty("handleRetry")) {
      componentRef.handleRetry();
    } else {
      console.warn(new Date(), "Consider defining a handleRetry function on your component." +
        "; Otherwise retrying is a no-op");
    }
  }

  const retry = () => {
    console.log(new Date(), "Asked to retry");
    if(getNumRetries() < maxRetries) {
      setTimeout(StateManagement(componentRef).setStateAsLoading, 0);
      setTimeout(_retry, 3000); //Time limit b/w retries.
    } else {
      console.log("Max retries already reached", getNumRetries());
      return;
    }
  }

  const getNumRetries = ()=> {
    return componentRef.state[numRetriesKey];
  }

  return {
    enable,
    retry,
    reset,
    getNumRetries
  };
};
export default initializer;
