import React, { useEffect, useState } from 'react'
import { Button, Card, Form, FormControl, FormFile, FormGroup, FormLabel, FormText } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createFacultyProfile } from '../../actions/facultyActions'
import FormContainer from '../../components/layout/FormContainer'
import Loader from '../../components/layout/Loader'
import Message from '../../components/layout/Message'

const CreateFacultyProfile = ({ history, match }) => {
    const dispatch = useDispatch()

    const headerStyle = { fontSize: '1.2rem' }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [designation, setDesignation] = useState('')
    const [workPlace, setWorkPlace] = useState('')
    const [mobile, setMobile] = useState('')

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postCode, setPostCode] = useState('')
    const [country, setCountry] = useState('')

    const [facebook, setFacebook] = useState('')
    const [linkedIn, setLinkedIn] = useState('')
    const [researchGate, setResearchGate] = useState('')
    const [github, setGithub] = useState('')
    const [web, setWeb] = useState('')
    const [instagram, setInstagram] = useState('')

    const [labDesignation, setLabDesignation] = useState('')
    const [type, setType] = useState('')
    const [researchInterests, setResearchInterests] = useState('')
    const [joiningDate, setJoiningDate] = useState('')
    const [image, setImage] = useState('')
    const [intro, setIntro] = useState('')

    const { loading, error, success } = useSelector(state => state.facultyProfileCreate)
    

    useEffect(() => {
        if (success) {
            history.push(`/profile/${match.parmas.id}`)
        }
    }, [success])

    const submitHandler = (e) => {
        e.preventDefault()

        const newProfile = {
            name,
            email,
            gender,
            occupationalDesignation: designation,
            workPlace,
            mobile,
            social: {
                facebook,
                linkedIn,
                researchGate,
                github,
                instagram,
                web
            },
            address: {
                address,
                city,
                postCode,
                country,
            },
            labDesignation,
            type,
            researchInterests,
            joiningDate,
            image,
            intro
        }
        dispatch(createFacultyProfile(newProfile, match.params.userId))
    }

    const uploadFileHandler = () => {
        setImage('/images/maleProfile.png')
    }

    return (

        <div className='py-4'>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <h2 className='text-center' >Create Faculty Profile</h2>
            <FormContainer>
                <Form onSubmit={submitHandler} >
                    <Card bg='light' className='mb-2' >
                        <Card.Body>
                    <p style={headerStyle} className='text-primary' >Personal Information</p>
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='email'>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='gender'>
                        <FormLabel>Gender</FormLabel>
                        <FormControl
                            as='select'
                            value={gender}
                            onChange={(e) => {
                                setGender(e.target.value)
                            }}
                            required
                        >
                            <option value='' >Select Gender...</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='designation'>
                        <FormLabel>Designation</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Designation'
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='workplace'>
                        <FormLabel>WorkPlace</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Company/ Institution'
                            value={workPlace}
                            onChange={(e) => setWorkPlace(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='mobile'>
                        <FormLabel>Mobile</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Mobile'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                        </Card.Body>
                    </Card>

                    <Card bg='light' className='mb-2'>
                        <Card.Body>
                    <p style={headerStyle} className='text-primary'>Contact Details</p>
                    <FormGroup controlId='address'>
                        <FormLabel>Address</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='city'>
                        <FormLabel>City</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='postCode'>
                        <FormLabel>PostCode</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter PostCode'
                            value={postCode}
                            onChange={(e) => setPostCode(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='country'>
                        <FormLabel>Country</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        ></FormControl>
                    </FormGroup>
                        </Card.Body>
                    </Card>
                    <Card bg='light' className='mb-2'>
                        <Card.Body>
                    <p style={headerStyle} className='text-primary'>Social Links</p>
                    <FormGroup controlId='facebook'>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Facebook'
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='linkedIn'>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter LinkedIn'
                            value={linkedIn}
                            onChange={(e) => setLinkedIn(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='web'>
                        <FormLabel>Web</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Portfolio/ Web address'
                            value={web}
                            onChange={(e) => setWeb(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='researchGate'>
                        <FormLabel>ResearchGate</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter ResearchGate'
                            value={researchGate}
                            onChange={(e) => setResearchGate(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='github'>
                        <FormLabel>Github</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Github'
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='instagram'>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Instagram'
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                        </Card.Body>
                    </Card>
                    <Card bg='light' className='mb-2'>
                        <Card.Body>

                    <p style={headerStyle} className='text-primary'>Lab Details</p>
                    <FormGroup controlId='labDesignation'>
                        <FormLabel>Lab Designation</FormLabel>
                        <FormControl
                            as='select'
                            value={labDesignation}
                            onChange={(e) => setLabDesignation(e.target.value)}
                            required
                        >
                            <option value="">Select Lab Designation..</option>
                            <option value="Director">Director</option>
                            <option value="Co-Ordinator">Co-Ordinator</option>
                            <option value="Member">Member</option>
                            <option value="Advisor">Advisor</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='type'>
                        <FormLabel>Type</FormLabel>
                        <FormControl
                            as='select'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        >
                            <option value="">Select member type..</option>
                            <option value="Researcher">Researcher</option>
                            <option value="MS Student">MS Student</option>
                            <option value="Project Intern">Project Intern</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId='researchInterests'>
                        <FormLabel>Research Interest</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Research Interests'
                            value={researchInterests}
                            onChange={(e) => setResearchInterests(e.target.value)}
                            required
                        ></FormControl>
                        <FormText className="text-warning" >Comma Seperated value. ex: Machine Learning,Bio-Informatics,Data Science</FormText>
                    </FormGroup>
                    <FormGroup controlId='joiningDate'>
                        <FormLabel>JoiningDate</FormLabel>
                        <FormControl
                            type='date'
                            value={joiningDate}
                            onChange={(e) => setJoiningDate(e.target.value)}
                        ></FormControl>
                    </FormGroup>
                        </Card.Body>
                    </Card>

                    <Card bg='light' className='mb-2'>
                        <Card.Body>
                    <FormGroup controlId='intro'>
                        <FormLabel>Intro</FormLabel>
                        <FormControl
                            as='textarea'
                            placeholder='This will be highlighted on user profile'
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                            required
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='image'>
                        <FormLabel>Image</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Image Url'
                            value={image}
                            onChange={(e) => setImage(`/images/${e.target.value}.png`)}
                            required
                        ></FormControl>
                        <FormFile
                            id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        ></FormFile>
                    </FormGroup>
                        </Card.Body>
                    </Card>

                    <Button type='submit' variant='outline-primary' block>Submit</Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default CreateFacultyProfile