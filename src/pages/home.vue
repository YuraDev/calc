<template>
  <layout-page class="martingale">
    <template slot='calc'>
        <ui-form-item>
          <ui-radio slot="label" :value.sync="target" :options="targetOpts"/>
          <ui-input-number v-model="_target"  :precision="2"/>
        </ui-form-item>
        <ui-form-item label="Начальная ставка">
            <ui-input-number  v-model="min"  :precision="2"/>
        </ui-form-item>
        <ui-form-item>
          <ui-radio slot="label"  :value.sync="goal" :options="goalOpts"/>
          <ui-input-number v-model="_goal"  :precision="2"/>
        </ui-form-item>
        <ui-form-item label="Коэффициент">
            <ui-input-number  v-model="coef" :precision="2"/>
        </ui-form-item>
        <ui-form-item label="Округлить ставки">
          <ui-select :value.sync="round" :options="roundOpts"/>
        </ui-form-item>
    </template>
    <div slot="forecast">
      <ui-table :data="forecast">
        <ui-table-field style="width: 10%" class="index" label="#" prop="$index" align="center"/>
        <ui-table-field style="width: 30%" class="bet"  label="Ставка">
          <template slot="cell" slot-scope="scope">
            <ui-input :value="scope.bet">
              <template slot="prefix">
                <ui-button :title="'Скопировать ставку ' + scope.bet" type="icon" icon="copy" @click="copyToClipboard(scope.bet)"/>
              </template>
            </ui-input>
          </template>
        </ui-table-field>
        <ui-table-field style="width: 20%" class="profit" label="Прибыль">
          <template slot="cell" slot-scope="scope">
            <span class="cell-icon -plus"></span>  {{scope.profit}}
          </template>
        </ui-table-field>
        <ui-table-field style="width: 20%" class="lost"  label="Убыток">
          <template slot="cell" slot-scope="scope">
            <span class="cell-icon -minus"></span>  {{scope.lost}}
          </template>
        </ui-table-field>
        <ui-table-field style="width: 20%" class="win"  label="Выигрыш" prop="win"/>
      </ui-table>
    </div>
  </layout-page>
</template>

<script>
import layoutPage from '@/layout/page'
export default {
  name: 'home',
  components: { layoutPage },
  data: () => ({
    bets: 10,
    balance: 1000,
    coef: 3.25,
    min: 4,
    roi: 1.5,
    fixed: 10,
    target: 1,
    targetOpts: [{
      key: 1, value: 'Кло-во Ставок'
    }, {
      key: 2, value: 'Банк'
    }],
    goal: 1,
    goalOpts: [{
      key: 1, value: 'Фикс. ROI'
    }, {
      key: 2, value: 'Фикс. Прибыль'
    }],
    round: 1,
    roundOpts: [{
      key: 1, value: 'Не округлять'
    }, {
      key: 2, value: 'Округлить к большему'
    }, {
      key: 3, value: 'Округлить к меньшему'
    }]
  }),
  computed: {
    _target: {
      get () {
        return this.target === 1 ? this.bets : this.balance
      },
      set (value) {
        this.$set(this, (this.target === 1 ? 'bets' : 'balance'), value)
      }
    },
    _goal: {
      get () {
        return this.goal === 1 ? this.roi : this.fixed
      },
      set (value) {
        this.$set(this, (this.goal === 1 ? 'roi' : 'fixed'), value)
      }
    },
    forecast () {
      let res = []
      let TotBet = 0
      let min = parseFloat(this.min) || 0
      let coef = parseFloat(this.coef) || 0
      let roi = parseFloat(this.roi) || 0
      let bets = parseFloat(this.bets) || 0
      let balance = parseFloat(this.balance) || 0
      let fixed = parseFloat(this.fixed) || 0
      /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
      for (let i = 1; true; i++) {
        let bet = min
        let loss = min
        if (res.length) {
          bet = this.roundInt(this.goal === 1 ? (res[res.length - 1].bet * roi) : parseFloat((TotBet + fixed) / (coef - 1)))
          loss = parseFloat(res[res.length - 1].loss) + parseFloat(bet)
        }
        TotBet += bet
        bet = this.goal === 1 ? bet : Math.round(bet * 100) / 100
        let winAll = bet * coef
        if (this.target === 2 && loss >= balance || res.length && bet <= min) break
        res.push({
          bet,
          loss,
          win: winAll.toFixed(2),
          profit: (winAll - loss).toFixed(2),
          lost: parseFloat(loss).toFixed(2)
        })
        if (this.target === 1 && i >= bets) break
      }
      return res
    }
  },
  watch: {
  },
  methods: {
    roundInt (val) {
      let type = parseFloat(this.round) || 1
      let int = parseFloat(val)
      if (type === 1) {
        return parseFloat(int.toFixed(2))
      } else if (type === 2) {
        return Math.floor(int)
      } else if (type === 3) {
        return Math.ceil(int)
      }
    },
    copyToClipboard (text) {
      const input = document.createElement('input')
      input.style.position = 'fixed'
      input.style.opacity = 0
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('Copy')
      document.body.removeChild(input)
    }
  }
}
</script>
<style lang="scss">
  @import "@/assets/scss/pages/home.scss"
</style>
