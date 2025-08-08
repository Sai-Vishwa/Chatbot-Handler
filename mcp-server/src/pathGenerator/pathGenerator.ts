import { randomBytes } from "crypto";

const generatePath = (): string => {
  return randomBytes(6).toString("hex"); 
};

export default generatePath;
