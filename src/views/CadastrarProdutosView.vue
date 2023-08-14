<script>
import ProdutosApi from '../api/produtos'
import axios from 'axios'
const produtosApi = new ProdutosApi()

export default {
  data() {
    return {
      checked: false,
      produto: {},
      produtos: [],
      categorias: [],
      fabricantes: [],
      thumbnail: null
    }
  },
  methods: {
    async buscarCategoria() {
      axios
        .get('/categorias/')
        .then((response) => {
          this.categorias = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async buscarFabricante() {
      axios
        .get('/fabricantes/')
        .then((response) => {
          this.fabricantes = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async salvar() {
      if (this.produto.id) {
        await produtosApi.atualizarProduto(this.produto)
      } else {
        await produtosApi.adicionarProduto(this.produto)
      }
      this.produto = {}
      this.produtos = await produtosApi.buscarProdutos()
    },
    editar(produto) {
      Object.assign(this.produto, produto)
    },
    async excluir(produto) {
      await produtosApi.excluirProduto(produto.id)
      this.produtos = await produtosApi.buscarProdutos()
    },
    onFileChange(e) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      axios
        .post('/media/thumbnails/', formData)
        .then(() => {
          console.log('SUCCESS')
        })
        .catch(() => {
          console.log('FAILED')
        })
    }
  },
  watch: {
    checked() {
      this.produto.promo = this.checked
    }
  },
  uploadFile() {
    this.Images = this.$refs.file.files[0]
  },
  mounted() {
    this.buscarCategoria()
    this.buscarFabricante()
  }
}
</script>
<template>
  <div class="form">
    <input
      v-model="produto.nome"
      class="inputEnviar"
      type="text"
      placeholder="Nome do Produto"
      required
    />
    <input
      v-model="produto.descricao"
      class="inputEnviar"
      type="text"
      placeholder="Descrição do Produto"
      required
    />
    <input
      v-model="produto.quantidade"
      class="inputEnviar"
      type="number"
      placeholder="Quantidade do Produto"
      required
    />
    <input
      v-model="produto.preco"
      class="inputEnviar"
      type="number"
      placeholder="Preço do Produto"
      required
    />
    <input v-model="checked" type="checkbox" required id="promo" />
    <label for="promo">Promoção</label>
    <input
      v-model="produto.precoPromo"
      v-if="checked"
      class="inputEnviar"
      type="number"
      placeholder="Preço Promoção do Produto"
      required
    />
    <select v-model="produto.categoria" required class="inputEnviar">
      <option disabled selected value="1">Categoria</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.nome }}
      </option>
    </select>
    <select v-model="produto.fabricante" required class="inputEnviar">
      <option disabled selected value="1">Fabricante</option>
      <option v-for="fabricante in fabricantes" :key="fabricante.id" :value="fabricante.id">
        {{ fabricante.nome }}
      </option>
    </select>
    <input type="file" v-on:change="produto.thumbnail" accept="image" />
    <button class="btn" @click="salvar">
      <font-awesome-icon icon="fa-solid fa-floppy-disk" /> <span>Salvar</span>
    </button>
  </div>
</template>
