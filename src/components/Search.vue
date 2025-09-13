<template>
    <div class="search">
        <span class="searchInput "><input type="text" :placeholder="$t('message.search')" v-model="searchText"><img
                src="@/assets/svg/search.svg" alt=""></span>

        <button>{{ $t('message.search') }}</button>

    </div>
</template>

<script setup lang="ts">
import '@/style/Componets/search.css'
</script>