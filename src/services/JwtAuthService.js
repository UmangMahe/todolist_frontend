import fetch from '../auth/FetchInterceptor'
import { LOGIN, REGISTER } from '@constants/ApiConstants'

const JwtAuthService = {}

JwtAuthService.login = function (email) {
	const form = new FormData()
	form.append('email', email)
	return fetch({
		url: LOGIN,
		method: 'post',
		data: form,
	})
}


JwtAuthService.signUp = function (data) {
	return fetch({
		url: REGISTER,
		method: 'post',
		data: data
	})
}

export default JwtAuthService