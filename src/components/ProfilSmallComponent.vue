<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

function go(slug: string) {
  router.push(slug);
}

</script>

<template>
  <div v-if="store.state.user" class="profile-small">
    <img
      class="profile-image link hover-grow"
      @click="go(`/profil`)"
      :src=store.state.user.avatar_url
      alt="avatar"
    />
    <div class="profil-infos">
      <h3>{{ store.state.user.username }}</h3>
      <p>{{ store.state.user.email }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-small {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
  .profil-infos {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: x-small;
    h3,
    p {
      margin: 0;
      line-height: 13px;
    }
  }
  .profile-image {
    border-radius: 50%;
    border: $secondary solid 3px;
    height: 50px;
    background-color: black;
    margin-right: 5px;
  }
}
</style>
