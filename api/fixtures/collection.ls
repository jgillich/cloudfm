require! {
  faker
}

module.exports = ->
  for i from 1 to 5
    * name: faker.name.findName!
      albums: for i from 1 to 3
        * name: faker.internet.domainWord!
          cover: faker.image.imageUrl!
          songs: for i from 1 to 15
            * title: faker.company.bs!
              url: faker.internet.url!