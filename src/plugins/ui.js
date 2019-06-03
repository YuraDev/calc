class UI {
	constructor (vm, opts) {
		this.$vm = vm
		this._prefix = opts.prefix || 'ui-'
	}
	init (name, parsm) {
		const component = parsm.default || parsm
		component.name = this._prefix + name
		this.$vm.component(component.name, component)
	}
	inits (copms) {
		for (let name in copms) {
			this.init(name, copms[name])
		}
	}
	root (name, component) {
		this.$vm.prototype[name] = component
	}
}
let reqs = req => req.keys().map(file => ({ file, module: req(file).default }))
const components = reqs(
	require.context('@/components/ui', false, /\.vue$/i)
)
const installs = reqs(
	require.context('@/components/ui', true, /install\.js$/i)
)
export default {
	install (Vue, opts = {}) {
		let ui = new UI(Vue, opts)
		installs.forEach(inst => inst.module(ui))
		components.forEach(
			comp => ui.init(
				comp.file.split('/').pop().replace(/\.\w+$/, ''),
				comp.module
			)
		)
	}
}
