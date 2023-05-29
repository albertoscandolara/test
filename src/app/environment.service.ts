import { Environment } from "../models/3D/environment/environment";
import { LoggerService } from "./logger.service";
import { environments } from "../config/environments";
import { changeEnvironmentEventEmitter } from "./event-emitter/events";

let instance: EnvironmentsService | undefined = undefined;

/**
 * Environments handler service
 */
export class EnvironmentsService {
  private _environments: Array<Environment> = [];
  private _logger!: LoggerService;

  /**
   * Constructor
   * @constructor
   * @ignore
   */
  constructor() {
    // singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this._logger = new LoggerService();
    this._setEnvironments();
  }

  /**
   * Set new current environment
   * @param {number} id id of the environment to set
   * @returns {void}
   */
  public setCurrentEnvironment(id: number): void {
    if (!this._environmentExists(id) || this._environmentIsAlreadySet(id)) {
      return;
    }
    const environmentToSet: Environment = this._getEnvironmentWithId(
      id
    ) as Environment;

    this._environments.forEach((environment: Environment) => {
      if (environment.id === environmentToSet.id) {
        environment.isActive = true;
      } else {
        environment.isActive = false;
      }
    });

    changeEnvironmentEventEmitter.emit();
  }

  /**
   * Based on environments current state, set AsWcLib config selected properties
   * @param {any} config AsWcLib component configuration
   * @returns {any} modified configuration
   */
  public selectCurrentEnvironmentAsWCLib(config: any): any {
    if (!config.attributes) {
      return config;
    }

    const keysAttribute: { [key: string]: string } = config.attributes.keys;
    if (keysAttribute) {
      const environmentIdProperty: string = "environmentId";
      if (keysAttribute.hasOwnProperty(environmentIdProperty)) {
        config.attributes.selected = false;
        const environmentId: string = keysAttribute[environmentIdProperty];
        if (+environmentId === this.getActiveEnvironment().id) {
          config.attributes.selected = true;
        }
      }
    }

    config.children.map((child: any) =>
      this.selectCurrentEnvironmentAsWCLib(child)
    );
    return config;
  }

  /**
   * Get currently active environment. If not set return default environment
   * @returns {Environment} currently active environment.
   */
  public getActiveEnvironment(): Environment {
    return (
      this._environments.find(
        (environment: Environment) => environment.isActive
      ) ?? this._getDefaultEnvironment()
    );
  }

  /**
   * Set available environments
   */
  private _setEnvironments(): void {
    if (this._checkForDuplicateIds()) {
      return;
    }
    this._environments = environments;
  }

  /**
   * Check if environments have unique ids
   * @returns {boolean} true if ids are unique, false otherwise
   */
  private _checkForDuplicateIds(): boolean {
    let parsedEnvironments: Set<number> = new Set();
    const hasDuplicates: boolean = environments.some((environment) => {
      return (
        parsedEnvironments.size === parsedEnvironments.add(environment._id).size
      );
    });

    if (hasDuplicates) {
      this._logger.error(
        `${this.constructor.name} - There are environments with duplicate ids`
      );
    }

    return hasDuplicates;
  }

  /**
   * Get default environment
   * @returns {Environment} default environment
   */
  private _getDefaultEnvironment(): Environment {
    const environment: Environment =
      this._environments.find(
        (environment: Environment) => environment.isDefault
      ) ?? this._environments[0];
    return environment;
  }

  /**
   * Check if environment with provided id actually exists
   * @param {number} id id to check
   * @returns {boolean} true if environment exists, false otherwise
   */
  private _environmentExists(id: number): boolean {
    const environmentExists: boolean = this._environments.some(
      (environment: Environment) => environment.id === id
    );
    if (!environmentExists) {
      this._logger.warn(
        `${this.constructor.name} - Environment with id ${id} does not exist.`
      );
    }
    return environmentExists;
  }

  /**
   * Check if environment with provided id already active
   * @param {number} id id to check
   * @returns {boolean} true if environment is already set as active, false otherwise
   */
  private _environmentIsAlreadySet(id: number): boolean {
    if (!this._environmentExists(id)) {
      return false;
    }
    const environmentIsAlreadySet: boolean =
      this.getActiveEnvironment().id === id;
    if (environmentIsAlreadySet) {
      this._logger.warn(
        `${this.constructor.name} - Environment with id ${id} is already active.`
      );
    }
    return environmentIsAlreadySet;
  }

  /**
   * Get environment with provided id
   * @param {number} id id to check
   * @returns {Environment | undefined} searched environment or undefined if not found
   */
  private _getEnvironmentWithId(id: number): Environment | undefined {
    if (!this._environmentExists(id)) {
      return;
    }
    const environment: Environment | undefined = this._environments.find(
      (environment: Environment) => environment.id === id
    );
    return environment;
  }
}
