<template>
	<view class="container999">
		<view class="title">学员约课</view>
		<view class='line'>
			<view class='lineLeft'>课程名称</view>
			<view class="lineRight">
				<!-- data-name为自定义参数名称,同时也会以此为参数名存入data的form中-->
				<input class="input" @input="change" :value="form.product" data-name="product" placeholder-class="plaClass"
				 placeholder='请输入课程名称'></input>
			</view>
		</view>
		<view class='line'>
			<view class='lineLeft'>上课时间</view>
			<view class="lineRight">
				<picker @change="change" mode="date" data-name="time" :value="form.time" :custom-item="customItem">
					<view class="picker">
						{{form.time}}
					</view>
				</picker>
				<view class="tips tri"></view>
			</view>
		</view>
		<view class='line'>
			<view class='lineLeft'>手机号</view>
			<view class="lineRight">
				<input class="input" @input="change" :value="form.phone" data-name="phone" placeholder-class="plaClass" placeholder='请输入手机号'></input>
			</view>
		</view>
		<!-- <view class='line'>
			<view class='lineLeft'>地址</view>
			<view class="lineRight">
				<picker @change="change" mode="region" data-name="region" :value="form.region" :custom-item="customItem">
					<view class="picker">
						{{form.region[0]}}，{{form.region[1]}}，{{form.region[2]}}
					</view>
				</picker>
				<view class="tips tri"></view>
			</view>
		</view> -->
		<view class='line'>
			<view class='lineLeft'>备注</view>
			<view class="lineRight">
				<input class="input" @input="change" :value="form.remarks" data-name="remarks" placeholder-class="plaClass"
				 placeholder='备注'></input>
				<view class="tips">选填</view>
			</view>
		</view>
		<view class="buttonBox" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	const valid = require('../../components/util/valid.js'); //校验规则文件
	const util = require('../../components/util/util.js'); //防重点击函数
	export default {
		computed: {
			...mapState(['ipAddress', 'userId'])
		},
		data() {
			return {
				customItem: '全部', //地址picker的全部功能
				form: {
					product: '',
					time: '请选择上课时间',
					phone: '',
					remarks: '',
				}
			};
		},
		methods: {
			// 输入框或者picker事件方法
			change(e) {
				let name = e.currentTarget.dataset.name;
				let tempVal = e.target.value || e.detail.value;
				if (this.form[name] === undefined) {
					console.log('首次添加属性名')
					this.$set(this.form, name, tempVal)
				} else {
					// 若存在则直接赋值
					this.form[name] = tempVal
				}
			},
			// 验证方法
			toVaild(tempList) {
				// valid(value,type)为引入的校验方法,49行可见
				return tempList.every((item, index) => {
					let isVal = this.form[item.paramName]
					if (!isVal || !valid(isVal, item.rules)) {
						uni.showModal({
							title: '错误',
							content: `${item.failPass}`,
							showCancel: false
						})
						return false;
					}
					return true;
				})
			},
			// 提交
			submit: util.throttle(function(e) {
				const _this = this;
				const form = _this.form
				let tempList = [{
					paramName: 'time', //data-name和form中的参数名
					failPass: '请选择正确上课时间', //失败的提示
					rules: 'time', //校验的规则名称
				}, {
					paramName: 'phone', //data-name和form中的参数名
					failPass: '请输入正确的手机号', //失败的提示
					rules: 'phone', //校验的规则名称
				}]
				if (this.toVaild(tempList)) {
					uni.showLoading({
						title: '正在提交'
					})
					uni.request({
						url: _this.ipAddress + '/appointment/create',
						data: {
							userId: _this.userId,
							product: form.product,
							time: form.time,
							phone: form.phone,
							remarks: form.remarks
						},
						method: 'POST',
						success: (res) => {
							console.log('res', res)
							uni.hideLoading();
							uni.showToast({
								title: '申请成功'
							})
						}
					});
				}
			}, 1000), //防重点击,1s内只可点击一次
		},
		onLoad() {

		}
	}
</script>


<style lang="scss">
	.plaClass {
		color: #dbdbdb;
	}

	.container999 {
		.title {
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 4%;
			border-bottom: 1px solid #f5f5f5;
		}

		.buttonBox {
			width: 91%;
			margin: 0 auto;
			height: 84rpx;
			border-radius: 84rpx;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			bottom: 100rpx;
			left: 0;
			right: 0;
			background-color: #4a8be9;
		}

		.tri {
			width: 0;
			height: 0;
			border-left: 8rpx solid transparent;
			border-right: 8rpx solid transparent;
			right: 30rpx !important;
			border-top: 16rpx solid #545151;
		}

		.line {
			margin-top: 30rpx;
			height: 100rpx;
			width: 92%;
			margin: 0 auto;
			border-bottom: 1px solid #f5f5f5;
			display: flex;

			.lineRight {
				.tips {
					color: #9a9a9c;
					font-weight: bold;
				}

				flex: 1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
			}

			.lineLeft {
				display: flex;
				width: 20%;
				align-items: center;
				height: 100%;
				font-weight: bold;
				color: #000000;
			}

			.input {
				padding-right: 20rpx;
				height: 100%;
				width: 70%;
				text-align: left;
				font-size: 28rpx;
				color: #545151;
			}

			.picker {
				height: 100%;
				justify-content: flex-start;
				display: flex;
				align-content: center;
				width: 500rpx;
			}

			picker {
				height: 84rpx;
				line-height: 84rpx;
			}
		}

		width: 100vw;
		font-size: 28upx;
		min-height: 100vh;
		overflow: hidden;
		color: #6b8082;
		position: relative;
	}
</style>
