<template>
  <div>
    <div v-if="user">
      <p>{{ user.name }}</p>
    </div>
  </div>
</template>

<script>
import { userStore } from "../store";
import { mapActions, mapGetters } from "vuex";

export default {
  store: userStore,
  props: {
    id: {
      Type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({ user: "getUserSelected" })
  },
  mounted() {
    this.setUserSelectedById(this.id);
  },
  methods: {
    ...mapActions(["setUserSelectedById"])
  }
};
</script>
