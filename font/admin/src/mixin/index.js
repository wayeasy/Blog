import E from 'wangeditor'
export default{
  data () {
    return {
      ruleValidate: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            // type: "string",
            max: 7,
            message: "用户名不能超过七个字符",
            trigger: "blur",
          }
        ],
        catename: [
          {
            type: "string",
            required: true,
            message: "用户名不能为空,且不能为纯数字",
            trigger: "blur"
          },
          {
            type: "string",
            max: 7,
            message: "用户名不能超过七个字符,且不能为纯数字",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ],
        address: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ],
        // sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        // age: [
        //   {
        //     required: true,
        //     message: "年龄不能为空",
        //     trigger: "blur"
        //   },
        //   {
        //     type: "number",
        //     message: "年龄必须为数字",
        //     trigger: "blur"
        //   }
        // ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码不能为纯数字,并且不能小于六位",
            trigger: "blur"
          }
        ]
      },
      editor: null
    }
  },
  mounted () {
    this.editor = new E('#div1', '#div2')
    this.editor.customConfig.uploadImgServer = 'http://127.0.0.1:9000/article/articleImg'  // 上传图片到服务器
    // 隐藏“网络图片”tab
    this.editor.customConfig.showLinkImg = false
    // console.log(this.editor.txt.html())
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.uploadImgHooks = {
       before: function (xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        
        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      error: function(xhr, editor) {
        console.log(11)
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          // console.log()
          let url = result.url
          url = 'http://127.0.0.1:9000' + url.replace(/\\/g,'/')
          insertImg(url)
      }
    }
    this.editor.create()
  }
}