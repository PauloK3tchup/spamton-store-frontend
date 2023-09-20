<script>
import ProdutosApi from '../api/produtos'
import CategoriasApi from '../api/categorias'
import FabricantesApi from '../api/fabricantes'
import { ref, reactive } from 'vue'
import imageService from '@/services/images.js'
const produtosApi = new ProdutosApi()
const categoriasApi = new CategoriasApi()
const fabricantesApi = new FabricantesApi()

export default {
  data() {
    return {
      checked: false,
      categorias: ref([]),
      fabricantes: ref([]),
      coverUrl: ref(''),
      file: ref(null),
      files: ref(null),
      produto: reactive({
        nome: '',
        descricao: '',
        preco: '',
        quantidade: '',
        categoria: '',
        fabricante: '',
        promo: false,
        precoPromo: ''
      })
    }
  },
  methods: {
    async buscarCategoria() {
      const data = await categoriasApi.buscarCategoria()
      this.categorias = data
    },

    async buscarFabricante() {
      const data = await fabricantesApi.buscarFabricante()
      this.fabricantes = data
    },

    onFileChange(e) {
      this.file = e.target.files[0]
      this.coverUrl = URL.createObjectURL(this.file)
    },

    onFileChange2(e) {
      this.files = e.target.files
    },

    async save() {
      const image = await imageService.uploadImage(this.file)
      //const images = await imageService.uploadImage(this.files[0])
      this.produto.thumb_attachment_key = image.attachment_key
      //this.produto.imagens_attachment_key = Array(images.id)
      await produtosApi.adicionarProduto(this.produto)
      Object.assign(this.produto, {
        id: '',
        nome: '',
        descricao: '',
        preco: '',
        quantidade: '',
        categoria: '',
        fabricante: '',
        promo: false,
        precoPromo: '',
        thumb_attachment_key: ''
        //  imagens_attachment_key: []
      })
      this.produto = {}
      this.coverUrl = ''
    }
  },
  watch: {
    checked() {
      this.produto.promo = this.checked
    }
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

    <select v-model="produto.categoria">
      <option disabled value="">Selecione uma Categoria</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.nome }}
      </option>
    </select>

    <select v-model="produto.fabricante">
      <option disabled value="">Selecione um Fabricante</option>
      <option v-for="fabricante in fabricantes" :key="fabricante.id" :value="fabricante.id">
        {{ fabricante.nome }}
      </option>
    </select>

    <div>
      <p>Thumbnail Do Produto</p>
      <input id="thumb" type="file" @change="onFileChange" />
      <div>
        <img class="thumb" v-if="coverUrl" :src="coverUrl" />
      </div>
    </div>
    <!-- <div>
      <label for="imagens">Imagens do Produto</label>
      <input multiple id="imagens" type="file" @change="onFileChange2" />
    </div> -->

    <button class="btn" @click="save">
      <font-awesome-icon icon="fa-solid fa-floppy-disk" /> <span>Salvar</span>
    </button>
  </div>
</template>
<style scoped>
input {
  margin: 5px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
.thumb {
  width: 100px;
  height: 100px;
}
</style>
