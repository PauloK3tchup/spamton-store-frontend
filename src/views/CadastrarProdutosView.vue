<script>
import ProdutosApi from '../api/produtos'
import CategoriasApi from '../api/categorias'
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'
import FabricantesApi from '../api/fabricantes'
import { ref, reactive } from 'vue'
import imageService from '@/services/images.js'
const produtosApi = new ProdutosApi()
const categoriasApi = new CategoriasApi()
const fabricantesApi = new FabricantesApi()

export default {
  data() {
    return {
      cadastro: 1,
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
      }),
      categoria: reactive({
        nome: '',
        descricao: ''
      }),
      fabricante: reactive({
        nome: '',
        descricao: '',
        site: '',
        email: ''
      })
    }
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['prodId', 'prodSelec', 'pesquisa', 'selec'])
  },
  methods: {
    ...mapActions(useCounterStore, ['selecionar', 'pesquisar']),

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
    },

    async saveCat() {
      await categoriasApi.adicionarCategoria(this.categoria)
      this.categoria = {}
    },

    async saveFab() {
      await fabricantesApi.adicionarFabricante(this.fabricante)
      this.fabricante = {}
    },

    async editarProduto() {
      const image = await imageService.uploadImage(this.file)
      this.produto.thumb_attachment_key = image.attachment_key
      await produtosApi.atualizarProduto(this.produto)
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
    },

    async buscarProduto() {
      if (this.cadastro == 2) {
        const data = await produtosApi.buscarProduto(this.produto.id)
        this.produto = data
      }
    },
    edit() {
      this.cadastro = this.selec
      this.produto.id = this.prodSelec
      this.buscarProduto()
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
    if (this.prodSelec != 0) {
      this.edit()
    }
  }
}
</script>
<template>
  <div class="form">
    <select
      v-if="cadastro != 2"
      class="inputSelect"
      name="cadastrar"
      id="optCadastro"
      v-model="cadastro"
    >
      <option :value="1">Cadastrar Produto</option>
      <option :value="3">Cadastrar Categoria</option>
      <option :value="4">Cadastrar Fabricante</option>
    </select>
  </div>
  <div v-if="cadastro == 1" class="form">
    <h1>Cadastrar Produto:</h1>
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
  <div v-if="cadastro == 2" class="form">
    <h1>Editar Produto:</h1>
    <input
      v-model="produto.id"
      class="inputTexto"
      type="number"
      placeholder="Id do Produto"
      required
      @change="buscarProduto"
    />
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

    <button class="btnSalvar" @click="editarProduto">
      <font-awesome-icon icon="fa-solid fa-floppy-disk" /> <span>Salvar</span>
    </button>
  </div>

  <div v-if="cadastro == 3" class="form">
    <h1>Cadastrar Categoria:</h1>
    <input
      v-model="categoria.nome"
      class="inputTexto"
      type="text"
      placeholder="Nome da Categoria"
      required
    />
    <input
      v-model="categoria.descricao"
      class="inputTexto"
      type="text"
      placeholder="Descrição da Categoria"
      required
    />
    <button class="btnSalvar" @click="saveCat">
      <font-awesome-icon icon="fa-solid fa-floppy-disk" /> <span>Salvar</span>
    </button>
  </div>
  <div v-if="cadastro == 4" class="form">
    <h1>Cadastrar Fabricante:</h1>
    <input
      v-model="fabricante.nome"
      class="inputTexto"
      type="text"
      placeholder="Nome do Fabricante"
      required
    />
    <input
      v-model="fabricante.descricao"
      class="inputTexto"
      type="text"
      placeholder="Descrição do Fabricante"
      required
    />
    <input
      v-model="fabricante.site"
      class="inputTexto"
      type="site"
      placeholder="Site do Fabricante"
      required
    />
    <input
      v-model="fabricante.email"
      class="inputTexto"
      type="email"
      placeholder="Email do Fabricante"
      required
    />
    <button class="btnSalvar" @click="saveFab">
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
