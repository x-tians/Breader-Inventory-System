const initialItems = {
    user:{},
    pwd:{},
    products:[
      {id:'01a',name: 'Pandesal',price:2, image: require('../assets/bread.png'),quantity:100,status:'product'},
      {id:'02b',name: 'Loaf bread',price:80, image: require('../assets/loaf bread.png'),quantity:300,status:'product'}
    ],
    userToken:[{token:''}],
    upateToken:[{id:''}],
    isDelete:false,
    isUpdateWidth:true,
    link:'',
    sales:[
      {id:'01a', name:'pandesal',quantity:1,date:'01/30/2022, 7:42:43 AM',price:2,status:'sold'},
      {id:'02b', name:'Loaf bread',quantity:10,date:'03/30/2022, 7:42:43 AM',price:800,status:'sold'},
      {id:'01a', name:'pandesal',quantity:100,date:'01/30/2021, 7:42:43 AM',price:200,status:'sold'},
      {id:'02b', name:'Loaf bread',quantity:11,date:'12/30/2021, 7:42:43 AM',price:880,status:'sold'},
      {id:'02b', name:'Loaf bread',quantity:9,date:'10/30/2020, 7:42:43 AM',price:720,status:'sold'},
      {id:'02b', name:'Loaf bread',quantity:9,date:'10/30/2020, 7:42:43 AM',price:720,status:'sold'}
    ]
    ,
    productIsStatus:false,
    product:{},
    productId:'',
    buyId:{pid:'',transId:'0'}
  };

  const reducer = ( state=initialItems,action)=>{
    switch( action.type ){
        case'REFRESH_PRODUCT':
        let delProducts=state;
        delProducts.productIsStatus=action.payload.status;
        //console.log(delProducts);
        return { ...delProducts};
        case'UPDATE_PRODUCT':
        let updateProducts=state;
        updateProducts.productId=action.payload.id;
        updateProducts.product=action.payload.product;
        //console.log(delProducts);
        return { ...updateProducts};
        case'BUY_PRODUCT':
        let buyIds=state;
        buyIds.buyId.pid=action.payload.pid;
        buyIds.buyId.transId=action.payload.transId;
        return { ...buyIds }
        
        case 'LOG_IN':
          let arrUser=state;
          arrUser.user=action.payload.user;
          return { ...arrUser};
        case 'ISUPDATEWIDTH':
          const isUpdate=state;
          isUpdate.isUpdateWidth=action.payload.isUpdate;
          return {...isUpdate};
        case 'LEFT_MENU':
          const leftMenu=state;
          leftMenu.link=action.payload.link;
          return {...leftMenu};
        
        default: 
            return state;
    }

  }

  export default reducer;