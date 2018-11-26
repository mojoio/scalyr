import { expect, tap } from '@pushrocks/tapbundle';
import * as scalyr from '../ts/index';

let testScalyr: scalyr.Scalyr;

tap.test('should create a valid instance of Scalyr', async () => {
  testScalyr = new scalyr.Scalyr();
})

tap.start();
