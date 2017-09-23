/*
 Adds support for retry logic.
 */
import Commons from "./commons";

const STATE_MANAGEMENT_KEY = Commons.buildStateKey("isStateManagementEnabled");

/*
  State keys.
 */

const LOADING_STATE = Commons.buildStateKey("loading");
const ERROR_STATE = Commons.buildStateKey("error");

const initializer = (componentRef) => {

  const enable = () => {
    console.log(componentRef);
    return initializeState();
  };

  const initializeState = () => {
    return {
              [STATE_MANAGEMENT_KEY] : true,
              [LOADING_STATE] : false,
              [ERROR_STATE] : false
              };
  };

  const setStateAsError = () => {
    componentRef.setState({
      [LOADING_STATE] : false,
      [ERROR_STATE] : true
    });
  };

  const setStateAsLoading = () => {
    componentRef.setState({
      [LOADING_STATE] : true,
      [ERROR_STATE] : false
    });
  };

  const inErrorState = () => componentRef.state[ERROR_STATE];

  const inLoadingState = () => componentRef.state[LOADING_STATE];

  const inSuccessState = () => !(componentRef.state[ERROR_STATE] || componentRef.state[LOADING_STATE]);

  const setStateAsSuccess = () => componentRef.setState(initializeState());



  return {
    enable,
    setStateAsError,
    setStateAsLoading,
    setStateAsSuccess,
    inErrorState,
    inLoadingState,
    inSuccessState
  };
};
export default initializer;
