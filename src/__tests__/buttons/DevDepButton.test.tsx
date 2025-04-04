import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DevDepButton from "../../body/buttons/graph_buttons/DevDepButton";

const theme = createTheme();

describe("DevDepButton Component", () => {
    it("renders DevDepButton with text and icon", () => {
        render(
            <ThemeProvider theme={theme}>
                <DevDepButton text="Dev Dep" action={() => {}} tooltip="Add development dependency" />
            </ThemeProvider>
        );

        expect(screen.getByText("Dev Dep")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
        render(
            <ThemeProvider theme={theme}>
                <DevDepButton text="Dev Dep" action={() => {}} tooltip="Add development dependency" />
            </ThemeProvider>
        );

        const buttonElement = screen.getByRole("button");

        expect(screen.queryByText("Add development dependency")).toBeNull();

        fireEvent.mouseEnter(buttonElement);
        expect(await screen.findByText("Add development dependency")).toBeInTheDocument();

        fireEvent.mouseLeave(buttonElement);
        await waitFor(() => {
            expect(screen.queryByText("Add development dependency")).toBeNull();
        });
    });

    it("calls action on click", () => {
        const mockAction = jest.fn();
        render(
            <ThemeProvider theme={theme}>
                <DevDepButton text="Dev Dep" action={mockAction} tooltip="Add development dependency" />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole("button"));
        expect(mockAction).toHaveBeenCalledTimes(1);
    });
});
