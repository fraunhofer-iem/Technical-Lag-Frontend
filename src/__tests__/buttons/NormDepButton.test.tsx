import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NormDepButton from "../../body/buttons/graph_buttons/NormDepButton";

const theme = createTheme();

describe("NormDepButton Component", () => {
    it("renders NormDepButton with text and icon", () => {
        render(
            <ThemeProvider theme={theme}>
                <NormDepButton text="Norm Dep" action={() => {}} tooltip="Add normal dependency" />
            </ThemeProvider>
        );

        expect(screen.getByText("Norm Dep")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
        render(
            <ThemeProvider theme={theme}>
                <NormDepButton text="Norm Dep" action={() => {}} tooltip="Add normal dependency" />
            </ThemeProvider>
        );

        const buttonElement = screen.getByRole("button");

        expect(screen.queryByText("Add normal dependency")).toBeNull();

        fireEvent.mouseEnter(buttonElement);
        expect(await screen.findByText("Add normal dependency")).toBeInTheDocument();

        fireEvent.mouseLeave(buttonElement);
        await waitFor(() => {
            expect(screen.queryByText("Add normal dependency")).toBeNull();
        });
    });

    it("calls action on click", () => {
        const mockAction = jest.fn();
        render(
            <ThemeProvider theme={theme}>
                <NormDepButton text="Norm Dep" action={mockAction} tooltip="Add normal dependency" />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole("button"));
        expect(mockAction).toHaveBeenCalledTimes(1);
    });
});
