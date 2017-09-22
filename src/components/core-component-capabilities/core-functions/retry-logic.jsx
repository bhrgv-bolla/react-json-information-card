/*
 Adds support for retry logic.
 */
import {buildStateKey} from "./constants";

const numRetriesKey = buildStateKey("numRetries");
const retriesSupportKey = buildStateKey("isRetriesSupportEnabled");

const enable = (thisArg) => {
  console.log(thisArg);
  initializeState(thisArg);
};

//TODO check if thisArg can be avoided
// ( Read this:https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/ )
const initializeState = (thisArg) => {
  thisArg.setState({[numRetriesKey] : 0,
                [retriesSupportKey] : true}
              );
};


export default { enable };
