<template>
  <div class="caixa">
    <img
      src="https://www.infoescola.com/wp-content/uploads/2010/04/banana_600797891.jpg"
      alt="Sexo"
      class="fotoProd"
    />
    <h1 class="precoProd">R$ 700,00</h1>
    <h3 class="nomeProd">Banana (tem potássio)</h3>
  </div>
</template>
<style scoped>
.caixa {
  display: inline-block;
  width: 250px;
  height: 300px;
  background-color: #000;
  border-radius: 10px;
  margin: 20px;
  transition: 0.15s;
}

.caixa:hover {
  transform: scale(1.1);
}
.caixa:active {
  transform: scale(0.9);
}

.fotoProd {
  width: 100%;
  height: 200px;
  border-radius: 10px 10px 0 0;
}
.precoProd {
  color: #fff;
  font-size: 20px;
  margin: 10px;
}
.nomeProd {
  color: #fff;
  font-size: 15px;
  margin: 10px;
}
</style>
