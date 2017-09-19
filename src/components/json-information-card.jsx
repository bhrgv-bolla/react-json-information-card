import React from "react";
import { FormattedMessage } from "react-intl";

import styles from "../../src/styles/json-information-card.css";
import messages from "../lang/default-messages";

/**
 * From a data object and a configuration object renders the
 * information extracted from the JSON object.
 */
export default class JsonInformationCard extends React.Component {
  render() {
    return (
      <div className={styles.someStyle}>
        <FormattedMessage {...messages.editMe} />
      </div>
    );
  }
}

JsonInformationCard.displayName = "JsonInformationCard";

JsonInformationCard.propTypes = {};

JsonInformationCard.defaultProps = {};
