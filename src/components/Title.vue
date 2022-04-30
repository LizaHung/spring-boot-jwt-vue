<template>
  <div class="content-header p-2">
    <div class="container-fluid pl-0">
      <div class="row mb-0">
        <div class="col-sm-6 p-2"><h4 class="m-0 title">{{ title }}</h4></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: ['title', 'path'],
}
</script>