import 'jest';
import { mount } from '@vue/test-utils';
import Media from '../components/media/Media.vue';
import { Result } from '@/utils/media_content';

const MOCK_RESULT = {
  artistName: 'Oasis',
  artworkUrl100:
    'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/f1/91/ef/f191effe-4cf2-932b-f2cf-a724454d2d49/source/100x100bb.jpg',
  collectionName: "(What's the Story) Morning Glory?"
} as Result;

describe('Mounted Media Component', () => {
  const wrapper = mount(Media, {
    data() {
      return {
        result: MOCK_RESULT
      };
    }
  });
  expect(wrapper.element).toMatchSnapshot();
});
