const getInputError = (errors, name) => {
    let isError;
    try {
        let group = name.split(".")[0];
        let inputname = name.split(".")[1];
        if(name.includes(".") && errors[group] ){
          isError = errors[group][inputname] 
        }else {
        //   console.log(errors, name)
          isError = errors[name]
        }
         
      } catch (error) {
        // console.log(error)
      }
      return isError;
}

export default getInputError;
