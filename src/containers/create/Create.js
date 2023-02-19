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
            length_options: [1, 2, 3, 4]
        },
        "true/false quiz": {
            type: "questions",
            length_options: [5, 10, 15]
        },
        "multiple choice quiz": {
            type: "questions",
            length_options: [5, 10, 15]
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
    const [link, setLink] = useState("");
    const {addSet, setFeaturedSet, userSets, user} = useUserContext()

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
        if (!selectedFile && link === "") {
            alert("Please upload a file or enter a link")
        } else if (currLength === "") {
            alert("Please select a length");
        } else {
            setLoading(true)
            const thomasData = {
                path: selectedFile.path,
                type: parseOutputType(currOutput),
                length: currLength,
                grade: currGrade,
            }
            console.log(thomasData)
            // note that the set object will not have all of these fields, this is just for testing. 
            const set = {
                id: generateUniqueId(),
                title: title, 
                type: currOutput, 
                link: link,
                cards: [{term: "lebron james", def: "basketball player for the cleveland cavs"}, {term: "stephen curry", def: "basketball player for the golden state warriors"}, {term: "kobe bryant", def: "basketball player for the los angeles lakers"}, {term: "michael jordan", def: "basketball player for the chicago bulls"}, {term: "kevin durant", def: "basketball player for the golden state warriors"}], 
                paragraphs: [
                    "One of the benefits of being short is that you may have a lower risk of certain health conditions. For example, studies suggest that shorter individuals may be less likely to develop heart disease, type 2 diabetes, and some forms of cancer. This may be because shorter people tend to have lower levels of certain hormones and less strain on their organs.",
                    "Another potential benefit of being short is that you may have an easier time fitting into small spaces or finding clothing that fits. If you're someone who loves to travel or explore tight spaces, being shorter may be advantageous. Additionally, children who are shorter may have an easier time finding clothes and shoes that fit them, which can save parents time and money.",
                    "Shorter people may also have an advantage in certain sports, such as gymnastics, diving, or rock climbing. These sports require a lower center of gravity, which can be an advantage for shorter individuals. In addition, shorter people may be able to move more quickly and easily through tight spaces or over obstacles, which can be beneficial in many sports and activities.",
                    "Being short can also be an advantage in certain professions. For example, if you're a pilot or astronaut, being shorter may be an advantage because it can make it easier to fit into tight spaces or maneuver equipment. Additionally, shorter people may have an easier time finding jobs that require them to crawl or work in small spaces, such as plumbers, electricians, or mechanics.",
                    "Finally, being short may be beneficial for your lifespan. Some studies suggest that shorter people may have a longer lifespan than taller people. This may be because shorter individuals tend to have lower levels of insulin-like growth factor 1 (IGF-1), which has been linked to a higher risk of cancer and other health conditions. While height is just one factor that affects your overall health and lifespan, being short may be one small advantage."
                ],
                mcquestions: [
                    {question: "What is the capital of California?", A: "Sacramento", B: "San Francisco", C: "Los Angeles", D: "San Diego", correct: "A"},
                    {question: "What is the capital of New York?", A: "New York City", B: "Albany", C: "Buffalo", D: "Rochester", correct: "B"},
                    {question: "What is the capital of Texas?", A: "Houston", B: "Dallas", C: "Austin", D: "San Antonio", correct: "C"},
                    {question: "What is the capital of Florida?", A: "Miami", B: "Tampa", C: "Orlando", D: "Tallahassee", correct: "D"},
                    {question: "What is the capital of Illinois?", A: "Chicago", B: "Springfield", C: "Peoria", D: "Rockford", correct: "B"}
                ],
                tfquestions: [
                    {question: "Is Thomas' mom hot?", correct: true},
                    {question: "Is Thomas' dad hot?", correct: true},
                    {question: "Is Thomas' sister hot?", correct: true},
                    {question: "Is Thomas' brother hot?", correct: false},
                    {question: "Is Thomas' dog hot?", correct: true},
                ],
                bps: [
                    "One of the benefits of being short is that you may have a lower risk of certain health conditions. For example, studies suggest that shorter individuals may be less likely to develop heart disease, type 2 diabetes, and some forms of cancer. This may be because shorter people tend to have lower levels of certain hormones and less strain on their organs.",
                    "Another potential benefit of being short is that you may have an easier time fitting into small spaces or finding clothing that fits. If you're someone who loves to travel or explore tight spaces, being shorter may be advantageous. Additionally, children who are shorter may have an easier time finding clothes and shoes that fit them, which can save parents time and money.",
                    "Shorter people may also have an advantage in certain sports, such as gymnastics, diving, or rock climbing. These sports require a lower center of gravity, which can be an advantage for shorter individuals. In addition, shorter people may be able to move more quickly and easily through tight spaces or over obstacles, which can be beneficial in many sports and activities.",
                    "Being short can also be an advantage in certain professions. For example, if you're a pilot or astronaut, being shorter may be an advantage because it can make it easier to fit into tight spaces or maneuver equipment. Additionally, shorter people may have an easier time finding jobs that require them to crawl or work in small spaces, such as plumbers, electricians, or mechanics.",
                    "Finally, being short may be beneficial for your lifespan. Some studies suggest that shorter people may have a longer lifespan than taller people. This may be because shorter individuals tend to have lower levels of insulin-like growth factor 1 (IGF-1), which has been linked to a higher risk of cancer and other health conditions. While height is just one factor that affects your overall health and lifespan, being short may be one small advantage."
                ],
            }
            await addSet(set)
            setTimeout(() => {
                // this will change later
                setFeaturedSet(set)
                handleNavigation(currOutput)
                setLoading(false)
            }, 3000);
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
                <p className="digest__create__filetype-msg">Accepted filetypes: mp4, wav, pdf, or url (see below)</p>
            </div>
            {!fileUploaded && <div className="digest__create__upload-link">
                <input onChange={e => setLink(e.target.value)} placeholder='Or enter a link!'></input>
            </div>}
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