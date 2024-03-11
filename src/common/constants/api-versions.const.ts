import config from "config";

const v1: any = process.env.v1 || config.get("api_versions.v1");
const base: any = process.env.base || config.get("api_versions.base");

const apiVersions = {
    BASE: base,
    V1: v1,
};

export default apiVersions;
