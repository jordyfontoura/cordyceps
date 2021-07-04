import { interpolar } from "./math";

export class Color extends Array {
  constructor(r: number, g: number, b: number, a = 255) {
    super();
    this.push(r, g, b, a);
  }
  get r() {
    return this[0];
  }
  set r(value) {
    this[0] = value;
  }
  get g() {
    return this[1];
  }
  set g(value) {
    this[1] = value;
  }
  get b() {
    return this[2];
  }
  set b(value) {
    this[2] = value;
  }
  get a() {
    return this[3];
  }
  set a(value) {
    this[3] = value;
  }
  get hue() {
    let R = this.r / 255;
    let G = this.g / 255;
    let B = this.b / 255;
    let max = Math.max(R, G, B),
      min = Math.min(R, G, B);
    let res = 0;
    if (R === max) {
      res = (G - B) / (max - min);
    } else if (G === max) {
      res = 2.0 + (B - R) / (max - min);
    } else {
      res = 4.0 + (R - G) / (max - min);
    }
    if (isNaN(res)) {
      return 0;
    }
    return ((res < 0 ? 360 : 0) + res * 60) / 360;
  }
  set hue(value) {
    let hsv = this.toHsv();
    hsv[0] = value;
    let newColor = Color.fromHsv(hsv[0], hsv[1], hsv[2]);
    for (let i = 0; i < this.length; i++) this[i] = newColor[i];
  }
  get saturationV() {
    let v = Math.max(this.r / 255, this.g / 255, this.b / 255),
      c = v - Math.min(this.r / 255, this.g / 255, this.b / 255);
    return v && c / v;
  }
  set saturationV(value) {
    let hsv = this.toHsv();
    hsv[1] = value;
    let newColor = Color.fromHsv(hsv[0], hsv[1], hsv[2]);
    for (let i = 0; i < this.length; i++) this[i] = newColor[i];
  }
  get saturationL() {
    let v = Math.max(this.r / 255, this.g / 255, this.b / 255),
      c = v - Math.min(this.r / 255, this.g / 255, this.b / 255),
      l = v - c / 2;
    return l === 0 || l === 1 ? 0 : (2 * (v - l)) / (1 - Math.abs(2 * l - 1));
  }
  set saturationL(value) {
    let hsl = this.toHsl();
    hsl[1] = value;
    let newColor = Color.fromHsv(hsl[0], hsl[1], hsl[2]);
    for (let i = 0; i < this.length; i++) this[i] = newColor[i];
  }
  get lightness() {
    return (
      (Math.max(this.r / 255, this.g / 255, this.b / 255) +
        Math.min(this.r / 255, this.g / 255, this.b / 255)) /
      2
    );
  }
  set lightness(value) {
    let hsl = this.toHsl();
    hsl[2] = value;
    let newColor = Color.fromHsv(hsl[0], hsl[1], hsl[2]);
    for (let i = 0; i < this.length; i++) this[i] = newColor[i];
  }
  get value() {
    return Math.max(this.r / 255, this.g / 255, this.b / 255);
  }
  set value(value) {
    let hsv = this.toHsv();
    hsv[2] = value;
    let newColor = Color.fromHsv(hsv[0], hsv[1], hsv[2]);
    for (let i = 0; i < this.length; i++) this[i] = newColor[i];
  }
  toHsv(passAlpha = false) {
    if (passAlpha) return [this.hue, this.saturationV, this.value, this.a];
    return [this.hue, this.saturationV, this.value];
  }
  toHsl(passAlpha = false) {
    if (passAlpha) return [this.hue, this.saturationL, this.lightness, this.a];
    return [this.hue, this.saturationL, this.lightness];
  }

  toCmyk(passAlpha = false) {
    let c = 1 - this.r / 255;
    let m = 1 - this.g / 255;
    let y = 1 - this.b / 255;
    let k = Math.min(c, Math.min(m, y));

    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);

    c = isNaN(c) ? 0 : c;
    m = isNaN(m) ? 0 : m;
    y = isNaN(y) ? 0 : y;
    k = isNaN(k) ? 0 : k;

    if (passAlpha) return [c, m, y, k, this.a];
    return [c, m, y, k];
  }
  toHex(passAlpha = false) {
    function componentToHex(c: number) {
      let hex = Math.round(c).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }
    return (
      "#" +
      componentToHex(this.r) +
      componentToHex(this.g) +
      componentToHex(this.b) +
      (passAlpha ? componentToHex(this.a) : "")
    );
  }

  static Lerp(delta: number, inicio: any, fim: any, ...args: any[]):Color|Color[] {
    let res = interpolar(delta, inicio, fim, ...args) as any[];
    if (res.length !== undefined) {
      let cores = [];
      for (let i = 0; i < res.length; i++) {
        cores.push(new Color(res[i][0], res[i][1], res[i][2], res[i][3]));
      }
      return cores;
    }
    return new Color(res[0], res[1], res[2], res[3]);
  }
  static fromCMYK(c: number, m: number, y: number, k: number) {
    c = c * (1 - k) + k;
    m = m * (1 - k) + k;
    y = y * (1 - k) + k;

    let r = 1 - c;
    let g = 1 - m;
    let b = 1 - y;

    return [r * 255, g * 255, b * 255];
  }
  static fromHsv(h: number, s: number, v: number) {
    let r = 0,
      g = 0,
      b = 0;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }

    return new Color(r * 255, g * 255, b * 255);
  }
  static fromHsl(h: number, s: number, l: number) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return new Color(r * 255, g * 255, b * 255);
  }
  static fromHex(hex: string) {
    let res = [];
    let hexCode = hex.substring(1);
    if (hexCode.length === 3) {
      for (let i = 0; i < 3; i++) {
        res.push(parseInt(hexCode[0], 16));
      }
    } else if (hexCode.length === 6) {
      for (let i = 0; i < 6; i += 2) {
        res.push(parseInt(hexCode.substring(i, i + 2), 16));
      }
    } else if (hexCode.length === 8) {
      for (let i = 0; i < 8; i += 2) {
        res.push(parseInt(hexCode.substring(i, i + 2), 16));
      }
    }
    return res;
  }
  static random(randomAlpha = false) {
    return new Color(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
      randomAlpha ? Math.random() * 255 : 255
    );
  }
}
function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
