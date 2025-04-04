import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import DependencyUpdateButton from "../../body/buttons/update_window_buttons/DependencyUpdateButton";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme();

describe("DependencyUpdateButton", () => {
    it("renders button with text and icon", () => {
        render(
            <ThemeProvider theme={theme}>
                <DependencyUpdateButton text="Update" action={() => {
                }} tooltip="Update dependencies"/>
            </ThemeProvider>
        );

        expect(screen.getByText("Update")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("DoubleArrowIcon")).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
        render(
            <ThemeProvider theme={theme}>
                <DependencyUpdateButton text="Update" action={() => {
                }} tooltip="Update dependencies"/>
            </ThemeProvider>
        );

        const buttonElement = screen.getByRole("button");

        expect(screen.queryByText("Update dependencies")).toBeNull();

        fireEvent.mouseEnter(buttonElement);
        expect(await screen.findByText("Update dependencies")).toBeInTheDocument();

        fireEvent.mouseLeave(buttonElement);
        await waitFor(() => {
            expect(screen.queryByText("Update dependencies")).toBeNull();
        });
    });

    it("calls the action when clicked", () => {
        const mockAction = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <DependencyUpdateButton text="Update" action={mockAction} tooltip="Update dependencies"/>
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole("button"));
        expect(mockAction).toHaveBeenCalledTimes(1);
    });
});
