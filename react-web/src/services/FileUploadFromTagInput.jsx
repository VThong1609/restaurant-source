// convertFilesToStringArray(documentFiles)
//   .then((stringArray) => {
//     // Sử dụng mảng chuỗi ở đây
//     console.log(JSON.stringify(stringArray));

//     // Chuyển đổi mảng chuỗi thành mảng tệp tin
//     const files = convertStringArrayToFiles(stringArray);
//     // Sử dụng mảng tệp tin ở đây
//     console.log(files);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// const convertFilesToStringArray = (files) => {
//   const promises = [];

//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const reader = new FileReader();
//     const promise = new Promise((resolve, reject) => {
//       reader.onload = (event) => {
//         const fileContent = event.target.result;
//         resolve(fileContent);
//       };

//       reader.onerror = (error) => {
//         reject(error);
//       };

//       reader.readAsDataURL(file);
//     });

//     promises.push(promise);
//   }

//   return Promise.all(promises);
// };

// const convertStringArrayToFiles = (stringArray) => {
//   const files = [];

//   for (let i = 0; i < stringArray.length; i++) {
//     const string = stringArray[i];
//     const parts = string.split(";base64,");
//     const contentType = parts[0].split(":")[1];

//     const byteCharacters = atob(parts[1]);
//     const byteArrays = [];

//     for (let j = 0; j < byteCharacters.length; j++) {
//       byteArrays.push(byteCharacters.charCodeAt(j));
//     }

//     const byteArray = new Uint8Array(byteArrays);
//     const file = new File([byteArray], `file${i}`, { type: contentType });
//     files.push(file);
//   }

//   return files;
// };
