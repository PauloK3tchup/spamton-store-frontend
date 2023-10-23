<script>
import { useCounterStore } from '../stores/counter'
import { mapStores, mapActions, mapState } from 'pinia'
import ProdutosApi from '../api/produtos'
import ComprasApi from '../api/compras'
import { reactive } from 'vue'
const produtosApi = new ProdutosApi()
const comprasApi = new ComprasApi()

export default {
  data() {
    return {
      token_id: localStorage.getItem('id'),
      produto: {},
      id: '',
      imagens: [],
      imagensSim: [],
      categoria: '',
      fabricante: '',
      compra: reactive({
        itens: [
          {
            produto: '',
            quantidade: 1
          }
        ],
        usuario: ''
      })
    }
  },
  computed: {
    ...mapStores(useCounterStore),
    ...mapState(useCounterStore, ['prodId', 'prodSelec'])
  },
  methods: {
    ...mapActions(useCounterStore, ['pesquisar']),

    async carrinho() {
      ;(this.compra.itens = [
        {
          produto: this.id,
          quantidade: 1
        }
      ]),
        (this.compra.usuario = parseInt(this.token_id))
      try {
        await comprasApi.adicionarCompra(this.compra)
        alert('Produto adicionado ao carrinho')
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    this.prodSelec = localStorage.getItem('prodSelec')
    try {
      const response = await produtosApi.buscarProduto(this.prodSelec)
      this.produto = response
      this.imagensSim = this.produto.imagens
      this.categoria = this.produto.categoria
      this.fabricante = this.produto.fabricante
      this.id = this.produto.id
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<template>
  <div class="caixaProd">
    <div class="fotoProduto">
      <div class="wrapper">
        <nav class="lil-nav">
          <a v-for="imagem in imagensSim" :key="imagem.id" :href="'#' + imagem.file">
            <img class="lil-nav__img" :src="imagem.file" :alt="'Foto' + imagem.id" />
          </a>
        </nav>
        <div class="gallery">
          <div class="gallery__img" v-for="imagem in imagensSim" :key="imagem.id" :id="imagem.file">
            <img :src="imagem.file" :alt="'Foto' + imagem.id" />
          </div>
        </div>
      </div>
    </div>
    <div class="textoProduto">
      <h1 v-if="!produto.promo" class="precoProd">R${{ produto.preco }}</h1>
      <p v-if="produto.promo" class="precoAntigo">R${{ produto.preco }}</p>
      <h1 v-if="produto.promo" class="precoPromo">R${{ produto.precoPromo }}</h1>
      <h3 class="nomeProd">{{ produto.nome }}</h3>
      <div class="botaoComprar">
        <h3>Comprar</h3>
      </div>
      <div @click="carrinho" class="botaoCarrinho">
        <h3>Carrinho</h3>
      </div>
    </div>
  </div>
  <div class="caixaProd2">
    <div class="desc">
      <div class="descricao">
        <h3><span class="negrito">Descrição: </span>{{ produto.descricao }}</h3>
      </div>
      <hr />
      <div class="coisasDiv">
        <div class="fabricante">
          <h3><span class="negrito">Fabricante: </span>{{ fabricante.nome }}</h3>
          <h3 class="italico">"{{ fabricante.descricao }}"</h3>
          <h3 v-if="fabricante.email">
            <span class="negrito">Email para Contato: </span>{{ fabricante.email }}
          </h3>
          <h3 v-if="fabricante.site">
            <span class="negrito">Website: </span>
            <a :href="fabricante.site">{{ fabricante.site }}</a>
          </h3>
        </div>
        <div class="categoria">
          <h3><span class="negrito">Categoria: </span>{{ categoria.nome }}</h3>
          <h3 class="italico">"{{ categoria.descricao }}"</h3>
        </div>
      </div>
    </div>
  </div>
  <div class="caixaProd2">
    <div class="desc">
      <div class="descricao"><h1>Comentários</h1></div>
      <hr />
      <div class="inputComment">
        <input type="text" id="comentario" placeholder="Escreva Um Comentário" />
        <button class="botaoEnviar"><h3>Enviar</h3></button>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import '../assets/slideshow.css';

.caixaProd {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#comentario {
  width: 80%;
  height: 40px;
  padding: 5px;
  border-radius: 10px;
  margin: 2%;
  border: none;
}

.precoAntigo {
  text-decoration: line-through;
  color: rgb(255, 0, 0);
}

.precoPromo {
  color: rgb(0, 255, 0);
}

.italico {
  font-style: italic;
}

.descricao {
  padding: 2%;
}

.fabricante {
  display: inline-block;
  width: 45%;
  height: auto;
  padding: 2%;
  vertical-align: top;
}

.categoria {
  display: inline-block;
  width: 45%;
  height: auto;
  padding: 2%;
  vertical-align: top;
}

.negrito {
  font-weight: bold;
}

.caixaProd2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.precoProd,
.precoPromo {
  font-size: 40px;
}

.desc {
  display: flex;
  width: 1000px;
  margin: 10px 10px 10px 10px;
  padding: 10px;
  height: auto;
  background-color: rgb(0, 0, 0);
  display: inline-block;
  vertical-align: top;
  color: white;
}

.botaoEnviar {
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  background-color: rgb(255, 0, 0);
  color: white;
  cursor: pointer;
  transition: 0.15s;
  width: 10%;
  height: 40px;
  padding: 5px;
  border-radius: 10px;
  margin: 2%;
  border: none;
}

.botaoComprar {
  margin-right: 4px;
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 40px;
  text-align: center;
  padding: 5px;
  border-radius: 10px;
  background-color: rgb(255, 0, 0);
  color: white;
  cursor: pointer;
  transition: 0.15s;
}

.botaoComprar:hover,
.botaoEnviar:hover,
.botaoCarrinho:hover {
  transform: scale(1.1);
}

.botaoComprar:active,
.botaoEnviar:active,
.botaoCarrinho:active {
  transform: scale(0.9);
}

.botaoCarrinho {
  margin-left: 4px;
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 40px;
  text-align: center;
  padding: 5px;
  border-radius: 10px;
  background-color: rgb(243, 227, 8);
  color: rgb(0, 0, 0);
  cursor: pointer;
  transition: 0.15s;
}

.fotoProd {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fotoProduto {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin: 10px 0 10px 10px;
  padding: 10px;
  height: 500px;
  background-color: black;
  display: inline-block;
}
.textoProduto {
  display: flex;
  width: 500px;
  margin: 10px 10px 10px 0;
  padding: 10px;
  height: 500px;
  background-color: rgb(0, 0, 0);
  display: inline-block;
  vertical-align: top;
  color: white;
}
</style>
