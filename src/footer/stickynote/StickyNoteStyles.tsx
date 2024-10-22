import { SxProps, Theme } from "@mui/material";

// Styles for the sticky note container (fixed to bottom-middle)
export const stickyNoteContainerStyle = (isFooterOpen: boolean): SxProps<Theme> => ({
    position: "fixed",
    bottom: isFooterOpen ? '0vh' : '-2em',
    left: "50%",
    transform: "translateX(-50%)",
    transition: "bottom 0.3s ease-out",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
});

// Styles for the sticky note itself
export const stickyNoteStyle: SxProps<Theme> = (theme) => ({
    fontSize: "8px",
    borderRadius: "5px",
    width: "100px",
    height: "45px",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    cursor: "pointer",
    marginBottom: "1.2em",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
});
