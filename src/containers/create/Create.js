import React, { useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import './create.css'
import { Loading } from '../../components'
import { useNavigate } from 'react-router-dom'
import {useDropzone} from 'react-dropzone'

const Create = () => {
    const gradeLevels = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "University"]
    const outputsDict = {
        "flashcards": {
            type: "cards",
            length_options: [5, 10, 15, 20]
        }, 
        "summary": {
            type: "paragraphs",
            length_options: [1, 2, 3]
        },
        "true/false quiz": {
            type: "questions",
            length_options: [5, 10, 15]
        },
        "multiple choice quiz": {
            type: "questions",
            length_options: [3, 5, 8]
        },
        "bullet points": {
            type: "bullet points",
            length_options: [5, 10, 15]
        },
    }
    const outputs = ["flashcards", "summary", "true/false quiz", "multiple choice quiz", "bullet points"]
    const [currOutput, setCurrOutput] = useState("flashcards")
    const [currGrade, setCurrGrade] = useState("1st")
    const [title, setTitle] = useState("My Set")
    const [currLength, setCurrLength] = useState("")
    const [fileUploaded, setFileUploaded] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { addSet, setFeaturedSet} = useUserContext()

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        const fileType = file.type;
        const validTypes = ['application/pdf', 'video/mp4', 'audio/wav'];
        if (!validTypes.includes(fileType)) {
            alert('Please upload a valid file type (PDF, MP4, or WAV)');
            return;
        } else {
            setFileUploaded(true);
            setSelectedFile(file);
            console.log(file)
        }
    }
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileType = file.type;
        const validTypes = ['application/pdf', 'video/mp4', 'audio/wav'];
        if (!validTypes.includes(fileType)) {
            alert('Please upload a valid file type (PDF, MP4, or WAV)');
            return;
        } else {
            setFileUploaded(true);
            setSelectedFile(file);
            console.log(file)
        }

    };


    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: onDrop,
    })

    const parseOutputType = (output) => {
        switch (output) {
            case "flashcards": {
                return "NOTECARD"
            }
            case "summary": {
                return "SUMMARY"
            }
            case "true/false quiz": {
                return "TFQUIZ"
            }
            case "multiple choice quiz": {
                return "MCQUIZ"
            } 
            case "bullet points": {
                return "BULLET"
            }
        }
    }



    const generateUniqueId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    const handleSubmit = async() => {
        if (!selectedFile) {
            alert("Please upload a file")
        } else if (currLength === "") {
            alert("Please select a length");
        } else {
            setLoading(true)
            const formData = new FormData();
            formData.append("filedata", selectedFile);
            formData.append("filename", selectedFile.path);
            formData.append("output_type", parseOutputType(currOutput));
            formData.append("num_outputs", currLength);
            formData.append("grade_level", currGrade);
            formData.append("timeout", 300);
            const response = await fetch("http://436c-171-66-12-87.ngrok.io", {
                method: "POST",
                body: formData,
            })
            // if there are any errors, setLoading to false and alert the user
            if (!response.ok) {
                setLoading(false)
                alert("There was an error processing your file. Please try again later.")
                return;
            }
            const responseData = await response.json();
            // note that the set object will not have all of these fields, this is just for testing. 
            const set = {
                id: generateUniqueId(),
                title: title,
                type: currOutput,
            }
            if (currOutput === "flashcards") {
                set.cards = responseData.Data;
            } else if (currOutput === "summary") {
                set.paragraphs = responseData.Data.paragraphs;
                set.overview = responseData.Data.overview;
            } else if (currOutput === "bullet points") {
                set.bps = responseData.Data.bps;
            } else if (currOutput === "true/false quiz") {
                set.tfquestions = responseData.Data;
            } else {
                set.mcquestions = responseData.Data;
            }
            await addSet(set)
            setFeaturedSet(set)
            handleNavigation(currOutput)
            setLoading(false)
        }
    }
    const navigate = useNavigate()

    const handleNavigation = (output) => {
        switch (output) {
            case "multiple choice quiz": {
                navigate("/multiplechoicequiz")
                return;
            } 
            case "true/false quiz": {
                navigate("/truefalsequiz")
                return;
            }
            case "flashcards": {
                navigate("/flashcards")
                return;
            }
            case "summary": {
                navigate("/summary")
                return;
            }
            case "bullet points": {
                navigate("/bp-summary")
                return;
            }
        }
    }
  return (
    <>
    {!loading ? <div className="digest__create flex__col section__margin section__padding">
        <div className="digest__create__header">
            <h1>Create customizable, <b>AI-powered</b>, study tools in 3 easy steps</h1>
        </div>
        <div className="digest__create__upload-container">
            <div className="digest__create__upload__header">
                <h1>1: Upload your content</h1>
            </div>
            <div  {...getRootProps()} className="digest__create__dotted-container flex__col ac">
            {fileUploaded ? <>
                <h1 className="digest__create__success">&#x2714; Success!</h1>
                <p>{selectedFile && selectedFile.path}</p>
            </> : 
            <>
                <input {...getInputProps()} onChange={e => handleFileChange(e)}/>
                {!isDragActive && <><h1 className="digest__create__choose__header">Drag and Drop File Here</h1>
                <h2 className="digest__create__or">Or click to select a file</h2>
            
                </>}</>}
                <p className="digest__create__filetype-msg">Accepted filetypes: mp4, wav, or pdf (see below)</p>
            </div>
        </div>
        <div className="digest__create__pref-container">
            <div className="digest__create__pref__header">
                <h1>2: Set your preferences</h1>
            </div>
            <div className="digest__create__dotted-container">
                <div className="digest__create__pref__selection-container">
                    <h2>Title: </h2>
                    <input onChange={e => setTitle(e.target.value)} placeholder='Enter a set title'></input>
                </div>
                <div className="digest__create__pref__selection-container">
                    <h2>Grade level: </h2>
                    <div className="digest__create__pref__selections-grid">
                        {gradeLevels.map((grade, i) => {
                            return (
                                <button onClick={() => setCurrGrade(grade)} className={currGrade != grade ? "digest__pref__button" : "digest__pref__button digest__pref__button-active"}>{grade}</button>
                            )
                        })}
                    </div>
                </div>
                <div className="digest__create__pref__selection-container">
                    <h2>Output as: </h2>
                    <div className="digest__create__pref__selections-grid">
                        {outputs.map((output, i) => {
                            return (
                                <button className={currOutput != output ? "digest__pref__button" : "digest__pref__button digest__pref__button-active"} onClick={() => setCurrOutput(output)}>{output}</button>
                            )
                        })}
                    </div>
                </div>
                <div className="digest__create__pref__selection-container">
                    <h2>Number of {outputsDict[currOutput].type}: </h2>
                    <div className="digest__create__pref__selections-grid">
                        {outputsDict[currOutput].length_options.map((length, i) => {
                            return (
                                <div className="digest__create__pref__selections-grid">
                                    <button className={currLength != length ? "digest__pref__button" : "digest__pref__button digest__pref__button-active"} onClick={() => setCurrLength(length)}>{length}</button>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
        <div className="digest__create__submit-container">
            <div className="digest__create__submit__header">
                <h1>3: Generate your study tool</h1>
            </div>
            <div className="digest__create__submit-btn">
                <button onClick={() => handleSubmit()}>Submit</button>
            </div>
           
        </div>
    </div> 
    : 
    <Loading />}</>
  )
}

export default Create