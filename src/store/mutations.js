const mutations = {
  IsAddDialogShow(state, bol) {
    state.addDialogVisible = bol
  },
  IsEditDialogShow(state, bol) {
    state.editDialogVisible = bol
  },
  IsSetDialogShow(state, bol) {
    state.setDialogVisible = bol
  }
}

export default mutations