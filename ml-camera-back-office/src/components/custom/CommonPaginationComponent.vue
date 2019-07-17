<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="index in pageNumber" :key="index">
          <a class="page-link" href="#">{{index}}({{index * maxSize}})</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
/* eslint-disable radix,object-shorthand,func-names */

export default {
  name: 'CommonPaginationComponent',
  props: ['listDataTotalCount', 'maxSize'],
  data() {
    return {
      prevPage: 0,
      nextPage: 0,
      currentPage: 0,
      pageNumber: parseInt((this.listDataTotalCount % this.maxSize === 0) ?
        (this.listDataTotalCount / this.maxSize) :
        (this.listDataTotalCount / this.maxSize) + 1),
    };
  },
  watch: {
    url: function (newVal, oldVal) {
      console.log(`Prop Changed : ${newVal} was ${oldVal}`);
      this.pageNumber = parseInt((this.newVal % this.maxSize === 0) ?
        (this.newVal / this.maxSize) :
        (this.newVal / this.maxSize) + 1);
    },
  },
};
</script>

<style scoped>

</style>
