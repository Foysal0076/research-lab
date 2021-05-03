import React from 'react'
import bi1 from '../assets/bi1.jpg'
import bi2 from '../assets/bi2.jpg'
import bi3 from '../assets/bi3.jpg'

const FocusArea = () => {
  return (
    <>
      <section id="focus-area-showcase" style
        ={{ backgroundImage: `url(${bi1})` }}>
        <div className="primary-overlay text-white align-items-center" >
          <div className="container mt-4 p-4 h-100 align-items-center">
            <div className="d-flex align-items-center align-self-center">
              <div className="text-resp">
                <h1 className="display-2 mt-5 pt-5 text-capitalize  ">Artificial Intelligence</h1>
                <p className='first-para c-margin-top' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos corrupti voluptate, alias illo quasi nam molestias cumque debitis delectus qui maiores quibusdam tempora! Totam similique labore autem, earum repudiandae inventore necessitatibus iusto, vitae explicabo accusamus ipsam quae, laborum alias sit amet cumque natus reprehenderit provident obcaecati itaque modi voluptate. Eligendi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="focus-area-showcase" style
        ={{ backgroundImage: `url(${bi2})` }}>
        <div className="primary-overlay text-white" >
          <div className="container mt-4 p-4">
            <div className="row">
              <div className="col text-start  ">
                <h1 className="display-2 mt-5 pt-5 text-capitalize middle-para-heading ">Bio-Informatics</h1>
                <p className='middle-para' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos corrupti voluptate, alias illo quasi nam molestias cumque debitis delectus qui maiores quibusdam tempora! Totam similique labore autem, earum repudiandae inventore necessitatibus iusto, vitae explicabo accusamus ipsam quae, laborum alias sit amet cumque natus reprehenderit provident obcaecati itaque modi voluptate. Eligendi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="focus-area-showcase" style
        ={{ backgroundImage: `url(${bi3})` }}>
        <div className="primary-overlay text-white" >
          <div className="container">
            <div className="row">
              <div className="col text-resp  hero-section">
                <h1 className="display-2 mt-5 pt-5 text-capitalize  ">Software Engineering Research</h1>
                <p className='last-para' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos corrupti voluptate, alias illo quasi nam molestias cumque debitis delectus qui maiores quibusdam tempora! Totam similique labore autem, earum repudiandae inventore necessitatibus iusto, vitae explicabo accusamus ipsam quae, laborum alias sit amet cumque natus reprehenderit provident obcaecati itaque modi voluptate. Eligendi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default FocusArea