export const bPagination = {
  props: ["total_pages"],
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    previousPage() {
      this.currentPage = this.currentPage - 1;

    },
    nextPage() {
      this.currentPage = this.currentPage + 1;
    },
  },
  template: `#bPagination`
};
