<template>
  <div class="card">
    <div class="card-header">댓글 목록</div>
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item" :key="idx" v-for="(comment, idx) in commentList">
          <div class="container">
            <div class="row text-start">
              {{ comment.content }}
            </div>
            <div class="row">
              <div class="col-9 text-end">
                {{ comment.writer }}
              </div>
              <div class="col-3 text-center">
                {{ dateFormat(comment.created_date, 'yyyy-MM-dd') }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//CommentList.vue
import axios from 'axios';
import { shallowRef } from 'vue';

export default {
  props: ['bno'],
  setup(props){
    // data, computed, methods
    const commentList = shallowRef([]);
    const getCommentList = async () => {
      let result = await axios.get(`/api/boards/${props.bno}/comments`)
        .catch(err => console.log(err));
      commentList.value = result.data;
    }
    return {
      commentList,
      getCommentList,
    }
  },
  created() {
    this.getCommentList();
  },
  methods: {
    dateFormat(value, format) {
      let date = value == null ? new Date() : new Date(value);

      let year = date.getFullYear();
      let month = ('0' + (date.getMonth() + 1)).slice(-2);
      let day = ('0' + date.getDate()).slice(-2);

      let result = format.replace('yyyy', year)
        .replace('MM', month)
        .replace('dd', day);
      return result;
    }
  }
}
</script>
