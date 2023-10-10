<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <footer>
    <div class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h1 class="logo-text"><span>Spamton</span> Store</h1>
          <p>A Verdadeira Loja do Spamton!</p>
          <div class="contact">
            <span><FontAwesomeIcon icon="fa-phone" /> &nbsp; (47) 92222-2222</span>
            <span><FontAwesomeIcon icon="fa-envelope" /> &nbsp; paulocesarifc@gmail.com</span>
          </div>
          <div class="socials">
            <a href="#"><FontAwesomeIcon icon="fa-brands fa-github" /></a>
            <a href="#"><FontAwesomeIcon icon="fa-brands fa-instagram" /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.footer {
  background-color: black;
  color: #fff;
  font-size: 14px;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-section {
  flex: 1;
  padding: 25px;
}

.footer-section h1 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 10px;
}

.footer-section p {
  font-size: 14px;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.5;
}

.logo-text span {
  color: #fff;
}

.contact span {
  display: block;
  color: #fff;
  margin-bottom: 10px;
}

.contact span a {
  color: #fff;
  text-decoration: none;
}

.socials a {
  border: 1px solid #fff;
  width: 40px;
  height: 40px;
  display: inline-block;
  margin-right: 10px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #fff;
  transition: 0.3s;
}

.socials a:hover {
  background-color: #fff;
  color: #000;
}
</style>
