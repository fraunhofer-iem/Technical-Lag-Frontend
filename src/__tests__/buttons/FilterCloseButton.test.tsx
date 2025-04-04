import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import FilterCloseButton from "../../body/buttons/filter_sb_close_btn/FilterCloseButton";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme();

describe("FilterCloseButton", () => {
    it("renders button with text and icon", () => {
        render(
            <ThemeProvider theme={theme}>
                <FilterCloseButton text="Filter" action={() => {
                }} tooltip="Filter data"/>
            </ThemeProvider>
        );

        expect(screen.getByText("Filter")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("FilterListIcon")).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
        render(
            <ThemeProvider theme={theme}>
                <FilterCloseButton text="Filter" action={() => {
                }} tooltip="Filter data"/>
            </ThemeProvider>
        );

        const buttonElement = screen.getByRole("button");

        expect(screen.queryByText("Filter data")).toBeNull();

        fireEvent.mouseEnter(buttonElement);
        expect(await screen.findByText("Filter data")).toBeInTheDocument();

        fireEvent.mouseLeave(buttonElement);
        await waitFor(() => {
            expect(screen.queryByText("Filter data")).toBeNull();
        });
    });

    it("calls the action when clicked", () => {
        const mockAction = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <FilterCloseButton text="Filter" action={mockAction} tooltip="Filter data"/>
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole("button"));
        expect(mockAction).toHaveBeenCalledTimes(1);
    });
});
