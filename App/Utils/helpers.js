import defaultImage from './../Images/background.jpg';

export default {
  getListOfPropertyByProperty(list, propertyToReturn, propertyToFind) {
   let listToReturn = [],
       length = list.length,
       index = 0;

   for (index; index < length; index++) {
     let item = list[index];

     if (item[propertyToFind]) {
       listToReturn.push(item[propertyToReturn]);
     }
   }

   return listToReturn;
  },
  formatError(errorObj) {
    let keys = '';

    for (let key in errorObj) {
       if (errorObj.hasOwnProperty(key)) {
         let errors = errorObj[key];
         for (let error in errors) {
           if (errors.hasOwnProperty(error)) {
             keys += (`${key} : ${errors[error]} \n`);
           }
         }
       }
    }

    return keys;
  },
  getDefaultImagePicker: {
    title: 'Cambiar foto de portada',
    sizeTitle: 16,
    takePhotoButtonTitle: 'Hacer foto...',
    chooseFromLibraryButtonTitle: 'Seleccionar foto...',
    cancelButtonTitle: 'Cancelar',
    storageOptions: {
        skipBackup: true,
        path: 'avatar'
    },
    allowsEditing: true,
    customButtons: [
      {name: 'fb', title: 'Eliminar foto', color: 'red'},
    ]
  },
  getFormats: {
    date: 'YYYY-MM-DD',
    datetime: 'YYYY-MM-DD HH:mm',
    time: 'HH:mm'
  },
  setImageByDefault(data, attribute='') {
    return data[attribute] ? { uri: data[attribute] } : defaultImage;
  }
}
