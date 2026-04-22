// function createUserBuilder() {
//   const user = {};
//   return {
//     setName(name) {
//       user.name = name;
//       return this;
//     },
//     setAge(age) {
//       user.age = age;
//       return this;
//     },
//     setAdmin(isAdmin) {
//       user.isAdmin = isAdmin;
//       return this;
//     },
//     build() {
//       return user;
//     },
//   };
// }

// const user = createUserBuilder()
//   .setName("abc")
//   .setAge(20)
//   .setAdmin(false)
//   .build();
// console.log(user);

// Result
// { name: 'abc', age: 20, isAdmin: false }

function createRequestBuilder(baseUrl) {
  const config = {
    url: baseUrl,
    params: {},
  };
  return {
    addParam(key, value) {
      config.params[key] = value;
      return this;
    },
    setMethod(method) {
      config.method = method;
      return this;
    },
    build() {
      return config;
    },
  };
}

const request = createRequestBuilder("/users")
  .setMethod("GET")
  .addParam("page", 1)
  .addParam("limit", 10)
  .build();

console.log(request);

// Result
// { url: '/users', params: { page: 1, limit: 10 }, method: 'GET' }
