<style lang="less">
    .mylist:odd {
        color: red;
    }
    .mylist:even {
        color: green;
    }
</style>
<template>
    <div class="wepy-list">
        <div>
            <button @tap="add" size="mini">添加列表another</button>
        </div>
        <div v-for="(item, index) in list">
            <div @tap="tap" class="mylist">
              <span>{{item.id}}</span>: {{item.title}}  <span @tap="remove(index)"> X </span>
            </div>
        </div>
    </div>
</template>
<script>
  import wepy from '@wepy/core'

  wepy.component({
    data: {
      list: [
        {
          id: '0',
          title: 'loading'
        }
      ]
    },

    events: {
      'index-broadcast': (...args) => {
        let $event = args[args.length - 1]
        console.log(`${this.$name} receive ${$event.name} from ${$event.source.name}`)
      }
    },

    methods: {
      tap () {
        // this.num = this.num + 1
        console.log(this.$name + ' tap')
      },
      add () {
        let len = this.list.length
        this.list.push({id: len + 1, title: 'title_' + len})
      },
      remove (index) {
        this.$delete(this.list, index);
      }
    },

    onLoad () {
    }
  });
</script>
