<template>
  <!--해당 템플릿은 동적으로 테이블 Row를 추가/삭제 하는 템플릿이다. -->
  <div class="panel-body">
    <h4>{{titleName}}<button class="btn" @click="addRow">add</button></h4>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>번호</th>
        <th v-for="column in columns"
            v-bind:key="column.key" :style="{width:column.width+ '%'}">
          {{column.value}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(entry, index) in data" v-bind:key="entry.key">
        <td>
          {{index + 1}}
        </td>
        <td v-for="column in columns" v-bind:key="column.key">
          <template v-if="column.type == 'text'">
            <template v-if="typeof entry[column.key] == 'undefined'">
              'unde'
            </template>
            <template v-else>
              {{entry[column.key]}}
            </template>
          </template>
          <template v-else-if="column.type == 'input'">
            <input class="form-control" v-model="entry[column.key]"/>
          </template>
          <template v-else-if="column.type == 'checkbox'">
            <input type='checkbox' v-model="entry[column.key]"
                   :checked="typeof entry[column.key] == 'undefined' ? true : false"/>
          </template>
          <template v-else-if="column.type == 'select'">
            <select class="form-control"
                    v-bind:id="data.id" v-model="entry[column.key]" @change="changeSelect(entry)">
              <option v-for="option in propOptions" v-bind:value="option.value"
                      v-bind:key="option.value">
                {{ option.text }}
              </option>
            </select>
          </template>
          <template v-else-if="column.type == 'delete'">
            <button class="btn btn-danger btn-xs" @click="removeRow(index)" >X</button>
          </template>
        </td>
      </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DynamicTableGridTemplate',
  props: [
    'data',
    'columns',
    'propOptions',
    'filteredData',
    'titleName',
  ],
  methods: {
    addRow() {
      try {
        this.data.push({});
      } catch (e) {
        console.log(e);
      }
    },
    removeRow(index) {
      this.data.splice(index, 1);
    },
    changeSelect(value) {
      this.$emit('changeSelectInfo', value);
    },
  },
};
</script>

<style scoped>

</style>
