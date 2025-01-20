export class CategoryManager {
  constructor(questions) {
    this.questions = questions;
  }

  getCategories() {
    return Object.keys(this.questions[0]);
  }

  formatCategoryName(category) {
    return category.replace(/_/g, " ");
  }
}
