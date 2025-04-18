// Utility function to format the title without breaking words
export const formatTitle = (text, firstLimit, secondLimit) => {
    if (text.length <= firstLimit) return [text, ""];

    const words = text.split(" ");
    let firstLine = "";
    let secondLine = "";

    for (let word of words) {
        if ((firstLine + word).length <= firstLimit) {
            firstLine += (firstLine ? " " : "") + word;
        } else if ((secondLine + word).length <= secondLimit) {
            secondLine += (secondLine ? " " : "") + word;
        } else {
            secondLine += "...";
            break;
        }
    }

    return [firstLine, secondLine];
};
