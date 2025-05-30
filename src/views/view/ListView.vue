<template>
  <div
    class="list-container"
    @scroll.passive="handleScroll"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- 下拉刷新提示 -->
    <div v-if="loading && currentPage === 1" class="refresh-tip">正在刷新...</div>

    <!-- 数据卡片 -->
    <div class="card" v-for="item in goodData" :key="item.id">
      <template v-if="item.type === '2'">
        <video :src="item.mainImage" class="card-video" controls></video>
      </template>
      <template v-else>
        <img :src="item.mainImage" alt="图片" class="card-image" />
      </template>

      <div class="title">{{ item.title }}</div>
      <div class="game-name">{{ item.gameName }}</div>
      <div class="foot">
        <div class="user">{{ item.userName }}</div>
        <div class="like">{{ item.likes }}</div>
      </div>
    </div>

    <!-- 加载中/无更多提示 -->
    <div v-if="loading && currentPage > 1" class="load-more">加载中...</div>
    <div v-if="noMore && goodData.length > 0" class="load-more">没有更多了</div>
  </div>
</template>
<script>
import getData from '@/api/getData'

export default {
  name: 'ListView',
  data () {
    return {
      goodData: [], // 存储获取到的数据
      pageSize: 10, // 每页加载数量
      currentPage: 1, // 当前页码
      loading: false, // 是否正在加载
      noMore: false, // 是否没有更多数据
      total: 50, // 总数据条数
      isRefreshing: false, // 控制下拉刷新状态
      touchStartY: 0, // 触摸起始位置
      touchDistance: 0 // 下拉距离
    }
  },
  created () {
    this.loadData()
  },

  methods: {
    // 加载数据
    loadData () {
      if (this.loading || (this.currentPage * this.pageSize > this.total && this.goodData.length >= this.total)) {
        this.noMore = true
        return
      }

      this.loading = true
      getData()
        .then(response => {
          const newData = response.data.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          )
          this.goodData = [...this.goodData, ...newData]
          this.currentPage++
          this.loading = false
          this.noMore = false
        })
        .catch(error => {
          console.error('Error fetching data:', error)
          this.loading = false
        })
    },

    // 下拉刷新
    refresh () {
      this.goodData = []
      this.currentPage = 1
      this.noMore = false
      this.loading = true
      getData()
        .then(response => {
          const newData = response.data.slice(0, this.pageSize)
          this.goodData = [...newData]
          this.currentPage++
          this.loading = false
        })
        .catch(error => {
          console.error('Error refreshing data:', error)
          this.loading = false
        })
    },

    // 上拉加载更多
    handleScroll () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight

      if (scrollTop + clientHeight >= scrollHeight - 10 && !this.loading && !this.noMore) {
        this.loadData()
      }
    },

    // 处理触摸开始
    handleTouchStart (e) {
      this.touchStartY = e.touches[0].clientY
    },

    // 处理触摸移动
    handleTouchMove (e) {
      const currentY = e.touches[0].clientY
      this.touchDistance = currentY - this.touchStartY

      // 判断是否下拉超过一定距离且是第一页
      if (this.touchDistance > 50 && !this.loading && this.currentPage === 1) {
        this.isRefreshing = true
      }
    },

    // 处理触摸结束
    handleTouchEnd () {
      if (this.isRefreshing) {
        this.refresh()
        this.isRefreshing = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    const container = document.querySelector('.list-container')
    container.addEventListener('mousemove', (e) => {
      console.log('mousemove', e)
    })
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.refresh-tip,
.load-more {
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #666;
}
.list-container {
  column-count: 2; /* 设置两列瀑布流 */
  column-gap: 10px; /* 列间距 */
  padding: 6px;
}

.card {
  break-inside: avoid; /* 避免内容溢出 */
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: flex-start; // 左对齐
  text-align: left;
  padding: 10px;
}

.card-image {
  width: 100%;
  object-fit: contain;
}

.title {
  display: flex;
  flex-wrap: wrap;
  max-lines: 2;
  overflow: hidden;
  justify-content: start;
  font-size: 16px;
  font-family: 'SimHei', sans-serif; /* 黑体 */
  font-weight: bold;
  width: 100%;
  margin-top: 5px;
}

.game-name {
  font-size: 12px;
  font-family: 'SimSun', serif; /* 宋体 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: hidden;
  margin-top: 5px;
  background-color: #e8e5e5;
  border-radius: 5px;
  padding: 3px;
}

.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  font-family: 'SimSun', serif; /* 宋体 */
  font-size: 12px;
}
</style>
