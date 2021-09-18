
<template>
<div class="back-arrow">

  <svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 14C18.8954 14 18 13.1046 18 12C18 10.8954 18.8954 10 20 10C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 12H2M2 12L5 9M2 12L5 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>

</template>

<style lang="scss" scoped>
.back-arrow {
  background-color: rgba(0, 0, 0, 0.712);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  color: white;
}
.shadow {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
  background-color: rgba(0, 0, 0, 0.459);
}
</style>
