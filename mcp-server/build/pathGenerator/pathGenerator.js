import { randomBytes } from "crypto";
const generatePath = () => {
    return randomBytes(6).toString("hex");
};
export default generatePath;
