const Mock = require('mockjs')

const imageUrl = [
  'https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0',
  'https://gips2.baidu.com/it/u=1651586290,17201034&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f600_800'
]

// 生成20条数据的数组
const data = Mock.mock({
  'list|50': [
    {
      'id|+1': 1, // 自增id，从1开始
      mainImage () {
        return imageUrl[Math.floor(Math.random() * imageUrl.length)]
      }, // 随机图片url
      type: '@integer(1, 2)', // 类型，1~3随机整数 1图片 2视频
      title: '@ctitle(8, 16)', // 中文标题，长度8~36字符
      gameName: '@ctitle(4, 8)', // 游戏名称
      userAvatar: '@image("40x40", "#333", "#fff", "avatar")', // 用户头像url
      userName: '@cname', // 用户名字（中文）
      'likes|0-1000': 0 // 点赞个数，0~1000之间随机整数
    }
  ]
})

// 拦截请求路径为 /goods/goodAll，请求方式为 get，并返回模拟数据
Mock.mock('http://localhost:8081/good/goodAll', 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: data.list
  }
})
