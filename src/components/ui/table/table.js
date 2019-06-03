export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data: () => ({
    fields: {}
  }),
  provide () {
    return {'table': this}
  },
  computed: {},
  methods: {
    getSlot (name, vm = this) {
      return (fallback, props = {}) => {
        let fun = vm.$scopedSlots[name]
        let nodes = fun ? fun(props) : (vm.$slots[name] || fallback)
        let target = props && props.slot
        return target ? vm.$createElement('template', { slot: target }, nodes) : nodes
      }
    },
    renderCell (h, data, cell) {
      let props = data.props
      let opts = Object.assign({}, data.attrs, {
        staticClass: this.join([
          'ui-table__cell',
          'index-' + data.$index,
          data.attrs.staticClass,
          props.align && 'is-' + props.align,
          props.fixed && 'fixed'
        ])
      })
      return h('div', opts, cell)
    },
    renderRow (h, row, cells) {
      return h('div', { staticClass: 'ui-table__row index-' + row.$index }, cells)
    },
    renderHeders (h) {
      let heads = this.maps(
        this.fields,
        col => this.renderCell(h, col, col.head(col.props.label))
      )
      return h('div', { staticClass: 'ui-table__header' }, [
        this.renderRow(h, {$index: 1}, heads)
      ])
    },
    renderBody (h) {
      let items = this.maps(
        this.data,
        row => {
          let cells = this.maps(
            this.fields,
            col => this.renderCell(h, col, col.cell(row[col.props.prop], row))
          )
          return this.renderRow(h, row, cells)
      })
      return h('div', { staticClass: 'ui-table__body' }, items)
    },
    maps (obj, fun) {
      let res = []
      let index = 1
      for (let key in obj) {
        let valuer = obj[key]
        valuer.$index = index++
        res.push(fun(valuer))
      }
      return res
    },
    join (value, separator = ' ') {
      let res = ''
      for (let str of value) {
        if (str) { res += separator + str }
      }
      return res
    }
  },
  render (h) {
    return h('div', { staticClass: 'ui-table' }, [
      h('div', { staticClass: 'hidden' }, this.getSlot('default')()),
      this.renderHeders(h),
      this.renderBody(h)
    ])
  }
}
