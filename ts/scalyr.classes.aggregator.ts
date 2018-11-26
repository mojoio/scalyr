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
        serverType: 'frontend',
        serverId: 'prod-front-2'
      },
      events: [
        {
          thread: '1',
          ts: (Date.now() * 1000000).toString(),
          type: 0,
          sev: 3,
          attrs: {
            message: 'record retrieved',
            recordId: 39217,
            latency: 19.4,
            length: 39207
          }
        }
      ],
      threads: [
        { id: 1, name: 'request handler thread' },
        { id: 2, name: 'background processing thread' }
      ]
    }

    console.log('sending the following request body:')
    console.log({...requestBody, token: 'not shown for security reasons using spread operator'});

    const response = await plugins.smartrequest.postJson(this.logUrl, {
      requestBody
    });
    console.log(response.body);
  }
}
