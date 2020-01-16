export const imageServerUrl = (id, view, color, size, backgroundColor) => {
    var backgroundColorParam = "";
    if (backgroundColor) {
        backgroundColorParam = ",backgroundColor=" + backgroundColor;
    }
    return "https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + id + "/views/" + view + ",width=" + size + ",height=" + size + ",appearanceId=" + color + backgroundColorParam + ".jpg";
}