<template>
  <div class="page-loadmore">
    <h1 class="page-title text-align-center">Pull up</h1>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore
        :auto-fill="false"
        :top-method="loadTop"
        @translate-change="translateChange"
        @top-status-change="handleTopChange"
        :bottom-method="loadBottom"
        @bottom-status-change="handleBottomChange"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
      >
        <ul class="page-loadmore-list">
          <li v-for="(item, key) in list" :key="key" class="page-loadmore-listitem">{{ item }}</li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">下拉刷新</span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">加载更多</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
        <div v-if="nomore" class="mini-loadmore-nomore text-align-center">没有更多了</div>
      </mt-loadmore>
    </div>
  </div>
</template>
<style>
  .loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
  }
  .mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
  }
  .mint-loadmore-top span.is-rotate {
    /*-webkit-transform: rotate(180deg);*/
    /*transform: rotate(180deg)*/
  }
  .page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
  }
  .page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
  }
  .page-loadmore-desc:last-of-type,
  .page-loadmore-listitem {
    border-bottom: 1px solid #eee
  }
  .page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
  }
  .page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
  }
  .page-loadmore-wrapper {
    overflow: scroll;
  }
  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }
  .mint-loadmore-bottom span.is-rotate {
    /*-webkit-transform: rotate(180deg);*/
    /*transform: rotate(180deg)*/
  }
  .mini-loadmore-nomore {
    padding: 1em 0;
  }
</style>
<script type="text/babel">
import md5 from 'js-md5'
export default {
  data () {
    return {
      page: 1,
      limit: 10,
      list: [],
      allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      nomore: false,
      bottomStatus: '',
      wrapperHeight: 0,
      topStatus: '',
      // wrapperHeight: 0,
      translate: 0,
      moveTranslate: 0
    }
  },
  created: function () {
    let _this = this
    let param = {
      mobile: '12345678912',
      password: md5('wz17zh' + '123456')
    }
    _this.$store.dispatch('login', param).then((data) => {
      console.log(data)
      _this.loadTop()

      _this.$store.dispatch('followWexins', {}).then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    getList (page, limit) {
      let _this = this
      _this.$store.dispatch('pairUserList', {page: page, limit: limit}).then((data) => {
        if (data.code === 1) {
          let lists = data.data.list ? data.data.list : []
          if (page >= 3) {
            lists = []
          }
          if (lists.length === 0) {
            this.allLoaded = true
            this.nomore = true
            return false
          }
          for (let i in lists) {
            _this.list.push(lists[i]['userinfo']['nickname'])
          }
          if (lists.length < 11) {
            for (let i = 1; i < 11 - lists.length; i++) {
              _this.list.push('')
            }
          }
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      if (!this.allLoaded) {
        this.$refs.loadmore.onBottomLoaded()
        this.getList(this.page, this.limit)
        this.page = this.page + 1
      }
    },
    handleTopChange (status) {
      this.moveTranslate = 1
      this.topStatus = status
    },
    translateChange (translate) {
      const translateNum = +translate
      this.translate = translateNum.toFixed(2)
      this.moveTranslate = (1 + translateNum / 70).toFixed(2)
    },
    loadTop () {
      this.allLoaded = false
      this.nomore = false
      this.list = []
      this.page = 1
      this.getList(this.page, this.limit)
      this.$refs.loadmore.onTopLoaded()
    }
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    this.$nextTick(function () {
    })
  }
}
</script>
