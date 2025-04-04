import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import ChartCloseButton from "../../body/buttons/chart_sb_close_btn/ChartCloseButton"
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme();

describe("ChartCloseButton", () => {
    // Test for rendering the button and tooltip
    it("renders button with text and icon", () => {
        render(
            <ThemeProvider theme={theme}>
                <ChartCloseButton text="Close" action={() => {
                }} tooltip="Close chart"/>
            </ThemeProvider>
        );

        // Check if the button text and the icon are rendered correctly
        expect(screen.getByText("Close")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("InfoIcon")).toBeInTheDocument();
    });

    // Test tooltip visibility on hover
    it("shows tooltip on hover", async () => {
        render(
            <ThemeProvider theme={theme}>
                <ChartCloseButton text="Close" action={() => {
                }} tooltip="Close chart"/>
            </ThemeProvider>
        );

        // Find the button element
        const buttonElement = screen.getByRole("button");

        // Ensure tooltip is not visible initially
        expect(screen.queryByText("Close chart")).toBeNull();

        // Hover over the button to trigger the tooltip
        fireEvent.mouseEnter(buttonElement);

        // Ensure tooltip is visible after hover
        expect(await screen.findByText("Close chart")).toBeInTheDocument();

        // Hover out of the button and ensure tooltip disappears
        fireEvent.mouseLeave(buttonElement);
        // Use waitFor to asynchronously wait for the tooltip to disappear
        await waitFor(() => {
            expect(screen.queryByText("Close chart")).toBeNull();
        });
    });

    // Test if the button triggers the action on click
    it("calls the action when clicked", () => {
        const mockAction = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <ChartCloseButton text="Close" action={mockAction} tooltip="Close chart"/>
            </ThemeProvider>
        );

        // Click the button
        fireEvent.click(screen.getByRole("button"));

        // Ensure the mock action was called
        expect(mockAction).toHaveBeenCalledTimes(1);
    });
});
