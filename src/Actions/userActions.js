import axios from 'axios'
import swal from 'sweetalert'


// getting user account details

export const startgetUser = ()=>{
    return (dispatch)=>{
        let useremail='zeeshanbaig190@gmail.com';
        axios.post('http://localhost:3003/getaccount1' ,{
            useremail ,
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            } })

        .then((responce)=>{
            
            const result = responce.data
            console.log('responce.data user:' ,responce.data);
            dispatch(userInfo(result))
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
}

export const userInfo=(data)=>{
    return{
        type :"USERINFO",
        payload : data
    }
}

// clear the store of my account details 
export const clear = ()=>{
    return {
        type : "CLEAR"
    }
}