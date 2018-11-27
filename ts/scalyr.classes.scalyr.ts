import * as plugins from './scalyr.plugins';
import { ScalyrAggregator } from './scalyr.classes.aggregator';

export class Scalyr {
  public scalyrToken: string;
  public aggregator: ScalyrAggregator;

  constructor(scalyrTokenArg: string) {
    this.scalyrToken = scalyrTokenArg;
    this.aggregator = new ScalyrAggregator(this);
  }

  public get logDestination(): plugins.smartlogInterfaces.ILogDestination {
    return {
      handleLog: (logArg: plugins.smartlogInterfaces.ILogPackage) => {
        this.aggregator.addLogPackage(logArg);
      }
    };
  }
}
