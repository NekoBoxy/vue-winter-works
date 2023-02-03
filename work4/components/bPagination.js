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
      this.$emit("on_page", this.currentPage);
    },
    handleCurrentPage(page) {
      this.currentPage = page;
      this.$emit("on_page", this.currentPage);
    },
    handleNextPage() {
      this.currentPage = this.currentPage + 1;
      this.$emit("on_page", this.currentPage);
    },
  },
  template: `#bPagination`
};
