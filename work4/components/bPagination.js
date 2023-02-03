export const bPagination = {
  props: [
    "total_pages",
    "on_page"
  ],
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    handlePrePage() {
      this.currentPage = this.currentPage - 1;
    },
    handleCurrentPage(page) {
      console.log(page);
      this.currentPage = page;
    },
    handleNextPage() {
      this.currentPage = this.currentPage + 1;
    },
  },
  template: `#bPagination`
};
