import Vue from "vue"
export default {
	
	setLogin(state, user){
		state.isLogin = true;
		state.username = user.username;
	},
	
	logout(state){
		state.cart = [];
		state.order = [];
		state.isLogin = false;
		state.username = '';
		state.avatar = '';
		state.site = [];
	},
	
	setCart(state, cart) {
	    state.cart = cart.filter(item => !item.isFinish);
	    state.order = cart.filter(item => item.isFinish);
	},
	
	setSite(state, site){
		state.site = site;
	},
	
	setTick(state, cartGoods) {
		cartGoods.tick = !cartGoods.tick;
	},
	
	setAvatar(state, avatar) {
		state.avatar = avatar;
	},
	reverseTick(state, allTF){
		state.cart.forEach(item => item.tick = !allTF);
	}
}