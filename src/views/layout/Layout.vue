<template>
<div>
  <Header />
  <div id="layoutSidenav">
    <Aside />
    <main :class="'main'">
      <router-view />
    </main>
  </div>
  
</div>
</template>

<script>
import Header from './Header'
import Aside from './Aside'
export default {
  name: 'Layout',
  components: { Header, Aside },
  data(){
    return {
    }
  },
}
</script>

