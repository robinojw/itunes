<template>
  <div class="search-bar">
    <input
      type="text"
      class="search-bar"
      placeholder="Search"
      @focus="toggleInput"
      @blur="toggleInput"
      ref="input"
      v-model="inputValue"
    />
    <div class="helper-text" ref="helper">
      {{ inputValue }} search media with the format media/artist i.e album/oasis
      <p class="enter-text">press enter...</p>
    </div>
  </div>
</template>

<script lang="ts">
import './search.scss';
import { Component, Vue } from 'vue-property-decorator';

const HELPER_TEXT = 'show-helper';
const ENTER_KEY_CODE = 13;

@Component
export default class Search extends Vue {
  $refs!: {
    helper: HTMLElement;
  };
  focused = false;
  inputValue: string = window.location.pathname
    .slice(1)
    .replace(/[^a-zA-Z/]/g, ' ');

  toggleInput() {
    this.$refs.helper.classList.toggle(HELPER_TEXT);
    this.focused = !this.focused;
    this.toggleKeyboardListener();
  }

  toggleKeyboardListener() {
    if (this.focused) {
      window.addEventListener('keydown', (event: KeyboardEvent) =>
        this.searchMedia(event)
      );
    }
  }

  /**
   * Get the latest search parameters and emit an event to update the
   * parent's resource data.
   */
  searchMedia(event: KeyboardEvent) {
    if (
      event.keyCode == ENTER_KEY_CODE &&
      window.location.pathname != `/${this.inputValue}`
    ) {
      const [media, query] = this.inputValue.split('/');
      const value = this.inputValue.replace(/[^a-zA-Z/]/g, '+');
      this.$router.push(`/${value}`);
      this.$emit('update-resource', media, query);
      window.removeEventListener('keydown', this.searchMedia);
    }
  }
}
</script>
