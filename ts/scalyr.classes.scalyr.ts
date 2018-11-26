import * as plugins from './scalyr.plugins';

export class Scalyr {
  sendScalyrEvent() {}

  getLogDestination(): plugins.smartlogInterfaces.ILogDestination {
    return {
      handleLog: (logArg: plugins.smartlogInterfaces.ILogPackage) => {}
    };
  }
}
