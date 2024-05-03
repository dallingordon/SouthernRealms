type Env = "dev" | "prod";

export default class EnvUtil {
  public static getEnv(): Env {
    return window.location.hostname === "localhost" ? "dev" : "prod";
  }
}
