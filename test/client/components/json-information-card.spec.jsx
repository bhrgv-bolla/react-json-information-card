/**
 * Client tests
 */
import React from "react";
import { shallow } from "enzyme";

import JsonInformationCard from "src/components/json-information-card";

describe("components/json-information-card", () => {

  describe("Mounting", () => {

    it("should render into the document", () => {
      const component = shallow(<JsonInformationCard />);
      expect(component).to.not.be.null;
    });

  });

});
