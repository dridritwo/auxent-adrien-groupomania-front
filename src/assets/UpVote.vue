<script setup lang="ts">

const props = defineProps({
  active: Boolean,
  down: Boolean
});

</script>

<template>
  <div class="container-svg" :class="{ downvote: down, liked: active }">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8L8.5 11.5M12 16V8V16ZM12 8L15.5 11.5L12 8Z"
        
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.container-svg {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
svg {
  stroke: white;
}
.liked {
  svg {
    stroke: $fifth;
  }
}
.shadow {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
  background-color: rgba(0, 0, 0, 0.459);
}

.downvote {
  transform: rotate(180deg);
}
</style>
