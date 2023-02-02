export const bPagination = {
  props: ["total_pages", "on_page"],
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    previousPage() {
      this.currentPage = this.currentPage - 1;
      // this.$emit('on_page', this.currentPage);
    },
    nextPage() {
      this.currentPage = this.currentPage + 1;
    },
  },
  template: `#bPagination`
};
