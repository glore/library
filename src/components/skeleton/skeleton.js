Component({
  properties: {
    /**
     * 骨架屏数据
     */
    data: {
      type: Object,
      value: null,
    },
    /**
     * 是否是开发模式，如果为true, 则显示生成按钮
     */
    isDev: {
      type: Boolean,
      value: false,
    },
    /**
     * 选择器名字
     */
    selector: {
      type: String,
      value: 'skeleton',
    },
    /**
     * 骨架屏背景
     */
    bgcolor: {
      type: String,
      value: '#FFF',
    },
    /**
     * 骨架屏动画效果，可以是如下值: 'spin', 'chiaroscuro', 'shine'
     */
    loading: {
      type: String,
      value: '',
    },
  },
  data: {
    isShowByDev: false,
    devData: null,
    skeletonWidth: 375,
    skeletonHeight: 667,
    selectorTypes: ['bg', 'rect', 'circle'],
  },
  attached() {
    // 默认的首屏宽高，防止内容闪现
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      skeletonHeight: systemInfo.windowHeight,
    });
  },
  methods: {
    handleToggleShow(e) {
      this.setData({ isShowByDev: e.detail });
    },
    handleUpdateData(e) {
      this.setData({ devData: e.detail });
      console.table(e.detail);
    },
  },
});
