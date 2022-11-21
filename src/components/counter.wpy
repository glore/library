<style lang="less">
  .counter {
    text-align: left;
    font-size: 12px;
  }
  .count {
    font-size: 18px;
    font-weight: bold;
    &.red {
      color: red;
    }
    &.green {
      color: green;
    }
  }
</style>
<template>
  <div class="counter {{style}}">
    <button @tap="plus" size="mini">  +  </button>
    <button @tap="minus" size="mini">  -  </button>
    <button @tap="increment" size="mini">  INCREMENT  </button>
    <button @tap="decrement" size="mini">  DECREMENT  </button>
    <button @tap="incrementAsync" size="mini">  ASYNC INCREMENT  </button>
    <span class="count"> {{counter}} </span>
  </div>
</template>
<script>
  import wepy from '@wepy/core'
  import store from '../store';
  import { mapState, mapActions } from '@wepy/x';

  wepy.component({
    store,
    props: {
      num: {
        type: [Number, String],
        coerce: function (v) {
          return +v
        },
        default: 50
      }
    },
    computed: mapState([ 'counter' ]),

    events: {
      'index-broadcast': (...args) => {
        let $event = args[args.length - 1]
        console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
      }
    },

    watch: {
      num (curVal, oldVal) {
        console.log(`旧值：${oldVal}，新值：${curVal}`)
      }
    },

    methods: {
      ...mapActions([
        'increment',
        'decrement',
        'incrementAsync'
      ]),
      plus () {
        this.num = this.num + 1
        console.log('plus tapped in component');

        this.$emit('index-emit', this.num);
      },
      minus () {
        this.num = this.num - 1
        console.log(this.$name + ' minus tap')
      }
    }
  })
</script>

