import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import App from "../../App";

// Helper to render App with a given initial path
const renderWithPath = (path: string) => {
    render(
        <MemoryRouter initialEntries={[path]}>
            <App/>
        </MemoryRouter>
    );
};

describe("App routing and layout", () => {
    it("renders the welcome page on '/'", () => {
        renderWithPath("/");
    });

    it("renders the chart page on '/normal-dependencies-chart'", () => {
        renderWithPath("/normal-dependencies-chart");
    });

    it("renders the ToS page on '/terms-of-service'", () => {
        renderWithPath("/terms-of-service");
    });

    it("renders the privacy policy page on '/privacy-policy'", () => {
        renderWithPath("/privacy-policy");
    });

    it("always renders the app bar", () => {
        renderWithPath("/");
    });

    it("always renders the cookie consent", () => {
        renderWithPath("/");
    });

    it("always renders StickyNoteComponent", () => {
        renderWithPath("/");
    });
});
