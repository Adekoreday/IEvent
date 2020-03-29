export default (value) => {
    if (value !== '') {
      return value.toLowerCase();
    }
    return value;
  };