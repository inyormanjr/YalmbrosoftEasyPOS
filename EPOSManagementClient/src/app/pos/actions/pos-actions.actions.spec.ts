import * as fromPosActions from './pos-actions.actions';

describe('loadPosActionss', () => {
  it('should return an action', () => {
    expect(fromPosActions.loadPosActionss().type).toBe('[PosActions] Load PosActionss');
  });
});
