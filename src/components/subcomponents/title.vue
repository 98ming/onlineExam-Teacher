<template>
    <div class="title-container">
        <span :class="img"></span>
        {{info}}
    </div>
</template>

<script>
    export default {
        props : ['img','info']
    }
</script>
<style lang="scss" scoped>
    .title-container{
        font-size: 35px;
        padding: 20px 27px;
        letter-spacing: 5px;
    }
</style>