import { Chat } from '../../ts/chats'

export const chats: Chat[] = [
  {
    _id: '623cb3c7123921131c7f7b96',
    lastMessage: {
      _id: '623cb420123921131c7f7b9e',
      text: 'kakav si?',
      createdAt: '2022-03-24T18:10:40.597Z',
      senderId: '623cb320123921131c7f7b90'
    },
    friend: {
      showOriginalMessages: true,
      _id: '623cb320123921131c7f7b90',
      email: 'mika@gmail.com',
      firstName: 'Mika',
      lastName: 'Mikic'
    },
    me: {
      showOriginalMessages: true,
      _id: '6238da98083803aeebb0d55e',
      email: 'nemanja@gmail.com',
      firstName: 'Nemanja',
      lastName: 'Gajic'
    }
  },
  {
    _id: '6238db3b083803aeebb0d565',
    lastMessage: {
      _id: '6238e44f1e34f0b6938581b6',
      text: 'it works',
      createdAt: '2022-03-21T20:47:11.594Z',
      senderId: '6238daac083803aeebb0d55f',
      textTranslated: 'функционише'
    },
    friend: {
      showOriginalMessages: true,
      _id: '6238daac083803aeebb0d55f',
      email: 'pera@gmail.com',
      firstName: 'Pera',
      lastName: 'Peric',
      sendLanguage: 'en',
      receiveLanguage: 'en'
    },
    me: {
      showOriginalMessages: true,
      _id: '6238da98083803aeebb0d55e',
      email: 'nemanja@gmail.com',
      firstName: 'Nemanja',
      lastName: 'Gajic',
      receiveLanguage: 'sr',
      sendLanguage: 'sr'
    }
  }
]