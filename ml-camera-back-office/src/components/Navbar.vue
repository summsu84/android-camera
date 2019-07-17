<template>
<div id="Navbar-container">
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand href="#">
    ML_CAMERA
  </b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <div class="text-center">
        <b-button variant="info">
          Notifications <b-badge pill variant="dark">4</b-badge>
        </b-button>
      </div>
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em><icon name="regular/user"></icon>&nbsp;histdev1104@gmail.com
      </em>
        </template>
        <b-dropdown-item href="#"><b-link to="profile">Profile</b-link></b-dropdown-item>
        <b-dropdown-item href="#"><b-link to="logout">logout</b-link></b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</div>
</template>

<script>
export default {
  name: 'navbar',
};
</script>

<style scoped>

#Navbar-container {
  background-color: #e9e8f2;
}

</style>
