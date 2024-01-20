import { API_BASE_URL } from "../configs/AppConfig"

export const LOGIN = API_BASE_URL + '/auth/login'
export const REGISTER = API_BASE_URL + '/auth/register'


export const NOTES = API_BASE_URL + '/notes'
export const EDIT_NOTE = NOTES+'/edit'
export const DELETE_NOTE = NOTES+'/delete'
export const ADD_NOTE = NOTES+'/add'