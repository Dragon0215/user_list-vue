<template>
    <div class="container">
      <my-modal v-model:show="modalVisible">
        <comment-form @addComment="createComment" />
      </my-modal>
      <div class="w-100 d-flex justify-content-end">
        <input
          type="text"
          class="form-control my-3 w-25"
          placeholder="Search..."
          v-model="searchQuery"
        />
        <my-select
          class="w-25 my-3 mx-3"
          v-model="selectedSort"
          :options="selectOptions"
        />
        <button @click="showModal" class="btn btn-primary my-3" type="submit">
            Add new lists
        </button>
      </div>
      <comment-list
        class="mb-5"
        :comments="sortedAndSearchComments"
        @remove="removeComment"
        v-if="!isLoading"
      />
      <div v-else>
        <h2 class="load text-danger">
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </h2>
      </div>
      <footer>
        <div class="score bg-primary text-white"><b>Score: </b>{{ comments.length }}</div>
        <div class="reset bg-danger text-white" @click="reset">Clear</div>
        <nav aria-label="Page navigation example mb-5">
          <ul class="pagination m-0">
            <ul class="pagination" v-if="page <= 1">
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
            </ul>
            <ul class="pagination" v-else>
              <li class="page-item" @click="prevPage">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
            </ul>
            <li
              class="page-item"
              v-for="pageNum in totalPage"
              @click="changePage(pageNum)"
              :key="pageNum.id"
            >
              <a class="page-link" :class="{ 'current-page': page == pageNum }">{{ pageNum }}</a>
            </li>
            <ul class="pagination" v-if="page == 10">
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
            <ul class="pagination" v-else>
              <li class="page-item" @click="nextPage">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </ul>
        </nav>
      </footer>
    </div>
  </template>
  
  <script>
  import CommentForm from "@/components/CommentForm";
  import CommentList from "@/components/CommentList";
  import axios from "axios";
  
  export default {
    components: {
      CommentForm,
      CommentList,
    },
    data() {
      return {
        comments: [],
        isLoading: false,
        modalVisible: false,
        selectedSort: "",
        searchQuery: "",
        page: 1,
        limit: 50,
        totalPage: 0,
        selectOptions: [
          { value: "name", name: "Filter by name" },
          { value: "email", name: "Filter by email" },
        ],
      };
    },
    methods: {
      createComment(comment) {
        this.comments.push(comment);
        this.modalVisible = false;
      },
      removeComment(comment) {
        this.comments = this.comments.filter((c) => c.id !== comment.id);
      },
      showModal() {
        this.modalVisible = true;
      },
      reset() {
        this.comments.length = 0;
      },
      changePage(page) {
        this.page = page;
        this.fetchComments();
      },
      nextPage() {
        this.page++;
        this.fetchComments();
      },
      prevPage() {
        this.page--;
        this.fetchComments();
      },
      async fetchComments() {
        try {
          this.isLoading = true;
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/comments",
            {
              params: {
                _limit: this.limit,
                _page: this.page,
              },
            }
          );
          this.totalPage = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.comments = response.data;
          this.isLoading = false;
        } catch (error) {
          alert(error.message);
          document.querySelector(".load").innerHTML = error.message;
        }
      },
    },
    mounted() {
      this.fetchComments();
    },
    // watch: {
    //   selectedSort(newValue) {
    //     this.comments.sort((comm1, comm2) => {
    //       if (newValue === "name") {
    //         return comm1.name.localeCompare(comm2.name);
    //       } else if (newValue === "email") {
    //         return comm1.email.localeCompare(comm2.email);
    //       }
    //     });
    //   },
    // }
    computed: {
      filteredComments() {
        return [...this.comments].sort((comm1, comm2) => {
          if (this.selectedSort === "name") {
            return comm1.name.localeCompare(comm2.name);
          } else if (this.selectedSort === "email") {
            return comm1.email.localeCompare(comm2.email);
          }
        });
      },
      sortedAndSearchComments() {
        return this.filteredComments.filter(
          (comment) =>
            comment.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            comment.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  footer {
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background: rgba(81, 81, 81, 0.9);
    box-shadow: 0 -5px 5px rgb(81, 81, 81, 0.9);
  }
  .score {
    width: 100px;
    padding: 10px;
    border-radius: 6px;
  }
  
  .reset {
    width: 80px;
    text-align: center;
    padding: 10px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 6px;
    margin: 0 15px;
  }
  
  .current-page {
    background: #007bff;
    color: #ffff;
  }
  
  li {
    cursor: pointer;
  }
  
  .lds-roller {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  .lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #000;
    margin: -4px 0 0 -4px;
  }
  .lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
  }
  .lds-roller div:nth-child(1):after {
    top: 63px;
    left: 63px;
  }
  .lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
  }
  .lds-roller div:nth-child(2):after {
    top: 68px;
    left: 56px;
  }
  .lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
  }
  .lds-roller div:nth-child(3):after {
    top: 71px;
    left: 48px;
  }
  .lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
  }
  .lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
  }
  .lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
  }
  .lds-roller div:nth-child(5):after {
    top: 71px;
    left: 32px;
  }
  .lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
  }
  .lds-roller div:nth-child(6):after {
    top: 68px;
    left: 24px;
  }
  .lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
  }
  .lds-roller div:nth-child(7):after {
    top: 63px;
    left: 17px;
  }
  .lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
  }
  .lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12px;
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  </style>