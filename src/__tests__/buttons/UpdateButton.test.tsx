import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UpdateButton from "../../body/buttons/graph_buttons/UpdateButton";

const theme = createTheme();

describe("UpdateButton Component", () => {
    it("renders UpdateButton with text and icon", () => {
        render(
            <ThemeProvider theme={theme}>
                <UpdateButton text="Update" action={() => {}} tooltip="Update dependencies" />
            </ThemeProvider>
        );

        expect(screen.getByText("Update")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
        render(
            <ThemeProvider theme={theme}>
                <UpdateButton text="Update" action={() => {}} tooltip="Update dependencies" />
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

    it("calls action on click", () => {
        const mockAction = jest.fn();
        render(
            <ThemeProvider theme={theme}>
                <UpdateButton text="Update" action={mockAction} tooltip="Update dependencies" />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole("button"));
        expect(mockAction).toHaveBeenCalledTimes(1);
    });
});
