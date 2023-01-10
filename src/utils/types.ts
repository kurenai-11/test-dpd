const randomPerson = {
  gender: "male",
  name: { title: "Mr", first: "Noah", last: "Arnaud" },
  location: {
    street: { number: 4280, name: "Place de L'Église" },
    city: "Courbevoie",
    state: "Martinique",
    country: "France",
    postcode: 18088,
    coordinates: { latitude: "-19.1691", longitude: "-58.3586" },
    timezone: {
      offset: "-11:00",
      description: "Midway Island, Samoa",
    },
  },
  email: "noah.arnaud@example.com",
  login: {
    uuid: "b00634a1-d082-42a3-9a13-2ba4321dc99d",
    username: "bigduck214",
    password: "pancho",
    salt: "1bHijPmJ",
    md5: "24925bfbd3f32fe9cee450397bf85231",
    sha1: "c2134ccda4d57dc69c58821155359ee033574855",
    sha256: "d075e60f0f06147284c32b3f7bfa602d837b83df85151fa72c3434e8c8cc0b9d",
  },
  dob: { date: "1985-12-27T16:20:39.124Z", age: 36 },
  registered: { date: "2015-09-28T23:20:03.762Z", age: 7 },
  phone: "02-10-87-55-80",
  cell: "06-76-99-90-23",
  id: { name: "INSEE", value: "1851112003541 50" },
  picture: {
    large: "https://randomuser.me/api/portraits/men/27.jpg",
    medium: "https://randomuser.me/api/portraits/med/men/27.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/men/27.jpg",
  },
  nat: "FR",
};

export type Person = typeof randomPerson;
