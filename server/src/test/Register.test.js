import React from "react";
import Register from "../../../client/src/pages/Register";
import { mount } from "enzyme";

describe("Register", () => {
    it("render sin problemas", () => {
        const email = "medicalgeek@gmail.com";
        const full_name = "sebastian";
        const password = "123456789";
        const usertype = 2;
        const specialization = "General";

        const wrapper = mount(<Register email={email} full_name={full_name} password={password} usertype={usertype} specialization={specialization} />);
        expect(wrapper).toMatchSnapshot();
    })
});