<template>
  <base-transition name="fade">
    <template>
      <div class="base-modal">
        <div class="base-modal__box scroll-bar" :class="modalMainClass">
          <div class="flex center-aligned center-items full-width">
            <slot name="header"
              ><span class="flex fl1 bold-500">{{ title }}</span></slot
            >
            <span
              v-if="closeState"
              class="base-modal__close"
              @click="$emit('close-modal')"
            >
              <base-icon icon-path="general/close" size="32"></base-icon>
            </span>
          </div>
          <slot name="body"></slot>
        </div>
        <div class="shadow" @click="$emit('close-modal')"></div>
      </div>
    </template>
  </base-transition>
</template>

<script>
export default {
  props: {
    modalMainClass: {
      type: String,
      default: '',
    },
    closeState: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
