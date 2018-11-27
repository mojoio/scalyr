import * as plugins from './scalyr.plugins';
import { Scalyr } from './scalyr.classes.scalyr';

export class ScalyrAggregator {
  private scalyrRef: Scalyr;
  public logUrl = 'https://www.scalyr.com/addEvents';

  constructor(scalyrInstanceRefArg: Scalyr) {
    this.scalyrRef = scalyrInstanceRefArg;
  }

  public async addLogPackage(logPackage: plugins.smartlogInterfaces.ILogPackage) {
    const requestBody = {
      token: this.scalyrRef.scalyrToken,
      session: 'test-session',
      sessionInfo: {
        serverHost: logPackage.context.containerName,
      },
      events: [
        {
          thread: '1',
          ts: (logPackage.timestamp * 1000000).toString(),
          type: 0,
          sev: 3,
          attrs: {
            message: logPackage.message,
            logEcosystem: 'smartlog',
            level: logPackage.level,
            context_company: logPackage.context.company,
            context_companyUnit: logPackage.context.companyunit,
            context_containerName: logPackage.context.containerName,
            context_environment: logPackage.context.environment,
            context_runtime: logPackage.context.runtime,
            context_zone: logPackage.context.zone
          }
        }
      ],
      threads: [
        { id: 1, name: 'request handler thread' },
        { id: 2, name: 'background processing thread' }
      ]
    };

    const response = await plugins.smartrequest.postJson(this.logUrl, {
      requestBody
    });
    if (response.body.status !== 'success') {
      const sendError = new Error(JSON.stringify(response.body));
      console.log(sendError);
    }
  }
}
