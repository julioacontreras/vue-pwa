import axios from 'axios'
import { format } from 'date-fns'

const getUsers = async () => {
  const users = []
  const response = await axios.get('https://randomuser.me/api/?results=100')
  const results = response.data.results
  results.forEach((user, index) => {
    users.push({
      id: index + 1,
      name: `${user.name.title} ${user.name.first} `,
      gender: user.gender,
      nationality: user.nat,
      age: user.dob.age,
      birthday: format(new Date(user.dob.date), 'dd/MM/yyyy'),
      favorite: false,
      createdAt: format(new Date(), 'dd/MM/yyyy'),
      picture: user.picture.large
    })
  })
  return users
}

export {
  getUsers
}
