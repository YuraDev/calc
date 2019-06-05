<template>
    <span class="animated-number" > {{number}} </span>
</template>
<script>
export default {
  props: {
    value: {
			type: Number,
      default: 0
		},
		duration: {
			type: Number,
      default: 20
		},
		step: {
			type: Number,
      default: 10
		}
	},
	data: () => ({
		number: 0,
    interval: false
	}),
	watch: {
		value () {
			this.change()
    }
	},
	mounted () {
    this.change()
  },
	methods: {
		change () {
			let start = Math.ceil(this.value)
			if (start === this.number) {
				return false
			}
			clearInterval(this.interval)
			this.interval = window.setInterval(() => {
				let end = Math.ceil(this.number)
				let change = (start - end) / this.step
				this.number = this.number + (change >= 0 ? Math.ceil(change) : Math.floor(change))
				if (start == end) {
					clearInterval(this.interval)
				}
			}, this.duration)
		}
	}
}
</script>