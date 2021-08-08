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
      id: -1
    };
  },
  created() {
    this.id = Number(this.$route.params.id);
  }
};
</script>
