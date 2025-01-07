<template>
    <div class="container">
        <table class="table table-hover">
            <caption> total : {{ count }}</caption>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                    <th>댓글 수</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(board, i) in boardList" @click="goToDetail(board.no)">
                    <td>{{ board.no }}</td>
                    <td>{{ board.title }}</td>
                    <td>{{ board.writer }}</td>
                    <td>{{ userDateUtils.dateFormat(board.created_date, 'yyyy-MM-dd') }}</td>
                    <td>{{ board.comment }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import axios from 'axios';
import userDateUtils from '@/utils/useDates.js';
import { ajaxUrl } from '@/utils/commons.js';

// composition api
import { shallowRef, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';


const boardList = shallowRef([]); // 반응형 데이터 선언
// const message = ''; // 비반응형
/*
ref() : 자기 자신이 교체 + 자신의 프로퍼티 변경 감지(수정)
reactive() : 자신의 프로퍼티 변경 감지 + 중첩 프로퍼티 변경 감지(등록)
shallowRef() : 한번 변경후 이후 감지 못함 (readonly)
shallowReactive() : 
*/

const getBoardList = async function(){
    let result = await axios.get(`${ajaxUrl}/boards`)
                            .catch(err => console.log(err));
    boardList.value = result.data;
};

const count = computed(()=> {
    return boardList.value.length;
});

const router = useRouter();
const goToDetail = function (boardNo){
    router.push({ name : 'boardInfo', params : { bno : boardNo } });
};

onBeforeMount(()=>{
    getBoardList();
});


/*
export default {
    data() {                // ref()
        return {
            boardList: []
        };
    },
    created() {             // onBeforeMount()
        this.getBoardList();
    },
    methods: {
        async getBoardList() {            
            let result = await axios.get(`${ajaxUrl}/boards`)
                                    .catch(err => console.log(err));
            this.boardList = result.data;
        },
        goToDetail(boardNo) {
            this.$router.push({ name : 'boardInfo', params : { bno : boardNo }});
        },
        dateFormat(value, format) {
            return userDateUtils.dateFormat(value, format);
        }
    }
}*/
</script>
<style scoped>
table * {
    text-align: center;
}
</style>
