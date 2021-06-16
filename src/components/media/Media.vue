<template>
  <a
    :href="result.collectionViewUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="media"
  >
    <picture>
      <source :srcset="result.artworkUrl100" type="image/jpeg" />
      <img
        :src="result.artworkUrl100"
        :alt="result.artistName"
        loading="lazy"
      />
    </picture>
    <p class="collection-name">{{ result.collectionName }}</p>
    <p class="artist">{{ result.artistName }}</p>
  </a>
</template>

<script lang="ts">
import './media.scss';
import { Result } from '@/utils/media_content';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Media extends Vue {
  @Prop() result: Array<Result> = [];
}
</script>
