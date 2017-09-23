import React from "react";

import PropTypes from "prop-types";

import {style} from "typestyle";

import objectPath from "object-path";

import {Grid, Row, Col} from "react-flexbox-grid";

import ContainerDimensions from "react-container-dimensions";
import InformationHeader from "../information-header/";

/**
 * Given a Json and a path configuration this component will render a nice view
 * of information
 * TODO sections can be minimized.
 * TODO externalize classes.
 */
export default class JsonInformationCard extends React.Component {


  render() {
    const {pathConfiguration, jsonObject} = this.props;

    const title = pathConfiguration.Title;

    return (<ContainerDimensions>
      {(containerProps) => (
              <div className={jsonInformationCardStyle}>
                <InformationHeader text={title}/>
                {this.renderInformation(pathConfiguration, jsonObject, containerProps)}
              </div>
            )}
            </ContainerDimensions>);
  }

  /**
   * Render the information
   * @param pathConfiguration
   * @param jsonObject
   * @param containerProps
   * @returns {XML}
   */
  renderInformation(pathConfiguration, jsonObject, containerProps) {
    console.log("Container props", containerProps);
    const calculatedSlots = this.getCalculatedSlots(containerProps.width);

    const renderedSections = this.renderSectionGroups(jsonObject, pathConfiguration.SectionsGrouping, calculatedSlots);

    return (<div className={width100}>
      <div>{renderedSections}</div>
    </div>);
  }

  /**
   * Responsive based on the space it was rendered on the screen.
   * This will help initial render only.
   * @param width
   * @returns {{}}
   */
  getCalculatedSlots(width) {
    if(width > 1200) {// consider it large
      return this.getBreakpointsForColumns(6);
    } else if(width > 900) { //tablet mode
      return this.getBreakpointsForColumns(6);
    } else if(width > 600) { //mobile mode
      return this.getBreakpointsForColumns(5);
    } else if(width > 300) { //mobile mode
      return this.getBreakpointsForColumns(3);
    } else { //tablet mode
      return this.getBreakpointsForColumns(1);
    }
  }

  /**
   * Return the value of that element. Always stringifies the elements value.
   * @param jsonObject
   * @param pathToElement
   * @param type
   * @returns {string}
   */
  getValue(jsonObject, pathToElement, type = "none-provided") {
    const value = objectPath.get(jsonObject, pathToElement, "No Value");
    if(typeof value == "string"){
      return value;
    } else {
      return JSON.stringify(value);
    }
  }

  /**
   * Render sections groups, groups properties by sections.
   * TODO improve on grouping.
   * @param jsonObject
   * @param sectionsGrouping
   * @param calculatedSlots
   * @return {XML}
   */
  renderSectionGroups(jsonObject, sectionsGrouping, calculatedSlots) {
    const sections = Object.keys(sectionsGrouping);
    const sectionDisplayMap = {};
    for(let index in sections) {// Augement with a string value in the Field Value.
      // Array of properties for that section
      const sectionName = sections[index];
      const sectionValues = sectionsGrouping[sectionName];
      sectionDisplayMap[sectionName] = this.getDisplayValuesForSection(jsonObject, sectionValues);
    }

    console.log(sections, sectionDisplayMap);

    return (<Grid fluid className={sectionsGridStyle}>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          {sections
            .map(section => (
                <Row key={section}>
                  <Col lg={12} md={12} sm={12} xs={12} className={sectionStyle}>{section}</Col>
                  {sectionDisplayMap[section].map(property => (
                      <Col className={propertyColumnStyle}
                           key={property.PropertyDisplayName}
                           lg={calculatedSlots.lg} md={calculatedSlots.md}
                           sm={calculatedSlots.sm} xs={calculatedSlots.xs}>
                        <Row className={rowPropertyStyle}>
                          {/*<Col>*/}
                            <span className={propertyKeyStyle}>
                              {property.PropertyDisplayName}
                            </span>
                          {/*</Col>*/}
                        </Row>
                        <Row className={rowPropertyStyle}>
                          {/*<Col>*/}
                            {property.Value}
                          {/*</Col>*/}
                        </Row>
                      </Col>
                  ))}
                </Row>
            ))}
        </Col>
      </Row>
    </Grid>);
  }

  /**
   * Returns an array of values that the section needs to display
   * EG: section is
   * [{
        "PropertyDisplayName": "Event UUID",
        "PathToElement": "trackingUUIDs.CoordinatorTrackingUUID",
        "OptionalType": "String"
      }]
   * @param jsonObject
   * @param section -- Array of values that comes under this section
   * @returns {Array}
   */
  getDisplayValuesForSection(jsonObject, section) {
    const displayValues = [];
    for(let propertyIndex in section) {
      const property = section[propertyIndex];
      displayValues.push({
                          Value : this.getValue(jsonObject, property.PathToElement),
                          ...property
                          });
    }
    return displayValues;
  }

  /**
   * Returns breakpoints based on num columns
   * Render based on the width allocated on the screen
   * @param number
   * @returns {{lg: number, md: number, sm: number, xs: number}}
   */
  getBreakpointsForColumns(numColumns) {
    const totalColumns = 12;
    const size = Math.floor(totalColumns/numColumns);
    return {lg: size, md: size, sm: size, xs: size};
  }
}

/**
 * All proptypes needed for this component
 * TODO custom validation once both props evolves
 */
JsonInformationCard.propTypes = {
  pathConfiguration: PropTypes.object.isRequired,
  jsonObject: PropTypes.object.isRequired
};


/*
 Component specific styles.
 */
const jsonInformationCardStyle = style({
  "max-width": "100% !important",
  "overflow-wrap": "break-word",
  "word-break": "break-all"
});

const sectionStyle = style({
  "margin": "7px 0px !important",
  "color": "black",
  "font-weight" : "bold",
  "text-transform": "uppercase",
  "text-align" : "left",
  "text-decoration": "underline",
  "padding-left" : "0px !important",
  "display" : "block"
});
const rowPropertyStyle = style({
  "text-align" : "center",
  "display" : "block",
  "margin-bottom": "2px",
  "overflow-wrap": "break-word",
  "max-width": "100% !important"
});

const width100 = style({
  "max-width": "100% !important"
});

const propertyKeyStyle = style({
  "font-weight" : "bold !important"
});

const sectionsGridStyle = style({
  "margin-bottom" : "10px !important"
});

const propertyColumnStyle = style({
  "margin-top": "3px",
  "margin-bottom": "3px"
});

/*
  End component specific styles.
 */


