<template>
  <div class="login-container">

    <div class="login-card">

      <div class="header">
        <img :src="logo" alt="UPGREAT Logo" class="logo">
        <h2>Driver Portal</h2>

        <p class="subtitle">
        Login untuk melanjutkan
        </p>
      </div>

      <div class="form-group">
        <label>ID Driver</label>
        <input
          type="text"
          placeholder="Masukkan ID Driver"
        >
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Masukkan Password"
        >
      </div>

      <button
        class="btn-login"
        @click="login"
      >
        MASUK
      </button>

    <div class="help-text">
      Butuh bantuan?
      <a href="#">
        Hubungi Koordinator
      </a>
    </div>

  </div>

  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import logo from '../assets/logo.png'

const router = useRouter()

const login = () => {
  router.push('/dashboard')
}

</script>

<style scoped>

.login-container{
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:#f5f7fa;
}

.login-card{
  width:400px;
  background:white;
  padding:30px;
  border-radius:12px;
  box-shadow:0 4px 20px rgba(0,0,0,.1);
}

.header{
  text-align:center;
  margin-bottom:20px;
}

h2{
  color:#005A9C;
  margin-top:10px;
}

.logo{
  width:120px;
  height:auto;
  margin-bottom:10px;
}

.form-group{
  margin-bottom:15px;
}

.form-group label{
  display:block;
  margin-bottom:5px;
}

.form-group input{
  width:100%;
  padding:10px;
  border:1px solid #ddd;
  border-radius:6px;
}

.btn-login{
  width:100%;
  padding:12px;
  border:none;
  background:#005A9C;
  color:white;
  font-weight:bold;
  border-radius:6px;
  cursor:pointer;
}

.subtitle{
  color:#666;
  font-size:14px;
  margin-top:6px;
}

.help-text{
  margin-top:20px;
  text-align:center;
  font-size:13px;
  color:#666;
}

.help-text a{
  color:#005A9C;
  text-decoration:none;
  font-weight:600;
}

</style>