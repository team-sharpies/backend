import * as fs from 'node:fs/promises'

export async function getCats() {
  return JSON.parse(await fs.readFile('./storage/data.json', 'utf-8'))
}
export async function addCat(newCat: any) {
  const data = await getCats()

  //replace the pup in question with the newpup data

  const newCats = {
    cats: { ...data.cats, newCat },
  }

  ///// This option mutates the original array
  // const index = data.puppies.findIndex(puppy => puppy.id === id)
  // data.puppies[index] = { id, ...newPuppy }

  //  const newObj = {
  //   puppies: newPuppies
  //  }
  //ensure data is in an object again
  //stringify it again
  const string = JSON.stringify(newCats, null, 2)

  //write it to the file
  await fs.writeFile('./storage/data.json', string, 'utf-8')
}
