<template>
<div>
  <b-card :header="caption" >
    <b-table :hover="hover"
    :striped="striped"
    :bordered="bordered"
    :small="small"
    :fixed="fixed"
    responsive="sm"
    :items="items"
    :fields="fields"
    :current-page="currentPage"
    :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(item.is_staff)">
          {{ item.is_staff }}
        </b-badge>
      </template>
    </b-table>
    <b-nav>
    <b-nav-item>
        <b-pagination :total-rows="getRowCount(items)"
          :per-page="perPage"
          v-model="currentPage"
          prev-text="Prev"
          next-text="Next"
          hide-goto-end-buttons/>
    </b-nav-item>
    <b-nav-item>
      <b-btn variant="primary" @click="refresh()">새로 고침</b-btn>
    </b-nav-item>
    </b-nav>
  </b-card>
  <b-card>
    {{ items }}
  </b-card>
</div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../../store';

export default {
  name: 'c-table',
  state: {
    TableCompleted: false,
    TableError: false,
    TableLoading: false,
  },
  props: {
    caption: {
      type: String,
      default: 'Table',
    },
    hover: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    items() {
      return store.getters['signup/usersItems'];
    },
    ...mapState('signup', [
      'usersLoading',
      'usersError',
      'usersComplete',
      'usersItems',
    ]),
  },
  data: () => ({
    fields: [
      { key: 'username' },
      { key: 'email' },
      { key: 'group' },
      { key: 'is_staff' },
    ],
    currentPage: 1,
    perPage: 5,
    totalRows: 0,
  }),
  methods: {
    getBadge(status) {
      if (status === 'Active') {
        return 'success';
      } else if (status === 'Inactive') {
        return 'secondary';
      } else if (status === 'Pending') {
        return 'warning';
      } else if (status === 'Banned') {
        return 'danger';
      } else if (status === true) {
        return 'success';
      } else if (status === false) {
        return 'secondary';
      } else if (status === 'true') {
        return 'success';
      } else if (status === 'false') {
        return 'secondary';
      }
      return 'primary';
    },
    getRowCount(items) {
      if (items == null) {
        return 0;
      }
      return items.length;
    },
    refresh() {
      // eslint-disable-next-line
      console.log(`UserManagement refresh`);
      this.$store.dispatch('signup/selectAccounts');
    },
  },
};
</script>
