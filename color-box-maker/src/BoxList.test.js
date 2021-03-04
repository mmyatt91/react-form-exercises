import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import BoxList from "./BoxList";

function testBox(boxList, width="4", height="4", backgroundColor="black") {
    const widthInput = boxList.getByLabelText("Width");
    const heightInput = boxList.getByLabelText("Height")
    const bkgdColorInput = boxList.getByLabelText("Background Color")
    fireEvent.change(widthInput, { target: { value: width } });
    fireEvent.change(heightInput, { target: { value: height } });
    fireEvent.change(bkgdColorInput, { target: { value: backgroundColor } });
    const btn = boxList.getByText("Add New Box")
    fireEvent.click(btn);
}

it("renders without crashing", function() {
    render(<BoxList />)
});

it("matches snapshot", function() {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

it("should add new box", function() {
    const boxList = render(<BoxList />);

    // no boxes shown
    expect(boxList.queryByText("X")).not.toBeInTheDocument();

    testBox(boxList);

    //expect to see a box
    const remove = boxList.getByText("X");
    expect(remove).toBeInTheDocument();
    expect(remove.previousSibling).toHaveStyle(`
        width: 4em;
        height: 4em;
        background-color: black;
    `);

    //expect form to be empty
    expect(boxList.getAllByDisplayValue("")).toHaveLength(3);
});

it("should remove a box", function() {
    const boxList = render(<BoxList />);

    testBox(boxList);

    const remove = boxList.getByText("X");

    fireEvent.click(remove);
    expect(remove).not.toBeInTheDocument();
});