export const getRandomColor = function () {
    // Generate random values for red, green, and blue
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
};