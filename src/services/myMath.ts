function sfc32(a: number, b: number, c: number, d: number) {
    return function () {
        a >>>= 0;
        b >>>= 0;
        c >>>= 0;
        d >>>= 0;
        var t = (a + b) | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        d = d + 1 | 0;
        t = t + d | 0;
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}

const textEncoder = new TextEncoder()
const rndGenerator = sfc32(0, 1, 2, 3)

export function getSeededRandomFromStr(str: string): number {
    const number = textEncoder.encode(str).reduce((acc, val) => acc + val, 0)
    return rndGenerator() * number
}