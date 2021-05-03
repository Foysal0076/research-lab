import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ContactForm from '../components/contact/ContactForm'
import Address from '../components/contact/Address'

const ContactScreen = () => {
  return (
    <Row className='p-4'>
      <Col md={6}>
        <Address />
        <ContactForm />
      </Col>
      <Col md={6}>
        <div className="w-100 h-100">
          <iframe title='Lab Location' className='w-100' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6465.120884754442!2d90.37168455062009!3d23.75491635079163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3c872fd17bc11ddb!2sDaffodil%20International%20University%20(DIU)!5e0!3m2!1sen!2sbd!4v1613562286857!5m2!1sen!2sbd" width="600" height="500" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
        </div>
      </Col>
    </Row>
  )
}

export default ContactScreen