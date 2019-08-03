// import E from 'wangeditor'
export default{
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请确认密码'));
      } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入的密码不一致!'));
      } else {
          callback();
      }
    };
    return {
      ruleValidate: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            max: 7,
            message: "用户名不能超过七个字符",
            trigger: "blur",
          }
        ],
        password1: [
          { validator: validatePassCheck, trigger: 'blur' }
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
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        age: [
          {
            required: true,
            message: "年龄不能为空",
            trigger: "blur"
          }
        ],
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
      }
    }
  }
}