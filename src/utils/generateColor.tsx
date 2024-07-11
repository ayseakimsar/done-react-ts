import { columnColors } from "../columnColors";
import { labelColors } from "../labelColors";

export function generateColor(type: string) {
  const colorList = type === "column" ? columnColors : labelColors;
  const index = Math.floor(Math.random() * colorList.length);
  return colorList[index];
}
