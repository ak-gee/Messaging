 
import './App.css';
import { Button,Card } from 'react-bootstrap'; 
// import history from './history';
import {React,useState} from 'react';
import './index.css';

function App() {
  var [dataarray,setDataarray] = useState(['','','','','']);
  var [read,setRead] = useState({'message':'','result':[{}]});
  var [status,setStatus] = useState('');
  var [id,setId] = useState('');
  var     rk = "87";


  const genrk = () =>{
   
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz0";
    
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    
    
  }
  const sendMessage = async() => {
 rk = genrk();
    console.log(rk);
    setValue(rk,7)
    
    let newdata = {
      "randomKey": rk,
      "password":dataarray[0],
      "message": dataarray[1], //"Secret",
      "targetURL":dataarray[2],
      "targetMail":dataarray[3]
    }
    
      let result;
      // var loginResult =  await fetch('http://localhost:3000/create-message',{
        var loginResult =  await fetch('https://secret-meassag.herokuapp.com/create-message',{
          // await fetch('https://app2stu.herokuapp.com/student',{
          
      method : 'POST',
      headers : {
        // 'Authorization':localStorage.getItem("admintoken"),//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzg1NzFhZTQ1MmYwNDhhNDgwNzhkNCIsImlhdCI6MTYxNDM5MDkyNCwiZXhwIjoxNjE0Mzk0NTI0fQ.Y2qAVLbDA-UBEyRpHNrrqix6yiiR3dzdy-5X-h1m68o",
        'Content-Type' : 'Application/json',
      },
      body: JSON.stringify(newdata),
      

    }) .then( (data) => {
    // console.log(data.json())
    return (data.json())
    }).then((json) => {

    console.log(json.message,json.result);
    result = json;
    }
    );
  }
  
  const deleteMessage = async () => {
    alert("Bye") 
    let newdata = {
      "secretKey": dataarray[5],
      "password":dataarray[6]}

    // await fetch("http://localhost:3000/delete-message",{
    await  fetch('https://secret-meassag.herokuapp.com/delete-message',{
      // await fetch('https://app2stu.herokuapp.com/student',{                
      method : 'DELETE',
      headers : {
          // 'Authorization':localStorage.getItem("admintoken"),//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzg1NzFhZTQ1MmYwNDhhNDgwNzhkNCIsImlhdCI6MTYxNDM5MDkyNCwiZXhwIjoxNjE0Mzk0NTI0fQ.Y2qAVLbDA-UBEyRpHNrrqix6yiiR3dzdy-5X-h1m68o",
         'Content-Type' : 'Application/json',
      },                               
      body: JSON.stringify(newdata),
  }) .then(res => res.json())
      .then(data => {    
          setStatus( status = data)
          console.log(status,status.length);               
           }
      )                
      .catch(error => {
      console.log(error)});
  };
    

    const readMessage = async () => {
      // alert(`https://secret-meassag.herokuapp.com/message-by-id/${id}`) 
      // await fetch("http://localhost:5000/message-by-id/:id",{
        await  fetch(`https://secret-meassag.herokuapp.com/message-by-id/${id}`,{
        // await fetch('https://app2stu.herokuapp.com/student',{                
        method : 'GET',
        headers : {
            // 'Authorization':localStorage.getItem("admintoken"),//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzg1NzFhZTQ1MmYwNDhhNDgwNzhkNCIsImlhdCI6MTYxNDM5MDkyNCwiZXhwIjoxNjE0Mzk0NTI0fQ.Y2qAVLbDA-UBEyRpHNrrqix6yiiR3dzdy-5X-h1m68o",
           'Content-Type' : 'Application/json',
        },                               

    }) .then(res => res.json())
        .then(data => {    
          if (data.result[0] === undefined){
          //  alert (read)
           setRead( read = {'message':'','result':[{}]})
          }
           else{
            setRead( read = data)
            console.log(read.message,read.result.length,read.result[0],read.result[0].message);//,read.result,read.length);               
             }
            }
        )                
        .catch(error => {
          setRead(read={'message':'Error','result':[{}]})
        console.log(error)});
    }
  
      
      function setValue(value,index){
        let copy = [...dataarray];
        copy[index] = value;
        setDataarray(copy);
      }
  return (
    <div className="App">
      <header className="App-header">
        <h1><center>Messaging APP</center></h1>
      <div style = {{float:"left"}}>
          <Card className="Card1" style={{ width: '18rem' }}>
                {/* //Email */}
                <label htmlFor = 'email' width = "10px">Email ID</label>
                <input type = "text"  
                className = 'form-group txt'
                placeHolder  = "Enter receiver email"
                value = {dataarray[3]}
                id = 'email'
                onChange ={(e) => setValue(e.target.value,3)}/>

              {/* Message */}
              <label htmlFor = 'msg' width = "10px">Message</label>
              <input type = "text"  
                className = 'form-group msg'
                placeHolder  = "Enter Message to send"
                value = {dataarray[1]}
                id = 'msg'
                onChange ={(e) => setValue(e.target.value,1)}/>  

                {/* URL */}
                <label htmlFor = 'url' width = "20px">URL  </label>
                <input type = "text"  
                className = 'form-group'
                placeHolder  = "Enter url"
                value = {dataarray[2]}
                id = 'url'
                onChange ={(e) => setValue(e.target.value,2)}/>  <br></br>

                {/* :Enter Secret Key */}
                <label htmlFor = 'url' width = "20px">Secret Key</label>
                <input type = "text"  
                className = 'form-group'
                placeHolder  = "Enter secret key of msg to be created"
                value = {dataarray[7]}
                id = 'entkey'
                // onChange ={(e) => setValue(e.target.value,7)}
                />  


                  {/* PWD */}
                  <label htmlFor = 'pwd' width = "10px">Password</label>
                  <input type = "text"  
                className = 'form-group'
                placeHolder  = "Enter password"
                value = {dataarray[0]}
                id = 'pwd'
                onChange ={(e) => setValue(e.target.value,0)}/>  

                <div>
                <Button variant="btn btn-success btnh g" onClick= {() =>sendMessage()} >Send message
                </Button>
                </div>
              </Card>
              <Card className="Card2" style={{ width: '18rem' }}>
                {/* Delete :Enter Secret Key */}
                <label htmlFor = 'url' width = "20px">Secret Key</label>
                <input type = "text"  
                className = 'form-group'
                placeHolder  = "Enter secret key of msg to be deleted"
                value = {dataarray[5]}
                id = 'delkey'
                onChange ={(e) => setValue(e.target.value,5)}/>  

                  {/* PWD */}
                  <label htmlFor = 'pwd' width = "10px">Password</label>
                  <input type = "text"  
                className = 'form-group'
                placeHolder  = "Enter password"
                value = {dataarray[6]}
                id = 'delpwd'
                onChange ={(e) => setValue(e.target.value,6)}/>  

                <div>
                <Button variant="btn btn-success btnh r" onClick= {() =>deleteMessage()} >Delete message
                </Button>
                </div>
                </Card>
      
            
                
            <Card className="Card4" style={{ width: '18rem' }}>
            <div className= "Read">
                <Button variant="btn btn-success btnh b" onClick= {() =>readMessage()} >Read message
                </Button>
                <input type = "text" id = "read" placeHolder = "Enter id to fetch" value ={id} onChange= {(e) =>setId(e.target.value)}/><br></br>
                <label htmlFor = 'rdmsg' width = "10px">Read Message</label>
                
                <input type = "text" id = "rdmsg" className = "msg" 
                value ={read.result[0].message} 
                />      
                
            </div>
            </Card>
            </div>

            <div style = {{float:"right"}}>
                <Card className="Card3" style={{ width: '18rem' }}>
                <label htmlFor = 'stat' width = "10px">Status Message</label>
                <input type = "text" id = "stat" placeHolder = "" value ={status.message} />
                </Card>

            </div>
      </header>
    </div>
  );
}

export default App;
