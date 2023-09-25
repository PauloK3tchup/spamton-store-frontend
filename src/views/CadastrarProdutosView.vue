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
      class="inputTexto"
      type="text"
      placeholder="Nome do Produto"
      required
    />
    <input
      v-model="produto.descricao"
      class="inputTexto"
      type="text"
      placeholder="Descrição do Produto"
      required
    />
    <input
      v-model="produto.quantidade"
      class="inputTexto"
      type="number"
      placeholder="Quantidade do Produto"
      required
    />
    <input
      v-model="produto.preco"
      class="inputTexto"
      type="number"
      placeholder="Preço do Produto"
      required
    />
    <div class="promo">
      <input class="checkPromo" v-model="checked" type="checkbox" required id="promo" />
      <span> <label class="labelPromo" v-if="!checked" for="promo">Promoção</label></span>
      <input
        v-model="produto.precoPromo"
        v-if="checked"
        class="inputPromo"
        type="number"
        placeholder="Preço Promoção do Produto"
        required
      />
    </div>

    <select class="inputSelect" v-model="produto.categoria">
      <option disabled value="">Selecione uma Categoria</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.nome }}
      </option>
    </select>

    <select class="inputSelect" v-model="produto.fabricante">
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

    <button class="btnSalvar" @click="save">
      <font-awesome-icon icon="fa-solid fa-floppy-disk" /> <span>Salvar</span>
    </button>
  </div>
</template>
<style scoped>
input {
  margin: 5px;
}

.checkPromo {
  width: 20px;
  height: 20px;
  margin: 5px 200px 5px 5px;
  float: left;
}

.labelPromo {
  margin: 0 400px 0 -195px;
}

.checkPromo:checked {
  margin: -1px 5px 6px 13px;
  width: 20px;
  height: 20px;
}

.promo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.inputPromo {
  width: 460px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
}

.inputSelect {
  width: 500px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
}

.inputTexto {
  width: 500px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
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
