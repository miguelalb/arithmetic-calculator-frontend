<script setup>
  
  const hostedUIURL = import.meta.env.VITE_LOGIN_HOSTEDUI_URL || ''
  
  const redirectToHostedUISignin = (event) => {    
    window.location.href = hostedUIURL
  }
  
</script>

<template>
  <div class="signin">
      <div class="mx-auto my-5">
        <Button label="Signin" @click="redirectToHostedUISignin"/>
      </div>
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {
  .signin {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 1023px) {
  .signin {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

</style>
