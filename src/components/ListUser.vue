<template>
  <div>
    <md-button class="md-icon-button" v-on:click.stop="exportCVS">Export favortite users</md-button>
    <md-table v-model="users" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">User list</h1>
      </md-table-toolbar>
      <md-table-toolbar slot="md-table-alternate-header" class="bg-primary" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" v-on:click.stop="deleteUserSelecteds">
            <md-icon>delete</md-icon>
          </md-button>
          <md-button class="md-icon-button" v-on:click.stop="starUserSelecteds">
            <md-icon>star_rate</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        :md-disabled="item.name.includes('Stave')"
        md-selectable="multiple"
        md-auto-select
      >
        <md-table-cell md-label="#" md-sort-by="id">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">
          <router-link :to="`/user/${item.id}`">
            <span v-if="item.favorite">★</span>
            {{ item.name }} {{ item.favorite + '' }}
          </router-link>
        </md-table-cell>
        <md-table-cell md-label="Birthday" md-sort-by="birthday">{{ item.birthday }}</md-table-cell>
        <md-table-cell md-label="Age" md-sort-by="age">{{ item.age }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Nationality" md-sort-by="nationality">{{ item.nationality }}</md-table-cell>
        <md-table-cell md-label="Created at" md-sort-by="nationality">{{ item.createdAt }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { userStore } from "../store";
import { mapActions, mapGetters } from "vuex";
import cvs from "../plugins/cvs";

export default {
  store: userStore,
  data() {
    return {
      selected: []
    };
  },
  computed: {
    ...mapGetters({ users: "getUsers" })
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    ...mapActions(["loadUsers", "deleteUsers", "favoriteUsers"]),
    ...mapGetters({ getFavoriteUsers: "getFavoriteUsers" }),

    onSelect(items) {
      this.selected = items;
    },

    getAlternateLabel(count) {
      let plural = "";
      if (count > 1) {
        plural = "s";
      }
      return `${count} user${plural} selected`;
    },

    deleteUserSelecteds() {
      this.deleteUsers(this.selected);
    },

    starUserSelecteds() {
      this.favoriteUsers(this.selected);
    },

    exportCVS() {
      cvs.run(this.getFavoriteUsers());
    }
  }
};
</script>
