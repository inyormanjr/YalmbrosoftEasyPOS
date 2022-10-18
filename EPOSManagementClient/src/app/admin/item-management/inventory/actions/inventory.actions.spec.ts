import * as fromInventory from './inventory.actions';

describe('loadInventorys', () => {
  it('should return an action', () => {
    expect(fromInventory.loadInventorys().type).toBe('[Inventory] Load Inventorys');
  });
});
