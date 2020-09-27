<template>
  <nuxt-child />
</template>

<script>
export default {
  middleware({ store, redirect }) {
    return redirect("/all");
  }
};
</script>
