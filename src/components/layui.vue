<!--<template>-->
  <!--<div>-->
    <!--<ul class="flow-default" id="LAY_demo2"></ul>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
  <!--data () {-->
    <!--return {-->

    <!--}-->
  <!--},-->
  <!--mounted: function () {-->
    <!--this.$nextTick(function () {-->
      <!--window.layui.use('flow', function(){-->
        <!--let flow = window.layui.flow-->

        <!--flow.load({-->
          <!--elem: '#LAY_demo2' // 流加载容器-->
          <!--,scrollElem: '#LAY_demo2' // 滚动条所在元素，一般不用填，此处只是演示需要。-->
          <!--,isAuto: false-->
          <!--,isLazyimg: true //-->
          <!--,done: function(page, next){ // 加载下一页-->
            <!--// 模拟插入-->
            <!--setTimeout(function(){-->
              <!--let lis = [];-->
              <!--for(let i = 0; i < 6; i++){-->
                <!--lis.push('<li><img lay-src="http://s17.mogucdn.com/p2/161011/upload_279h87jbc9l0hkl54djjjh42dc7i1_800x480.jpg?v='+ ( (page-1)*6 + i + 1 ) +'"></li>')-->
              <!--}-->
              <!--next(lis.join(''), page < 6) // 假设总页数为 6-->
            <!--}, 500);-->
          <!--}-->
        <!--})-->

      <!--})-->
    <!--})-->
  <!--}-->
<!--}-->
<!--</script>-->
