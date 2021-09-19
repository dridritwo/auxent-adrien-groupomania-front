<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import IconHome from "../assets/IconHome.vue";
import IconFire from "../assets/IconFire.vue";
import IconAdd from "../assets/IconAdd.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

function go(slug: string) {
  router.push(slug);
}

onMounted(() => {});
</script>

<template>
 <div class="profile-small">

   <img
      class="profile-image link"
      @click="go(`/profil`)"
      :src="`${store.state.user.avatar_url}`"
      alt="avatar"
    />
    <div class="profil-infos">
      <h3>{{store.state.user.username}}</h3>
      <p>{{store.state.user.email}}</p>
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
  .profil-infos {
    text-align: left;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
    font-size: x-small;
    h2 {
      margin: 0;
    }
  }
}
</style>
