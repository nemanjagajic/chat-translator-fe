// @ts-ignore
import io from 'socket.io-client'
import { BASE_API_ENDPOINT } from '../services/request'

const socket = io(BASE_API_ENDPOINT, {
  transports: ['websocket'],
})

export default socket