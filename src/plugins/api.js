import axios from 'axios'

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
      favorite: false
    })
  })
  return users
}

export {
  getUsers
}
