const initialState = {
    CurrentLang: localStorage.getItem('langconfig') != null ? localStorage.getItem('langconfig') : 'en',
    dark: localStorage.getItem('dark') != null ? true : false,
    currentPage: 'Loading',
    endpoint: {
      web: 'https://cpxdevapi' + (Math.floor(Math.random() * 2) + 1).toString() +'.azurewebsites.net',
      api: 'https://api-qcw7.onrender.com'
    }
  };
  
  function Reducer(state = initialState, action) {
    switch(action.type) {
      case 'SET_LANG':
        return { ...state, CurrentLang: action.val };
      case 'SET_DARK':
        return { ...state, dark: action.val };
      case 'SET_PAGE':
        return { ...state, currentPage: action.val };
      default:
        return state;
    }
  }
  
  export default Reducer;
  