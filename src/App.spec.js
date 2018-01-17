import test from "tape";
import { shallow } from "@vue/test-utils";
import App from "./App.vue";

test("App.vue renders", (assert) => {
  assert.plan(1);
  const wrapper = shallow(App);
  assert.equal(typeof wrapper, "string");
});
