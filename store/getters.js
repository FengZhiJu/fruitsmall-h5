export default {
	cartLength(state){
		return state.cart.length;
	},
	
	fullTotalPrice(state, getters) {
		let tickTrueArr = state.cart.filter(item => item.tick);
		if(tickTrueArr.length<= 0) {
			return 0;
		}else if(tickTrueArr.length == 1) {
			return tickTrueArr[0].totalPrice;
		}
		let total = 0;
		tickTrueArr.forEach(item => total += item.totalPrice);
		return (total * 1).toFixed(2);
	},
	
	allTick(state, getters){
		if(state.cart.length <= 0) {
			return false;
		}
		return state.cart.findIndex(item => !item.tick) == -1;
	}
}