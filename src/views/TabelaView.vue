<script>
import testeApi from '../api/teste'
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'
import ProdutosApi from '../api/produtos'
const produtosApi = new ProdutosApi()

export default {
  data() {
    return {
      produtos: testeApi.produtos,
      ProdutosRecentes: []
    }
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['prodId', 'prodSelec', 'pesquisa'])
  },
  watch: {
    async esquisa() {
      try {
        const response = await produtosApi.buscarProdutos()
        this.ProdutosRecentes = response.filter((produto) => {
          return produto.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['selecionar', 'pesquisar']),

    async getProdutosRecentes() {
      try {
        const response = await produtosApi.buscarProdutos()
        this.ProdutosRecentes = response
      } catch (error) {
        console.log(error)
      }
    },
    async excluir(produto) {
      await produtosApi.excluirProduto(produto.id)
      this.ProdutosRecentes = await produtosApi.buscarProdutos()
    }
  },
  mounted() {
    this.getProdutosRecentes()
  }
}
</script>
<template>
  <main>
    <div class="wrapper">
      <div class="tabela">
        <table>
          <tr>
            <th class="cabeça">Id</th>
            <th class="cabeça">Nome</th>
            <th class="cabeça">Thumbnail</th>
            <th class="cabeça">Categoria</th>
            <th class="cabeça">Preço</th>
            <th class="cabeça">Em Promoção</th>
            <th class="cabeça">Preço Promoção</th>
            <th class="cabeça">Fabricante</th>
            <th class="cabeça">Ação</th>
          </tr>
          <tr v-for="produto in ProdutosRecentes" :key="produto.id">
            <td>{{ produto.id }}</td>
            <td>{{ produto.nome }}</td>
            <td>
              <a :href="produto.thumbnail.file">{{ produto.thumbnail.file }}</a>
            </td>
            <td v-if="produto.categoria">{{ produto.categoria.nome }}</td>
            <td v-else>Produto sem Categoria</td>
            <td>{{ produto.preco }}</td>
            <td>{{ produto.promo }}</td>
            <td>{{ produto.precoPromo }}</td>
            <td v-if="produto.fabricante">{{ produto.fabricante.nome }}</td>
            <td v-else>Produto sem fabricante</td>
            <td>
              <button class="btn-excluir" @click="excluir(produto)">
                <font-awesome-icon icon="fa-trash" /> <span>Excluir</span>
              </button>
              <button
                class="btn-editar"
                @click="selecionar(produto.id), this.$router.push('/cadastrar')"
              >
                <font-awesome-icon icon="fa-pencil" /> <span>Editar</span>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </main>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.tabela {
  width: 100%;
  margin: 20px;
}

.bloco {
  display: inline-block;
}

table {
  font-family: arial, sans-serif;
  border: 1px solid #dddddd;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.cabeça {
  font-weight: bolder;
  background-color: black;
  color: white;
}

tr:nth-child(even) {
  background-color: #292301;
  border: 1px solid #dddddd;
}
</style>
