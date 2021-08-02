const mutations = {
  IsAddDialogShow(state, bol) {
    state.addDialogVisible = bol
  },
  IsEditDialogShow(state, bol) {
    state.editDialogVisible = bol
  },
  IsSetDialogShow(state, bol) {
    state.setDialogVisible = bol
  },
  IsAddRoleDialogShow(state, bol) {
    state.addRoleDialogVisible = bol
  },
  IsEditRoleDialogShow(state, bol) {
    state.editRoleDialogVisible = bol
  },
  IsSetRoleDialogShow(state, bol) {
    state.setRoleDialogVisible = bol
  },
  IseditGoodsDialogShow(state, bol) {
    state.editGoodsDialogVisible = bol
  }
}

export default mutations