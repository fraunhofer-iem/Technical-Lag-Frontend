import {SxProps, Theme} from "@mui/material";

// Footer box style
export const footerBoxStyle = (isFooterOpen: boolean): SxProps<Theme> => ({
    bottom: 0,
    position: "fixed",
    height: isFooterOpen ? '2.5em' : '0',
    overflow: "hidden",
    transition: "height 0.5s ease-out",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    backgroundColor: (theme) => theme.palette.primary.main,
    color: (theme) => theme.palette.primary.contrastText,
    zIndex: 1500,
    width: "60vw",
    left: "50%",
    transform: "translateX(-50%)",
});

export const footerContainerStyle: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    margin: "0 auto",
};

export const rowStyle: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1%",
};

export const columnStyle: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
};

export const linkStyle = (isHovered: boolean, theme: Theme): SxProps<Theme> => ({
    margin: "auto",
    fontSize: "13px",
    fontWeight: 400,
    textDecoration: "none",
    transition: "color 250ms ease-in",
    color: isHovered ?
        theme.palette.getContrastText(theme.palette.primary.contrastText) :
        theme.palette.getContrastText(theme.palette.primary.dark),
});

export const copyrightStyle: SxProps<Theme> = {
    fontSize: "12px",
    fontWeight: 400,
};

