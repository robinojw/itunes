import 'jest';
require('jsdom-global')();
import { mount } from '@vue/test-utils';
import Search from '../components/search/Search.vue';

const UPDATE_EVENT = 'update-resource';

describe('Mounted Search', () => {
  const wrapper = mount(Search);

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders search component correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('emits a update-resource event', async () => {
    wrapper.vm.$emit(UPDATE_EVENT);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted(UPDATE_EVENT)).toBeTruthy();
  });
});
