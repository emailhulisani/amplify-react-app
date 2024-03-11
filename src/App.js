import logo from './logo.svg';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
//import AWS from 'aws-sdk';
import { uploadData ,list} from 'aws-amplify/storage';

import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { useState ,useEffect } from "react";

Amplify.configure(awsExports);

function App({ signOut}) {

  const [fileData, setFileData] = useState(null);
  const [fileStatus, setFileStatus] = useState(false);
  const [objects, setObjects] = useState([]);
 
 useEffect(() => {
   listObjects();
 }, []);

 async function listObjects(){
  try {
    const objectList = await list({
      
      options: {
        accessLevel: 'private',
      }
    });
    setObjects(objectList.items);
    
  } catch (error) {
    console.log('Error ', error);
  }
}

// upload file //

  async function uploadFile(){
    try {
      const result = await uploadData({
        key: fileData.name,
        data: fileData,
        options: {
            accessLevel: 'private'
        }
      }).result;
      setFileStatus(true)
      listObjects();
     

    } catch (error) {
      console.log('Error : ', error);
    }
  }
  return (

    <div className="App">


<Card>
        <Image src={logo} className="App-logo" alt="logo" height="20%" width="20%"/>

        <Heading level={1}> Welcome to kuvuki land!</Heading>
        
      </Card>
 
      <div>
        <input type="file" accept={[".csv"]} onChange={(e)=> setFileData(e.target.files[0])}/>
        </div>
        
        <div>
          <button onClick={uploadFile} width="320" height="320">Upload File</button>
        </div>

      {fileStatus ? "File uploaded successfully" : ""}
      <div>
        {Array.prototype.map.call(objects, (x,i) => (
          <div className="row" key={i}>{x.key}</div>
        ))}
      </div>

      <Button onClick={signOut} width="320" height="320">Log out</Button>

    </div>
  );

}


export default withAuthenticator(App);

