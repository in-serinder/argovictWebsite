<template>
    <div class="commission-board-body">
        <!-- 分割条 -->
        <div class="commission-board-split"></div>
        <!-- 滚动图片区 -->
        <div class="commission-board-scroll">
            <ul>
                <!-- <li>1</li>
                <li>2</li>
                <li>3</li> -->
                <li><img src="@/assets/picture/test/test1.jpg" alt=""></li>
                <li><img src="@/assets/picture/test/test2.jpg" alt=""></li>
                <li><img src="@/assets/picture/test/test3.jpg" alt=""></li>
                <li><img src="@/assets/picture/test/test4.png" alt=""></li>

            </ul>
            <!-- <div class="commission-board-scroll-item">
                <img src="@/assets/picture/Tired.jpg" alt="">
            </div> -->
            <!-- 切换按钮 -->
            <div class="commission-board-scroll-btn">
                <button @click="changeLeft(-100)">&lt;</button>
                <button @click="changeLeft(100)">&gt;</button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import '@/style/Commission/commissionBoard.css'
import { time } from 'console';
import { ref, onMounted, onBeforeUnmount } from 'vue'


let timer: NodeJS.Timeout | null = null;
const left = ref(0);

const changeLeft = (val: number) => {
    left.value += val;

    const board = document.querySelector('.commission-board-scroll ul') as HTMLElement;
    if (left.value > 300) {
        left.value = 0;
    }
    board.style.transform = `translateX(${-left.value}%)`;
}


onMounted(() => {

    // const board = document.querySelector('.commission-board-scroll ul') as HTMLElement;


    timer = setInterval(() => {

        changeLeft(100);
        // console.log('滚动');
        // left.value += 100;
        // if (left.value > 300) {
        //     left.value = 0;
        // }
        // board.style.transform = `translateX(${-left.value}%)`;
        // console.log(board.style.transform);
    }, 3000);
})

onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    // console.log('组件卸载');
})

</script>
