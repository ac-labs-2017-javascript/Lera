export function Store(state, reducer){
  return {
    getState : function(){
      return state;
    },
    dispatch : function(action){
      state = reducer(state, action);
    }
  };
}

export function wrapStore(store, fns){
  var dispatch = store.dispatch;
  for(var i = 0; i< fns.length; i++){
    dispatch = fns[i](dispatch, store.getState);
  }
  return {
    getState : store.getState,
    dispatch : dispatch
  };
}
