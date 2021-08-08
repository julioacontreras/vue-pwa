<template>
  <div>
    <User :id="id" />
  </div>
</template>

<script>
import User from "../components/User.vue";

export default {
  components: {
    User
  },
  data() {
    return {
      id: 0
    };
  },
  mounted() {
    this.id = Number(this.$route.params.id);
  }
};
</script>
