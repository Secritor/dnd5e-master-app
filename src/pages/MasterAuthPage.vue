<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isLogin = ref(true);

const email = ref("master@mail");
const password = ref("12345");

function submit() {
  if (!email.value || !password.value) return;
  console.log({
    mode: isLogin.value ? "login" : "register",
    email: email.value,
    password: password.value,
  });
  router.push("/master");
}
</script>

<template>
  <main class="auth">
    <h1>
      {{ isLogin ? "Вход мастера" : "Регистрация мастера" }}
    </h1>

    <form class="form" @submit.prevent="submit">
      <label>
        Email
        <input type="email" v-model="email" required />
      </label>

      <label>
        Пароль
        <input type="password" v-model="password" required />
      </label>

      <button type="submit">
        {{ isLogin ? "Войти" : "Зарегистрироваться" }}
      </button>
    </form>

    <button class="switch" @click="isLogin = !isLogin">
      {{
        isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"
      }}
    </button>
  </main>
</template>

<style>
.auth {
  width: 35rem;
  height: 40rem;
  background-color: beige;
  border-radius: 2rem;
  margin: 15vh auto;
}
</style>
