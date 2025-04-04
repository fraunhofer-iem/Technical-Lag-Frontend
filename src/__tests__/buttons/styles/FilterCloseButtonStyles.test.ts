import {
    FilterCloseButtonStyles,
    filterContainerStyle
} from "../../../body/buttons/filter_sb_close_btn/FilterCloseButtonStyles";

describe("FilterCloseButtonStyles", () => {
    test("should define filterButton styles correctly", () => {
        expect(FilterCloseButtonStyles).toHaveProperty("filterButton");
        expect(FilterCloseButtonStyles.filterButton).toMatchObject({
            padding: "10px 20px",
            top: "10px",
            border: "none",
            right: "0px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "8px",
            borderTopLeftRadius: "8px",
            display: "flex",
            fontSize: "1rem",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            boxShadow: expect.stringMatching(/rgba\(0, 0, 0, 0.1\)/), // Check if boxShadow contains expected color
        });
    });
});

describe("filterContainerStyle function", () => {
    test("should return correct styles when sidebar is open", () => {
        const styles = filterContainerStyle(true);
        expect(styles).toMatchObject({
            position: "fixed",
            right: "460px",
            top: "50px",
            transition: "right 0.3s ease-out",
            width: "auto",
            display: "flex",
            justifyContent: "center",
            zIndex: 1100,
        });
    });

    test("should return correct styles when sidebar is closed", () => {
        const styles = filterContainerStyle(false);
        expect(styles).toMatchObject({
            right: "0px",
        });
    });
});
