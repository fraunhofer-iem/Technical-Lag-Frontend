import {fireEvent, render, screen} from "@testing-library/react";
import NewFileButton from "../../body/buttons/NewFileButton.tsx";
import {createTheme, ThemeProvider} from "@mui/material/styles";

describe("NewFileButton", () => {
    test("renders button with provided text", () => {
        render(
            <ThemeProvider theme={createTheme()}>
                <NewFileButton text="New File"/>
            </ThemeProvider>
        );

        expect(screen.getByText("New File")).toBeInTheDocument();
    });

    test("calls the action function when clicked", () => {
        const mockAction = jest.fn();

        render(
            <ThemeProvider theme={createTheme()}>
                <NewFileButton text="New File" action={mockAction}/>
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole("button", {name: /newfile/i}));

        expect(mockAction).toHaveBeenCalledTimes(1);
    });

    test("changes styles on hover", () => {
        render(
            <ThemeProvider theme={createTheme()}>
                <NewFileButton text="New File"/>
            </ThemeProvider>
        );

        const button = screen.getByRole("button", {name: /newfile/i});

        // Hover over the button
        fireEvent.mouseEnter(button);

        // Ensure the font weight becomes bold (as defined in hover state)
        expect(button).toHaveStyle("font-weight: bold");

        // Remove hover
        fireEvent.mouseLeave(button);

        // Ensure the font weight goes back to normal
        expect(button).toHaveStyle("font-weight: normal");
    });
});
