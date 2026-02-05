<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
const router = useRouter();

const isLogin = ref(true);

const email = ref('master@mail');
const password = ref('12345');

function submit() {
  if (!email.value || !password.value) return;
  console.log({
    mode: isLogin.value ? 'login' : 'register',
    email: email.value,
    password: password.value,
  });
  router.push('/master');
}
</script>

<template>
  <main class="auth">
    <section class="auth-container">
      <h1>
        {{ isLogin ? 'Вход мастера' : 'Регистрация мастера' }}
      </h1>

      <form class="form" @submit.prevent="submit">
        <label>
          Введите почту\логин:
          <Input placeholder="email" type="text" />
        </label>

        <label>
          Введите пароль:
          <Input placeholder="password" type="password" />
        </label>

        <Button type="default" size="medium" focusable> Войти </Button>
      </form>

      <Button type="default" size="large" focusable>Зарегестрироваться</Button>
    </section>
  </main>
</template>

<style>
.auth {
  font-family: 'Montserrat', sans-serif;
  width: 35rem;
  height: 40rem;
  border-radius: 2rem;
  box-shadow: 10px 30px 40px rgba(0, 0, 0, 0.048);
  margin: 15vh auto;
  padding: 25px;
}
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.auth-button {
  border: 1px solid black;
  width: 170px;
  height: 40px;
  color: black;
  background-color: inherit;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}
.registration-button {
  border: 1px solid black;
  width: 470px;
  height: 40px;
  color: black;
  background-color: inherit;
}
</style>
