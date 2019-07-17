<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <!--<table class="table table-striped table-bordered table-list">-->
      <h4>{{title}}</h4>
      <table class="table table-hover">
      <thead>
      <tr>
        <th v-for="column in columns"
            v-bind:key="column.key" :style="{width:column.width+ '%'}">
          {{column.value}}
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-if="data.length == 0">
        <tr>
          <td v-bind:colspan="columns.length">
            해당 데이터가 존재 하지 않습니다.
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="(entry, index) in data" v-bind:key="entry.key">
          <td v-for="column in columns" v-bind:key="column.key">
            <template v-if="column.type == 'text'">
              <template v-if="typeof entry[column.key] == 'undefined'"  >
                {{index + 1}}
              </template>
              <template v-else  @click="openDetail(entry)">
                {{entry[column.key]}}
              </template>
            </template>
            <template v-else-if="column.type == 'key'">
                <a href="#"  @click="openDetail(entry)"> {{entry[column.key]}}</a>
            </template>
            <template v-else-if="column.type == 'input'">
              <input class="form-control" v-model="entry[column.key]"/>
            </template>
            <template v-else-if="column.type == 'checkbox'">
              <input type='checkbox' v-model="entry[column.key]"
                     :checked="typeof entry[column.key] == 'undefined' ? true : false"/>
            </template>
            <template v-else-if="column.type == 'delete'">
              <button class="btn btn-danger btn-xs" @click="removeRow(index)" >X</button>
            </template>
            <template v-else-if="column.type == 'action'">
  <!--            <button class="btn btn-danger btn-xs" @click="removeRow(index)" >X</button>
              <button class="btn btn-danger btn-xs" @click="removeRow(index)" >X</button>-->
              <button type="button" class="btn btn-info" v-on:click.self="actionEditRow(entry)">
                <span class="glyphicon glyphicon-pencil"></span> 수정
              </button>
              <button type="button" class="btn btn-info" @click="actionRemoveRow(entry)">
                <span class="glyphicon glyphicon-remove"></span> 삭제
              </button>
            </template>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: [
    'data',
    'columns',
    'filteredData',
    'title',
  ],
  computed: {

  },
  data() {
    const sortOrders = {};
    this.columns.forEach((key) => {
      sortOrders[key] = 1;
    });
    const foo = {
      sortKey: '',
    };
    return foo;
  },
  methods: {
    openDetail(rowObj) {
      // 부모에서 재정의한다.
      console.log(rowObj);
      this.$emit('clickRowEvent', rowObj);
    },
    actionEditRow(rowObj) {
      this.$emit('actionEditRowEvent', rowObj);
    },
    actionRemoveRow(rowObj) {
      this.$emit('actionRemoveRowEvent', rowObj);
    },
  },
};
</script>
<style>
  /*
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}*/
  *:after,
  *:before {
    position: relative;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .table-component {
    display: flex;
    flex-direction: column;
    margin: 4em 0;
  }

  .table-component__filter {
    align-self: flex-end;
  }

  .table-component__filter__field {
    padding: 0 1.25em 0 .75em;
    height: 2.5em;
    border: solid 2px #e0e0e0;
    border-radius: 2em;
    font-size: inherit;
  }

  .table-component__filter__clear {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    color: #007593;
    font-weight: bold;
    cursor: pointer;
  }

  .table-component__filter__field:focus {
    outline: 0;
    border-color: #007593;
  }

  .table-component__table-wrapper {
    overflow-x: auto;
    margin: 1em 0;
    width: 100%;
    border: solid 1px #ddd;
    border-bottom: none;
  }

  .table-component__table {
    min-width: 100%;
    border-collapse: collapse;
    border-bottom: solid 1px #ddd;
    table-layout: fixed;
  }

  .table-component__table__caption {
    position: absolute;
    top: auto;
    left: -10000px;
    overflow: hidden;
    width: 1px;
    height: 1px;
  }

  .table-component__table th,
  .table-component__table td {
    padding: .75em 1.25em;
    vertical-align: top;
    text-align: left;
  }

  .table-component__table th {
    background-color: #e0e0e0;
    color: #999;
    text-transform: uppercase;
    white-space: nowrap;
    font-size: .85em;
  }

  .table-component__table tbody tr:nth-child(even) {
    background-color: #f0f0f0;
  }

  .table-component__table a {
    color: #007593;
  }

  .table-component__message {
    color: #999;
    font-style: italic;
  }

  .table-component__th--sort,
  .table-component__th--sort-asc,
  .table-component__th--sort-desc {
    text-decoration: underline;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .table-component__th--sort-asc:after,
  .table-component__th--sort-desc:after {
    position: absolute;
    left: .25em;
    display: inline-block;
    color: #bbb;
  }

  .table-component__th--sort-asc:after {
    content: '↑';
  }

  .table-component__th--sort-desc:after {
    content: '↓';
  }

</style>
