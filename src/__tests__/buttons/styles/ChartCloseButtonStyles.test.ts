import {
    ChartCloseButtonStyles,
    chartContainerStyle
} from "../../../body/buttons/chart_sb_close_btn/ChartCloseButtonStyles.ts";

describe("chartContainerStyle function", () => {
    it("returns correct styles when the filter sidebar is open", () => {
        const styles = chartContainerStyle(true);
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

    it("returns correct styles when the filter sidebar is closed", () => {
        const styles = chartContainerStyle(false);
        expect(styles).toMatchObject({
            position: "fixed",
            right: "0px",
            top: "50px",
            transition: "right 0.3s ease-out",
            width: "auto",
            display: "flex",
            justifyContent: "center",
            zIndex: 1100,
        });
    });
});

describe("ChartCloseButtonStyles object", () => {
    it("defines correct styles for the chart button", () => {
        expect(ChartCloseButtonStyles.chartButton).toMatchObject({
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
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        });
    });
});
