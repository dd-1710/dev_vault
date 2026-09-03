export const addSnippetValidator = (name, value) => {
  switch (name) {
    case "title":
      if (!value || value.trim() === "") {
        return "Title is required.";
      } else if (!titleRegex.test(value)) {
        return "Title can contain only letters and underscores";
      } else if (value.length < 5) {
        return "Title cannot be less than 5 characters.";
      } else if (value.length > 25) {
        return "Title cannot be more than 25 characters.";
      }
      return "";
    case "language":
      if (!value || value.trim() === "") {
        return "Language cannot be empty.";
      } else if (!languageRegex.test(value)) {
        return "Language can only start with letter and can contain numbers ";
      } else if (value.length < 2) {
        return "Language cannot have less that 2 characters.";
      } else if (value.length > 12) {
        return "Language cannot have more than 12 characters";
      }
      return "";

    case "code":
      if (!value || value.trim() === "") {
        return "Code cannot be empty.";
      } else if (value.length < 10) {
        return "Code must be at least 10 characters.";
      } else if (value.length > 5000) {
        return "Code cannot exceed 5000 characters.";
      }else if (/^[A-Za-z\s]+$/.test(value)) {
        return "Code looks like plain text, please enter actual code.";
       }
      return "";

    case "desc":
      if (!value || value.trim() === '') {
        return "";
      } else if (!/^[A-Za-z][A-Za-z0-9_&\s:/.?=-]*$/.test(value)) {
        return "Description must start with a letter.";
      }else if(value.length < 10){
           return "Description cannot be less than 10 characters."
      }else if(value.length > 300){
           return "Description cannot be greater than 100 characters."
      }
      return "";
    case "tags":
      if (!value || value.trim() === "") {
        return "";
      }
      //  else if (!/^[A-Za-z]*$/.test(value)) {
      //   return "Tags can only contain letters";
      // }
      else if(value.length < 5){
          return "Tag cannot be less than 5 characters"
      }else if(value.length > 100){
        return "Tag cannot be more than 100 characters."
      }
       return ""
    default:
      return "";
  }
};

const titleRegex = /^[A-Za-z_][A-Za-z0-9_\s]*$/;
const languageRegex = /^[A-Za-z][A-Za-z0-9.-_#]*$/;
