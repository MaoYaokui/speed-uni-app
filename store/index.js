import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const path = 'http://127.0.0.1'
const path = 'https://sl.n-dimension.com.cn'

const store = new Vuex.Store({
	state: {
		ipAddress: path + ':9005/api',
		filePath: path + ':9005/file/',
		hasLogin: false, // 是否登录 默认 否
		userId: '',
		userInfo: {},
	},
	mutations: {
		updateUserInfo(state, userInfo) {
			console.log('userInfo', userInfo)
			state.hasLogin = true;
			state.userInfo = userInfo;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: userInfo
			})
			uni.request({
				url: state.ipAddress + '/user/updateUserInfo',
				data: userInfo,
				success: (res) => {
					this.text = 'request success';
					console.log('res', res)
					console.log('---------登录成功---------')
				}
			});
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		},
		updateUserId(state, userId) {
			state.userId = userId
		}
	}
})

export default store
