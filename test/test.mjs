import { AppDrawer } from "../index.mjs";

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("Drawer Component", () => {
  describe("getDisabledStatus()", () => {
    it("returns disabled attribute", () => {
      const component = new AppDrawer();
      assert.equal(component.disabled, false);
    });
  });
});

describe("Drawer Component", () => {
  describe("getDisabledStatus()", () => {
    it("returns disabled attribute", () => {
      const component = new AppDrawer();
      component.disabled = true;
      assert.equal(component.disabled, true);
    });
  });
});
