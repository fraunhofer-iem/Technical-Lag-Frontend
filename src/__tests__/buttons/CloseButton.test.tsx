import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import CloseButton from "../../body/buttons/update_window_buttons/CloseButton";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme();

describe("CloseButton", () => {
    it("renders button with text and icon", () => {
        render(
            <ThemeProvider theme={theme}>
                <CloseButton text="Close" action={() => {
                }} tooltip="Close window"/>
            </ThemeProvider>
        );

        expect(screen.getByText("Close")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
        render(
            <ThemeProvider theme={theme}>
                <CloseButton text="Close" action={() => {
                }} tooltip="Close window"/>
            </ThemeProvider>
        );

        const buttonElement = screen.getByRole("button");

        expect(screen.queryByText("Close window")).toBeNull();

        fireEvent.mouseEnter(buttonElement);
        expect(await screen.findByText("Close window")).toBeInTheDocument();

        fireEvent.mouseLeave(buttonElement);
        await waitFor(() => {
            expect(screen.queryByText("Close window")).toBeNull();
        });
    });

    it("calls the action when clicked", () => {
        const mockAction = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <CloseButton text="Close" action={mockAction} tooltip="Close window"/>
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole("button"));
        expect(mockAction).toHaveBeenCalledTimes(1);
    });
});
