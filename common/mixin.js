export default {
	filters: {
		setPrice(goods){
			let price = goods.price * 1;
			return goods.decorate ? (price * 0.6).toFixed(2) : price.toFixed(2);
		}
	},
}