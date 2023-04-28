import storage from 'good-storage'

const MENU_IDX = '__menuIdx__'
const SUB_MENU_IDX = '__subMenuIdx__'
const CURRENT_VIDEO_ITEM = '__currentVideoItem__'
const DETAIL_VIDEO_ITEM = '__detailVideoItem__'


export const loadMenuIdx = () => {
  return storage.session.get(MENU_IDX, 0)
}

export const saveMenuIdx = (flag) => {
  storage.session.set(MENU_IDX, flag)
  return flag
}

export const loadSubMenuIdx = () => {
  return storage.session.get(SUB_MENU_IDX, 0)
}

export const saveSubMenuIdx = (flag) => {
  storage.session.set(SUB_MENU_IDX, flag)
  return flag
}

export const loadCurrentVideoItem = () => {
  return storage.session.get(CURRENT_VIDEO_ITEM, { content: {} })
}

export const saveCurrentVideoItem = (flag) => {
  storage.session.set(CURRENT_VIDEO_ITEM, flag)
  return flag
}

export const loadDetailVideoItem = () => {
  return storage.session.get(DETAIL_VIDEO_ITEM, {})
}

export const saveDetailVideoItem = (flag) => {
  storage.session.set(DETAIL_VIDEO_ITEM, flag)
  return flag
}