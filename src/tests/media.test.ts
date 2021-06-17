import 'jest';
require('jsdom-global')();
import { mount } from '@vue/test-utils';
import Media from '../components/media/Media.vue';
import { Result } from '@/utils/media_content';

const MOCK_RESULT = {} as Result;
MOCK_RESULT.artistName = 'Oasis';
MOCK_RESULT.artworkUrl100 =
  'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/f1/91/ef/f191effe-4cf2-932b-f2cf-a724454d2d49/source/100x100bb.jpg';
MOCK_RESULT.collectionName = "(What's the Story) Morning Glory?";
MOCK_RESULT.collectionViewUrl =
  'https://is2-ssl.mzstatic.com/image/thumb/Music113/v4/f1/91/ef/f191effe-4cf2-932b-f2cf-a724454d2d49/source/100x100bb.jpg';

describe('Mounted App', () => {
  const wrapper = mount(Media, {
    propsData: {
      result: MOCK_RESULT
    }
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders media component correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders the correct artist name', () => {
    expect(wrapper.html()).toContain(
      `<p class="artist">${MOCK_RESULT.artistName}</p>`
    );
  });

  it('renders the correct collection name', () => {
    expect(wrapper.html()).toContain(
      `<p class="collection-name">${MOCK_RESULT.collectionName}</p>`
    );
  });
});
