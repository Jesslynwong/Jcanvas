// 返回imageData对应坐标像素
export default function calculateImageDataPixel(imagedata:ImageData, x:number, y:number): number[] {
    const width = imagedata.width;
    const pixelRed = ((y - 1) * (width * 4)) + ((x - 1) * 4);
    const pixelGreen = pixelRed + 1;
    const pixelBlue = pixelRed + 2;
    const pixelAlpha = pixelRed + 3;
    return [pixelRed, pixelGreen, pixelBlue, pixelAlpha]
}