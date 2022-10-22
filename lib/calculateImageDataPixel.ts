/**
 * @description: 计算具体canvas坐标对应的imageData内rgba坐标
 * @param {ImageData} imagedata
 * @param {number} x
 * @param {number} y
 * @return {*}
 */

export default function calculateImageDataPixel(imagedata:ImageData, x:number, y:number): number[] {
    const width = imagedata.width;
    const pixelRed = ((y - 1) * (width * 4)) + ((x - 1) * 4);
    const pixelGreen = pixelRed + 1;
    const pixelBlue = pixelRed + 2;
    const pixelAlpha = pixelRed + 3;
    return [pixelRed, pixelGreen, pixelBlue, pixelAlpha]
}