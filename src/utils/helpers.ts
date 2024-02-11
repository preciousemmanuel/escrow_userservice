

export const verificationCode = ():number => {
    const code = Math.floor(1000 + Math.random() * 9000);
    return code;
  };

  export const checkIfIsEmail=(value:string):boolean=>{
    const re = /\S+@\S+\.\S+/;
    return re.test(value);
    }

    export const createSkuTag=(value:string,id:string):string=>{
      return `${value.replace(" ","-")}-${id}`;
      }
  
 