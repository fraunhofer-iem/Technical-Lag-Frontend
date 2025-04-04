import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RevertButton from "../../body/buttons/graph_buttons/RevertButton";

const theme = createTheme();

describe("RevertButton Component", () => {
    it("renders RevertButton with text and icon", () => {
        render(
            <ThemeProvider theme={theme}>
                <RevertButton text="Revert" action={() => {}} tooltip="Revert changes" />
            </ThemeProvider>
        );

        expect(screen.getByText("Revert")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
        render(
            <ThemeProvider theme={theme}>
                <RevertButton text="Revert" action={() => {}} tooltip="Revert changes" />
            </ThemeProvider>
        );

        const buttonElement = screen.getByRole("button");

        expect(screen.queryByText("Revert changes")).toBeNull();

        fireEvent.mouseEnter(buttonElement);
        expect(await screen.findByText("Revert changes")).toBeInTheDocument();

        fireEvent.mouseLeave(buttonElement);
        await waitFor(() => {
            expect(screen.queryByText("Revert changes")).toBeNull();
        });
    });

    it("calls action on click", () => {
        const mockAction = jest.fn();
        render(
            <ThemeProvider theme={theme}>
                <RevertButton text="Revert" action={mockAction} tooltip="Revert changes" />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole("button"));
        expect(mockAction).toHaveBeenCalledTimes(1);
    });
});
