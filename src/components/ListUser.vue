<template>
  <div>
    <md-table v-model="users" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">With auto select and alternate headers</h1>
      </md-table-toolbar>
      <md-table-toolbar slot="md-table-alternate-header" class="bg-primary" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" v-on:click.stop="deleteUser">
            <md-icon>delete</md-icon>
          </md-button>
          <md-button class="md-icon-button" v-on:click.stop="starUser">
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
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="age" md-sort-by="age">{{ item.age }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Nationality" md-sort-by="nationality">{{ item.nationality }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { getUsers } from "../plugins/api";

export default {
  data() {
    return {
      selected: [],
      users: []
    };
  },
  async mounted() {
    this.users = await getUsers();
  },
  methods: {
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

    deleteUser() {
      this.selected.forEach(userToDelete => {
        let index = -1;
        this.users.forEach((user, idx) => {
          if (user.id === userToDelete.id) {
            index = idx;
          }
        });
        if (index >= 0) {
          this.users.splice(index, 1);
        }
      });
    },

    starUser() {
      console.log("star!");
    }
  }
};
</script>
