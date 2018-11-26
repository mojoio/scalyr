import { expect, tap } from '@pushrocks/tapbundle';
import * as scalyr from '../ts/index'

tap.test('first test', async () => {
  console.log(scalyr.standardExport)
})

tap.start()
