import logo from './logo.svg';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
//import AWS from 'aws-sdk';
import { uploadData } from 'aws-amplify/storage';

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
import { useState } from "react";
Amplify.configure(awsExports);

function App({ signOut}) {

  const [fileData, setFileData] = useState(null);
  const [fileStatus, setFileStatus] = useState(false);

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
     // console.log('Succeeded: ', result);

    } catch (error) {
      console.log('Error : ', error);
    }
  }

  return (

    <View className="App">

       <Card>
        <Image src={logo} className="App-logo" alt="logo" height="20%" width="20%"/>

        <Heading level={1}> Welcome to Mulakhulu!</Heading>
        
      </Card>

      <div>
        <input type="file" accept={[".csv",".docx",".txt"]} onChange={(e)=> setFileData(e.target.files[0])}/>
        </div>
        
        <div>
          <button onClick={uploadFile} width="320" height="320">Upload File</button>
        </div>

      {fileStatus ? "File uploaded successfully" : ""}

      <Button onClick={signOut} width="320" height="320">Log out</Button>

    </View>
  );

}

export default withAuthenticator(App);



/*
function App({ signOut, user }) {

 

  const [fileData, setFileData] = useState();
  const [fileStatus, setFileStatus] = useState(false);

  const uploadFile = async () => {
    const result = await Storage.put(fileData.name, fileData, {
      contentType: fileData.type,
    });
    setFileStatus(true);
    console.log(21, result);
  };

  return (

    <div className="App">
      <Card>
        <Image src={logo} className="App-logo" alt="logo" height="20%" width="20%"/>
        <Heading level={1}> Welcome to Mulakhulu!</Heading>
      </Card>
      
      <div>
        <input type="file" onChange={(e) => setFileData(e.target.files[0])} />
      </div>
      <div>
        <button onClick={uploadFile}>Upload file</button>
      </div>
      {fileStatus ? "File uploaded successfully" : ""}


      <Button onClick={signOut} width="320" height="320">Log out</Button>

    </div>

  );

}
export default withAuthenticator(App);

*/