/*
Examples like-
1.Theme context- once any changes is made should be reflected in entire project
2. BRoadcast alerts in entire application
*/

//const theme = {
//   currentTheme: "light",
//   changeTheme(newTheme) {
//     this.currentTheme = newTheme;
//     console.log("New Theme: ", this.currentTheme);
//   },
//   getTheme() {
//     console.log("Current Theme: ", this.currentTheme);
//   },
// };

// theme.getTheme();
// theme.changeTheme("dark");
// theme.getTheme();

// let loggerInstance;
// function createLogger() {
//   if (!loggerInstance) {
//     loggerInstance = {
//       log: (message) => {
//         console.log("LOG:", message);
//       },
//       error: (message) => {
//         console.log("ERROR:", message);
//       },
//     };
//   }
//   return loggerInstance;
// }

// const logger1 = createLogger();
// const logger2 = createLogger();

// logger1.log("hello");
// logger2.error("world");

// console.log(logger1 === logger2);

// const auth = (function () {
//   let token = null;
//   return {
//     setToken: (newToken) => {
//       token = newToken;
//       console.log("Token is saved");
//     },
//     getToken: () => {
//       console.log(token);
//     },
//     logout: () => {
//       token = null;
//       console.log("Token removed");
//     },
//   };
// })();

// auth.setToken("xyz123abc");
// auth.getToken();
// auth.logout();
// auth.getToken();
