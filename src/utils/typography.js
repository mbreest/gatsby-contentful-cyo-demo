import Typography from "typography"
const typography = new Typography({
    baseFontSize: "14px",
    baseLineHeight: 1.666,
    headerFontFamily: [
      "Roboto",
      "sans-serif",
    ],
    bodyFontFamily: ["Roboto", "sans-serif"],
}
)
export default typography
export const rhythm = typography.rhythm