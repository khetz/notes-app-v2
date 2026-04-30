import { Category } from "../../features/categories/models/category.model";

export type AddCategoryModal = {
    type: 'addCategory'
}

export type EditCategoryModal = {
    type: 'editCategory';
    category: Category;
}

export type DeleteCategoryModal = {
    type: 'deleteCategory';
    category: Category;
}

export type ModalState = AddCategoryModal | EditCategoryModal | DeleteCategoryModal;