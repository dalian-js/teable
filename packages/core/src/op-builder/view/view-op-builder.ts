import type { IOtOperation } from '../../models/op';
import { AddViewBuilder } from './add-view';
import { SetViewNameBuilder } from './set-view-name';

export abstract class ViewOpBuilder {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  static editor = {
    setViewName: new SetViewNameBuilder(),
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  static creator = new AddViewBuilder();

  static ops2Contexts(ops: IOtOperation[]) {
    return ops.map((op) => {
      const result = this.detect(op);
      if (!result) {
        throw new Error(`can't detect op: ${JSON.stringify(op)}`);
      }
      return result;
    });
  }

  static detect(op: IOtOperation) {
    for (const builder of Object.values(this.editor)) {
      const result = builder.detect(op);
      if (result) {
        return result;
      }
    }
    return null;
  }
}
