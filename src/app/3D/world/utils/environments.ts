import { Logger } from "../../../logger";
import { environments } from "../../../../config/environments";
import { Environment } from "../../../../models/3D/environment/environment";

let instance!: EnvironmentsUtils;

export class EnvironmentsUtils implements EnvironmentsUtils {
  #logger!: Logger;

  #environments!: Array<Environment>;

  /**
   * Constructor
   */
  constructor() {
    // singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this.#logger = new Logger();

    this.#environments = environments;
    this.checkForNoEnvironments();
  }

  /**
   * Check if there are configured environments
   */
  private checkForNoEnvironments(): void {
    if (!environments || environments.length === 0) {
      this.#logger.error("No environment available");
    }
  }

  /**
   * Retrieve default environment
   * @returns default environment
   */
  private getDefaultEnvironment(): Environment {
    const defaultEnvironments = this.#environments.filter((environment) =>
      environment.getIsDefault()
    );

    let defaultEnvironment!: Environment;
    if (defaultEnvironments.length === 0) {
      this.#logger.error(`No default environments found.`);
    } else {
      if (defaultEnvironments.length > 1) {
        this.#logger.warn(
          `More default environments found. Got the first one.`
        );
      }
      defaultEnvironment = defaultEnvironments[0];
    }

    return defaultEnvironment;
  }

  /**
   * Retrieve environment with provided name
   * @param name environment name
   * @returns environment
   */
  public getNamedEnvironment(name: string = ""): Environment {
    if (!name) return this.getDefaultEnvironment();

    let environment!: Environment;
    const environments = this.#environments.filter(
      (environment) => environment.getName() === name
    );

    if (environments.length === 0) {
      this.#logger.error(`No environments with name '${name}' found.`);
    } else {
      if (environments.length > 1) {
        this.#logger.warn(
          `More environments with name '${name}' found. Got the first one.`
        );
      }
      environment = environments[0];
    }

    return environment;
  }
}
