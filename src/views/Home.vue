<template>
  <div class="home">
    <template v-if="loading">
      <div class="error">
        <p class="message">
          Loading...
        </p>
        <p>
          Search for results with the parameters mediatype/query i.e
          <a href="/album/oasis">album/oasis</a>
        </p>
      </div>
    </template>
    <template v-else>
      <div class="title-bar">
        <h2 class="main-title">eyeTunes</h2>
        <Search v-on:update-resource="updateResource" />
      </div>
      <div class="media-list">
        <Media
          v-for="media in results"
          :result="media"
          :key="media.collectionUrl"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { getMedia } from '@/services/api';
import Media from '@/components/media/Media.vue';
import Search from '@/components/search/Search.vue';
import './home.scss';
import { MediaContent, Result } from '@/utils/media_content';
import { Vue } from 'vue-property-decorator';

export default Vue.extend({
  props: {
    media: { type: String },
    query: { type: String }
  },
  data() {
    return {
      loading: true,
      results: [] as Result[],
      resource: {} as MediaContent,
      updateResource: (media: string, query: string): void =>
        (this as any).updateData(media, query)
    };
  },
  async created() {
    this.updateData(this.media, this.query);
  },
  components: {
    Media,
    Search
  },
  methods: {
    async updateData(media: string, query: string): Promise<void> {
      this.loading = true;
      this.resource = await getMedia(media, query);
      this.results = removeDuplicates(this.resource.data.message.results);
      this.loading = false;
    }
  }
});

/**
 * Get a unique list of objects by key and remove albums with less than 2 songs
 * i.e singles/features
 * @param results: A list of search results from the current search params
 */
const removeDuplicates = (results: Array<Result>) => {
  return [
    ...new Map(
      results.map((item: Result) => [
        item.collectionName.toLowerCase().replace(/\s+/g, ''),
        item
      ])
    ).values()
  ].filter(item => item.trackCount > 1);
};
</script>
