import { expect, tap } from '@pushrocks/tapbundle';
import * as scalyr from '../ts/index';

import { Qenv } from '@pushrocks/qenv';

const testQenv = new Qenv('./', './.nogit/');

let testScalyr: scalyr.Scalyr;

tap.test('should create a valid instance of Scalyr', async () => {
  testScalyr = new scalyr.Scalyr(testQenv.getEnvVarOnDemand('SCALYR_TOKEN'));
});

tap.test('should send a message', async () => {
  const logDestination = testScalyr.logDestination;
  logDestination.handleLog({
    context: {
      company: 'Lossless GmbH',
      companyunit: 'Lossless Cloud',
      containerName: 'shipzone_mojoio_scalyr',
      environment: 'test',
      runtime: 'node',
      zone: 'gitzone'
    },
    level: 'info',
    message: 'hi',
    timestamp: Date.now(),
    type: 'log'
  });
});

tap.start();
